import { NextRequest } from 'next/server';
import asyncError from '@/lib/asyncError';
import generateQRCode from '@/lib/generateQRCode';
import { decode as base64Decode } from 'base64-arraybuffer';
import httpStatusLite from 'http-status-lite';
import contentTypesLite from 'content-types-lite';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { ShortKeySchema } from '@/schemas/schemas';
import validateParams from '@/lib/validateParams';
import configuration from '@/configuration/configuration';
import { getShortUrlDetails } from '@/services/url.service';
import { urlSelection } from '@/app/api/v1/urls/selection';

const { QR_CODE_GENERATION } = MESSAGES;

const generateShortUrlQRCode = async (
    request: NextRequest,
    context: { params: Promise<{ shortKey: string }> }
) => {
    const resolvedParams = await context.params;
    const validation = validateParams(ShortKeySchema, resolvedParams);
    if (!validation.success) return validation.response;

    const shortKey = validation.data.shortKey;

    // Validate if shortKey is provided
    if (!shortKey) {
        return sendResponse(
            httpStatusLite.BAD_REQUEST,
            QR_CODE_GENERATION.MISSING_SHORT_KEY
        );
    }

    // Find the short URL record in the database
    const shortUrlRecord = await getShortUrlDetails({ shortKey }, urlSelection);

    // If no record is found for the given shortKey, return a 404 response
    if (!shortUrlRecord) {
        return sendResponse(
            httpStatusLite.NOT_FOUND,
            QR_CODE_GENERATION.NOT_FOUND
        );
    }

    // Construct the full URL that the QR code will point to
    // This assumes process.env.NEXT_PUBLIC_BASE_URL is configured correctly
    const fullRedirectUrl = `${configuration.app.baseUrl}/${shortUrlRecord.shortKey}`;

    // Generate the QR code as a base64 types URL
    const qrCodeDataUrl = await generateQRCode(fullRedirectUrl);

    // Extract the base64 encoded image types from the types URL
    const base64EncodedImage = qrCodeDataUrl.split(',')[1];

    // Decode the base64 string into a Uint8Array buffer
    const imageBuffer = new Uint8Array(base64Decode(base64EncodedImage));

    // Return the QR code image as a PNG response
    return new Response(imageBuffer, {
        status: httpStatusLite.OK,
        headers: {
            'Content-Type': contentTypesLite.PNG,
            'Cache-Control': 'public, max-age=86400',
        },
    });
};

export const GET = asyncError(generateShortUrlQRCode);
