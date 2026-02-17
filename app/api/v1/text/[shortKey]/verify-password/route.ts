import { NextRequest } from 'next/server';
import httpStatus from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { getTextShare } from '@/services/text-share.service';
import { verifyPassword } from '@/lib/verifyPassword';
import { TextSharePasswordSchema } from '@/schemas/textShareSchema';

const { TEXT_SHARE } = MESSAGES;

const handleVerifyPassword = async (
    request: NextRequest,
    { params }: { params: Promise<{ shortKey: string }> }
) => {
    const { shortKey } = await params;

    const textShare = await getTextShare({ shortKey });

    if (!textShare) {
        return sendResponse(
            httpStatus.NOT_FOUND,
            TEXT_SHARE?.NOT_FOUND || 'Text share not found'
        );
    }

    if (!textShare.passwordHash) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            TEXT_SHARE?.NO_PASSWORD_REQUIRED ||
                'This text share does not require a password'
        );
    }

    const requestBody = await request.json();
    const schemaValidationResult = TextSharePasswordSchema.safeParse(
        requestBody
    );
    if (!schemaValidationResult.success) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            TEXT_SHARE?.VALIDATION_ERROR || 'Invalid data provided',
            {},
            schemaValidationResult.error.flatten()
        );
    }

    const { password } = schemaValidationResult.data;

    const isValid = await verifyPassword(password, textShare.passwordHash);

    if (!isValid) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            TEXT_SHARE?.INVALID_PASSWORD || 'Invalid password'
        );
    }

    return sendResponse(
        httpStatus.OK,
        TEXT_SHARE?.PASSWORD_VERIFIED || 'Password verified successfully',
        { valid: true }
    );
};

export const POST = asyncError(handleVerifyPassword);
