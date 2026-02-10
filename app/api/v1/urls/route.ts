import { NextRequest } from 'next/server';
import httpStatusLite from 'http-status-lite';
import { customAlphabet } from 'nanoid';
import { addMonths } from 'date-fns';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { ShortenUrlSchema } from '@/schemas/schemas';
import { urlSelection } from '@/app/api/v1/urls/selection';
import COOKIES from '@/constants/cookies';
import httpStatus from 'http-status-lite';
import { ISignedJwtPayload } from '@/types/types';
import { verifyToken } from '@/lib/jwt';
import { meSelection } from '@/app/api/v1/auth/me/selection';
import { getOrCreateGuestId } from '@/lib/guest';
import CONSTANTS from '@/app/api/v1/urls/constants';
import { getAccessCookie, getCookies } from '@/lib/cookies';
import {
    createShortUrl,
    getExistingShortUrl,
    getShortUrlList,
} from '@/services/url.service';
import { getUserDetails } from '@/services/user.service';

const { AUTHENTICATION, ALL_URLS_LISTING, URL_CREATION } = MESSAGES;
const { URL_CREATION_LIMIT } = CONSTANTS;

const handleCreateShortUrl = async (request: NextRequest) => {
    const accessCookie = await getAccessCookie();

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
    if (accessCookie) {
        try {
            const decoded = verifyToken(accessCookie, COOKIES.TYPE.ACCESS);
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

        const user = await getUserDetails({ id: userId }, meSelection);
        if (!user) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                AUTHENTICATION.UNAUTHORIZED
            );
        }

        const userUrls = await getShortUrlList({ userId }, urlSelection);

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
        const guestUrls = await getShortUrlList({ guestId }, urlSelection);

        if (guestUrls.length >= URL_CREATION_LIMIT.GUEST) {
            return sendResponse(httpStatus.FORBIDDEN, URL_CREATION.NEED_LOGIN);
        }
    }

    // Check if the original URL already exists
    const existingShortUrl = await getExistingShortUrl({
        originalUrl,
        ...(guestId ? { guestId } : {}),
        ...(userId ? { userId } : {}),
    });

    if (existingShortUrl) {
        return sendResponse(
            httpStatus.OK,
            URL_CREATION.ALREADY_EXISTS,
            existingShortUrl
        );
    }

    // Create short URL
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nanoid = customAlphabet(alphabet, 7);
    const shortKey = nanoid();
    const expiresAt = addMonths(new Date(), 6);

    const createdShortUrl = await createShortUrl(
        {
            originalUrl,
            shortKey,
            expiresAt,
            ...(guestId ? { guestId } : {}),
            ...(userId ? { userId } : {}),
        },
        urlSelection
    );

    return sendResponse(
        httpStatus.CREATED,
        URL_CREATION.SUCCESS,
        createdShortUrl
    );
};

const retrieveFilteredShortUrls = async (request: NextRequest) => {
    const { accessCookie, guestCookie } = await getCookies();

    let userId: string | null = null;
    let guestId: string | null = null;

    if (accessCookie) {
        try {
            const decodedPayload: ISignedJwtPayload = verifyToken(
                accessCookie,
                COOKIES.TYPE.ACCESS
            );
            if (decodedPayload?.currentUser?.id) {
                userId = decodedPayload.currentUser.id;
            }
        } catch (error) {
            console.error('Access token verification failed:', error);
            // Fall through to guest token if access token is invalid
        }
    }

    if (!userId && guestCookie) {
        guestId = guestCookie;
    }

    if (!userId && !guestId) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    // Extract query parameters
    const urlQueryParameters = request.nextUrl.searchParams;
    const shortKeyParam = urlQueryParameters.get('shortKey');
    const originalUrlParam = urlQueryParameters.get('originalUrl');
    const expiredParam = urlQueryParameters.get('expired');

    const filterConditions: any = {};

    if (userId) {
        filterConditions.userId = userId;
    } else if (guestId) {
        filterConditions.guestId = guestId;
    }

    // Apply filters based on query parameters
    if (shortKeyParam) {
        filterConditions.shortKey = {
            contains: shortKeyParam,
            mode: 'insensitive',
        };
    }

    if (originalUrlParam) {
        filterConditions.originalUrl = {
            contains: originalUrlParam,
            mode: 'insensitive',
        };
    }

    if (expiredParam === 'true') {
        filterConditions.expiresAt = { lt: new Date() };
    } else if (expiredParam === 'false') {
        filterConditions.OR = [
            { expiresAt: null },
            { expiresAt: { gte: new Date() } },
        ];
    }

    // Fetch short URL records from the database
    const shortUrlRecords = await getShortUrlList(
        filterConditions,
        urlSelection
    );
    if (!shortUrlRecords.length) {
        return sendResponse(
            httpStatusLite.NOT_FOUND,
            ALL_URLS_LISTING.NOT_FOUND
        );
    }

    return sendResponse(
        httpStatusLite.OK,
        ALL_URLS_LISTING.SUCCESS,
        shortUrlRecords
    );
};

export const GET = asyncError(retrieveFilteredShortUrls);
export const POST = asyncError(handleCreateShortUrl);
