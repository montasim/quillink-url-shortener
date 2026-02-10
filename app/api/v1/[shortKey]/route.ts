import { NextRequest, NextResponse } from 'next/server';
import httpStatusLite from 'http-status-lite';
import getClientIp from '@/lib/getClientIp';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { ShortKeySchema } from '@/schemas/schemas';
import validateParams from '@/lib/validateParams';
import { getShortUrlDetails, updateShortUrl } from '@/services/url.service';
import { createClickLog } from '@/services/clickLog.service';
import { clickLogSelection } from '@/app/api/v1/urls/selection';

const { URL_REDIRECT } = MESSAGES;

const handleShortUrlRedirect = async (
    request: NextRequest,
    context: { params: Promise<{ shortKey: string }> }
) => {
    const resolvedParams = await context.params;
    const validation = validateParams(ShortKeySchema, resolvedParams);
    if (!validation.success) {
        // Redirect to the not-found page to show the 404 page with navbar and footer
        return sendResponse(httpStatusLite.NOT_FOUND, URL_REDIRECT.NOT_FOUND);
    }

    const shortKey = validation.data.shortKey;

    // Find the URL mapping record using the short key
    const urlMappingRecord = await getShortUrlDetails({ shortKey });

    // If no record is found, return a 404 response
    if (!urlMappingRecord) {
        return sendResponse(httpStatusLite.NOT_FOUND, URL_REDIRECT.NOT_FOUND);
    }

    // Check if the URL has expired
    if (
        urlMappingRecord.expiresAt &&
        new Date(urlMappingRecord.expiresAt) < new Date()
    ) {
        return sendResponse(httpStatusLite.GONE, URL_REDIRECT.EXPIRED);
    }

    // Increment the click count for the short URL
    await updateShortUrl({ shortKey }, { clicks: { increment: 1 } });

    // Log the click event details
    const ipAddress = getClientIp(request);
    let country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    let countryCode = request.headers.get('x-vercel-ip-country-code') || '??';

    // If we don't have country info from headers (e.g. running locally), try a basic lookup
    if (country === 'Unknown' && ipAddress && ipAddress !== '127.0.0.1' && ipAddress !== '::1') {
        try {
            const geoRes = await fetch(`http://ip-api.com/json/${ipAddress}`);
            const geoData = await geoRes.json();
            if (geoData.status === 'success') {
                country = geoData.country;
                countryCode = geoData.countryCode;
            }
        } catch (error) {
            console.error('GeoIP lookup failed:', error);
        }
    }

    await createClickLog(
        {
            shortKey,
            ipAddress,
            country,
            countryCode,
            userAgent: request.headers.get('user-agent') ?? 'unknown',
        },
        clickLogSelection
    );

    // Redirect the user to the original URL
    return NextResponse.redirect(urlMappingRecord.originalUrl);
};

export const GET = asyncError(handleShortUrlRedirect);
