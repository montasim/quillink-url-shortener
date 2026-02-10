import { NextRequest } from 'next/server';
import httpStatusLite from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { ShortKeySchema } from '@/schemas/schemas';
import validateParams from '@/lib/validateParams';
import { deleteShortUrl, getShortUrlDetails, getExistingShortUrl } from '@/services/url.service';
import { getCookies } from '@/lib/cookies';
import { verifyToken } from '@/lib/jwt';
import { ISignedJwtPayload } from '@/types/types';
import COOKIES from '@/constants/cookies';

const { URL_DELETION, SINGLE_URL_DETAILS, AUTHENTICATION } = MESSAGES;

const deleteShortUrlById = async (
    request: NextRequest,
    context: { params: Promise<{ shortKey: string }> }
) => {
    const resolvedParams = await context.params;
    const validation = validateParams(ShortKeySchema, resolvedParams);
    if (!validation.success) return validation.response;

    const shortKey = validation.data.shortKey;

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
        }
    }

    if (!userId && guestCookie) {
        guestId = guestCookie;
    }

    if (!userId && !guestId) {
        return sendResponse(
            httpStatusLite.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    // Attempt to find the URL record before attempting deletion
    const filterConditions: any = { shortKey };
    if (userId) {
        filterConditions.userId = userId;
    } else {
        filterConditions.guestId = guestId;
    }

    // Use findFirst check via getExistingShortUrl to ensure ownership
    const shortUrlRecord = await getExistingShortUrl(filterConditions);

    // If no record is found or not owned by user, return a 404 response
    // (We return 404 instead of 403 to avoid leaking existence of links)
    if (!shortUrlRecord) {
        return sendResponse(httpStatusLite.NOT_FOUND, URL_DELETION.NOT_FOUND);
    }

    // Delete the short URL record from the database
    await deleteShortUrl(filterConditions);

    // Return a success response
    return sendResponse(httpStatusLite.OK, URL_DELETION.SUCCESS);
};

const getShortUrlDetailsById = async (
    request: NextRequest,
    context: { params: Promise<{ shortKey: string }> }
) => {
    const resolvedParams = await context.params;
    const validation = validateParams(ShortKeySchema, resolvedParams);
    if (!validation.success) return validation.response;

    const shortKey = validation.data.shortKey;
    const shortUrlRecord = await getShortUrlDetails({ shortKey });

    // Find the short URL record, including its click logs
    if (!shortUrlRecord) {
        return sendResponse(
            httpStatusLite.NOT_FOUND,
            SINGLE_URL_DETAILS.NOT_FOUND
        );
    }

    // Check if the URL has expired
    if (shortUrlRecord.expiresAt && new Date() > shortUrlRecord.expiresAt) {
        return sendResponse(httpStatusLite.GONE, SINGLE_URL_DETAILS.EXPIRED);
    }

    // Return a success response with the URL details
    return sendResponse(
        httpStatusLite.OK,
        SINGLE_URL_DETAILS.SUCCESS,
        shortUrlRecord
    );
};

export const DELETE = asyncError(deleteShortUrlById);
export const GET = asyncError(getShortUrlDetailsById);
