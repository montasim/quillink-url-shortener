import { NextRequest, NextResponse } from 'next/server';
import httpStatusLite from 'http-status-lite';
import getClientIp from '@/lib/getClientIp';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import { ShortKeySchema } from '@/schemas/schemas';
import validateParams from '@/lib/validateParams';

const { URL_REDIRECT_MESSAGES } = MESSAGES;
const { shortUrlModel, clickLogModel } = dataService;

const handleShortUrlRedirect = async (
    request: NextRequest,
    context: { params: Promise<{ shortKey: string }> }
) => {
    const resolvedParams = await context.params;
    const validation = validateParams(ShortKeySchema, resolvedParams);
    if (!validation.success) return validation.response;

    const shortKey = validation.data.shortKey;

    // Find the URL mapping record using the short key
    const urlMappingRecord = await shortUrlModel.findUnique({
        where: { shortKey },
    });

    // If no record is found, return a 404 response
    if (!urlMappingRecord) {
        return sendResponse(
            httpStatusLite.NOT_FOUND,
            URL_REDIRECT_MESSAGES.NOT_FOUND
        );
    }

    // Check if the URL has expired
    if (
        urlMappingRecord.expiresAt &&
        new Date(urlMappingRecord.expiresAt) < new Date()
    ) {
        return sendResponse(httpStatusLite.GONE, URL_REDIRECT_MESSAGES.EXPIRED);
    }

    // Increment the click count for the short URL
    await shortUrlModel.update({
        where: { shortKey },
        data: { clicks: { increment: 1 } },
    });

    // Log the click event details
    await clickLogModel.create({
        data: {
            shortKey,
            ipAddress: getClientIp(request),
            userAgent: request.headers.get('user-agent') ?? 'unknown',
        },
    });

    // Redirect the user to the original URL
    return NextResponse.redirect(urlMappingRecord.originalUrl);
};

export const GET = asyncError(handleShortUrlRedirect);
