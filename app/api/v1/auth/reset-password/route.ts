import sendResponse from '@/utils/sendResponse';
import httpStatus from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import generateHash from '@/utils/generateHash';
import { NextRequest } from 'next/server';
import { ResetPasswordSchema } from '@/schemas/schemas';

const { RESET_PASSWORD } = MESSAGES;
const { tokenModel, userModel } = dataService;

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

    const { token, newPassword } = validation.data;

    const tokenEntry = await tokenModel.findUnique({
        where: { token },
        include: { user: true },
    });

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

    await userModel.update({
        where: { id: tokenEntry.userId },
        data: { password: hashedPassword },
    });

    await tokenModel.deleteData({ where: { token } });

    return sendResponse(httpStatus.OK, RESET_PASSWORD.SUCCESS);
};

export const POST = asyncError(forgotPasswordHandler);
