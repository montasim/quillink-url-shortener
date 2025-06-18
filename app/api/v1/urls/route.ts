import { NextRequest } from 'next/server';
import httpStatusLite from 'http-status-lite';
import { nanoid } from 'nanoid';
import { addMonths } from 'date-fns';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import { ShortenUrlSchema } from '@/schemas/schemas';
import { urlSelection } from '@/app/api/v1/urls/selection';
import { cookies } from 'next/headers';
import COOKIES from '@/constants/cookies';
import httpStatus from 'http-status-lite';
import { ISignedJwtPayload } from '@/types/types';
import { verifyToken } from '@/lib/jwt';
import { meSelection } from '@/app/api/v1/auth/me/selection';
import { getOrCreateGuestId } from '@/lib/guest';
import CONSTANTS from '@/app/api/v1/urls/constants';

const { AUTHENTICATION, ALL_URLS_LISTING, URL_CREATION } = MESSAGES;
const { URL_CREATION_LIMIT } = CONSTANTS;
const { userModel, shortUrlModel } = dataService;

const createShortUrl = async (request: NextRequest) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(COOKIES.NAME.ACCESS_TOKEN)?.value;

    let userId: string | null = null;
    let guestId: string | null = null;

    // Parse request body
    const requestBody = await request.json();
    const schemaValidationResult = ShortenUrlSchema.safeParse(requestBody);
    if (!schemaValidationResult.success) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            URL_CREATION.VALIDATION_ERROR,
            {},
            schemaValidationResult.error.flatten()
        );
    }
    const { originalUrl } = schemaValidationResult.data;

    // Identify user or guest
    if (accessToken) {
        try {
            const decoded = verifyToken(accessToken, COOKIES.TYPE.ACCESS);
            userId = decoded?.currentUser?.id || null;
        } catch (err) {
            console.error('Access token verification failed:', err);
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                AUTHENTICATION.UNAUTHORIZED
            );
        }

        if (!userId) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                AUTHENTICATION.UNAUTHORIZED
            );
        }

        const user = await userModel.findUnique({
            where: { id: userId },
            select: meSelection,
        });
        if (!user) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                AUTHENTICATION.UNAUTHORIZED
            );
        }

        const userUrls = await shortUrlModel.findMany({ where: { userId } });

        if (
            !user.subscription &&
            userUrls.length >= URL_CREATION_LIMIT.USER_WITHOUT_SUBSCRIPTION
        ) {
            return sendResponse(
                httpStatus.FORBIDDEN,
                URL_CREATION.NEED_SUBSCRIPTION
            );
        }
    } else {
        guestId = await getOrCreateGuestId();
        const guestUrls = await shortUrlModel.findMany({ where: { guestId } });

        if (guestUrls.length >= URL_CREATION_LIMIT.GUEST) {
            return sendResponse(httpStatus.FORBIDDEN, URL_CREATION.NEED_LOGIN);
        }
    }

    // Check if the original URL already exists
    const existingShortUrl = await shortUrlModel.findFirst({
        where: {
            originalUrl,
            ...(guestId ? { guestId } : {}),
            ...(userId ? { userId } : {}),
        },
    });

    if (existingShortUrl) {
        return sendResponse(
            httpStatus.OK,
            URL_CREATION.ALREADY_EXISTS,
            existingShortUrl
        );
    }

    // Create short URL
    const shortKey = nanoid(7);
    const expiresAt = addMonths(new Date(), 6);

    const createdShortUrl = await shortUrlModel.create({
        data: {
            originalUrl,
            shortKey,
            expiresAt,
            ...(guestId ? { guestId } : {}),
            ...(userId ? { userId } : {}),
        },
        select: urlSelection,
    });

    return sendResponse(
        httpStatus.CREATED,
        URL_CREATION.SUCCESS,
        createdShortUrl
    );
};

const retrieveFilteredShortUrls = async (request: NextRequest) => {
    const cookieStore = await cookies();
    const guestToken = cookieStore.get(COOKIES.NAME.GUEST_TOKEN)?.value;
    const accessToken = cookieStore.get(COOKIES.NAME.ACCESS_TOKEN)?.value;

    if (guestToken) {
        // Renamed from handleGetUrls
        const urlQueryParameters = request.nextUrl.searchParams;

        const shortKeyParam = urlQueryParameters.get('shortKey');
        const originalUrlParam = urlQueryParameters.get('originalUrl');
        const expiredParam = urlQueryParameters.get('expired');

        const filterConditions: any = {
            guestId: guestToken,
        };

        // Apply filter for shortKey if provided
        if (shortKeyParam) {
            filterConditions.shortKey = {
                contains: shortKeyParam,
                mode: 'insensitive',
            };
        }

        // Apply filter for originalUrl if provided
        if (originalUrlParam) {
            filterConditions.originalUrl = {
                contains: originalUrlParam,
                mode: 'insensitive',
            };
        }

        // Apply filter for expiration status
        if (expiredParam === 'true') {
            filterConditions.expiresAt = { lt: new Date() };
        } else if (expiredParam === 'false') {
            // URLs that have not expired or have no expiration set
            filterConditions.OR = [
                { expiresAt: null },
                { expiresAt: { gte: new Date() } },
            ];
        }

        // Fetch short URL records from the database based on filter conditions
        const shortUrlRecords = await shortUrlModel.findMany({
            where: filterConditions,
            select: urlSelection,
            orderBy: { createdAt: 'desc' },
        });

        // If no URLs are found after applying filters, return a 404 response
        if (!shortUrlRecords.length) {
            return sendResponse(
                httpStatusLite.NOT_FOUND,
                ALL_URLS_LISTING.NOT_FOUND
            );
        }

        // Return a success response with the fetched URL records
        return sendResponse(
            httpStatusLite.OK,
            ALL_URLS_LISTING.SUCCESS,
            shortUrlRecords
        );
    }

    if (!accessToken) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    let decodedPayload: ISignedJwtPayload;
    try {
        decodedPayload = verifyToken(accessToken, COOKIES.TYPE.ACCESS);
    } catch (error) {
        console.error('Access token verification failed:', error);
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    if (!decodedPayload || !decodedPayload?.currentUser?.id) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    const userId = decodedPayload?.currentUser?.id;
    const user = await userModel.findUnique({
        where: { id: userId },
        select: meSelection,
    });

    if (!user) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    // Renamed from handleGetUrls
    const urlQueryParameters = request.nextUrl.searchParams;

    const shortKeyParam = urlQueryParameters.get('shortKey');
    const originalUrlParam = urlQueryParameters.get('originalUrl');
    const expiredParam = urlQueryParameters.get('expired');

    const filterConditions: any = {
        userId,
    };

    // Apply filter for shortKey if provided
    if (shortKeyParam) {
        filterConditions.shortKey = {
            contains: shortKeyParam,
            mode: 'insensitive',
        };
    }

    // Apply filter for originalUrl if provided
    if (originalUrlParam) {
        filterConditions.originalUrl = {
            contains: originalUrlParam,
            mode: 'insensitive',
        };
    }

    // Apply filter for expiration status
    if (expiredParam === 'true') {
        filterConditions.expiresAt = { lt: new Date() };
    } else if (expiredParam === 'false') {
        // URLs that have not expired or have no expiration set
        filterConditions.OR = [
            { expiresAt: null },
            { expiresAt: { gte: new Date() } },
        ];
    }

    // Fetch short URL records from the database based on filter conditions
    const shortUrlRecords = await shortUrlModel.findMany({
        where: filterConditions,
        select: urlSelection,
        orderBy: { createdAt: 'desc' },
    });

    // If no URLs are found after applying filters, return a 404 response
    if (!shortUrlRecords.length) {
        return sendResponse(
            httpStatusLite.NOT_FOUND,
            ALL_URLS_LISTING.NOT_FOUND
        );
    }

    // Return a success response with the fetched URL records
    return sendResponse(
        httpStatusLite.OK,
        ALL_URLS_LISTING.SUCCESS,
        shortUrlRecords
    );
};

export const GET = asyncError(retrieveFilteredShortUrls);
export const POST = asyncError(createShortUrl);
