import sendResponse from '@/utils/sendResponse';
import httpStatus from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import MESSAGES from '@/constants/messages';
import generateHash from '@/utils/generateHash';
import { NextRequest } from 'next/server';
import { ResetPasswordSchema } from '@/schemas/schemas';
import { updateUser } from '@/services/user.service';
import { deleteToken, getTokenDetails } from '@/services/token.service';
import { verifyTurnstileToken } from '@/services/auth.service';

const { RESET_PASSWORD } = MESSAGES;

const forgotPasswordHandler = async (req: NextRequest) => {
    const body = await req.json();

    // ✅ Validate request body
    const validation = ResetPasswordSchema.safeParse(body);
    if (!validation.success) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            RESET_PASSWORD.VALIDATION_ERROR,
            {},
            validation.error.flatten()
        );
    }

    const { token, newPassword, cfToken } = validation.data;

    // ✅ Verify Turnstile token
    const isValid = await verifyTurnstileToken(cfToken);
    if (!isValid) {
        return new Response(
            JSON.stringify({ error: 'Robot verification failed.' }),
            { status: 400 }
        );
    }

    const tokenEntry = await getTokenDetails({ token }, { user: true }, {});

    if (
        !tokenEntry ||
        tokenEntry.type !== 'reset' ||
        tokenEntry.expiresAt < new Date()
    ) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            RESET_PASSWORD.INVALID_TOKEN
        );
    }

    const hashedPassword = await generateHash(newPassword);

    await updateUser({ id: tokenEntry.userId }, { password: hashedPassword });

    await deleteToken({ token });

    return sendResponse(httpStatus.OK, RESET_PASSWORD.SUCCESS);
};

export const POST = asyncError(forgotPasswordHandler);
