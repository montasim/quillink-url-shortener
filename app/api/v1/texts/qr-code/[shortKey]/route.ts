import { NextRequest } from 'next/server';
import asyncError from '@/lib/asyncError';
import generateQRCode from '@/lib/generateQRCode';
import { decode as base64Decode } from 'base64-arraybuffer';
import httpStatusLite from 'http-status-lite';
import contentTypesLite from 'content-types-lite';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { CustomSlugSchema } from '@/schemas/schemas';
import validateParams from '@/lib/validateParams';
import configuration from '@/configuration/configuration';
import { getTextShare } from '@/services/text-share.service';
import { textShareWithViewLogsSelection } from '@/services/text-share.service';

const { QR_CODE_GENERATION } = MESSAGES;

const generateTextShareQrCode = async (
    request: NextRequest,
    context: { params: Promise<{ shortKey: string }> }
) => {
    const resolvedParams = await context.params;
    const validation = validateParams(CustomSlugSchema, resolvedParams);
    if (!validation.success) return validation.response;

    const shortKey = validation.data.shortKey;

    // Validate if shortKey is provided
    if (!shortKey) {
        return sendResponse(
            httpStatusLite.BAD_REQUEST,
            QR_CODE_GENERATION.MISSING_SHORT_KEY
        );
    }

    // Find the text share record in the database by shortKey
    const textShareRecord = await getTextShare({ shortKey });

    // If no record is found for the given shortKey, return a 404 response
    if (!textShareRecord) {
        return sendResponse(
            httpStatusLite.NOT_FOUND,
            QR_CODE_GENERATION.NOT_FOUND
        );
    }

    // Construct the full URL that the QR code will point to
    const fullRedirectUrl = `${configuration.app.baseUrl}/texts/${textShareRecord.shortKey}`;

    // Generate the QR code as a base64 encoded URL
    const qrCodeDataUrl = await generateQRCode(fullRedirectUrl);

    // Extract the base64 encoded image from the data URL
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

export const GET = asyncError(generateTextShareQrCode);
