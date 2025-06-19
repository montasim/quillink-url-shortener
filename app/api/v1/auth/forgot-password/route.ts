import { sendMail } from '@/lib/mailer';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import sendResponse from '@/utils/sendResponse';
import httpStatus from 'http-status-lite';
import generateToken from '@/utils/generateToken';
import configuration from '@/configuration/configuration';
import { NextRequest } from 'next/server';
import { ForgotPasswordSchema } from '@/schemas/schemas';

const { FORGET_PASSWORD } = MESSAGES;
const { tokenModel, userModel } = dataService;

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    // ✅ Validate request body
    const validation = ForgotPasswordSchema.safeParse(body);
    if (!validation.success) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            FORGET_PASSWORD.VALIDATION_ERROR,
            {},
            validation.error.flatten()
        );
    }

    const { email } = validation.data;

    const user = await userModel.findUnique({ where: { email } });
    if (!user) {
        return sendResponse(httpStatus.FORBIDDEN, FORGET_PASSWORD.FORBIDDEN);
    }

    const token = await generateToken();
    const expires = new Date(Date.now() + configuration.forgetPassword.expires);

    await tokenModel.create({
        data: {
            token,
            userId: user.id,
            type: 'reset',
            expiresAt: expires,
        },
    });

    const resetUrl = `${configuration.app.baseUrl}/reset-password?token=${token}`;

    await sendMail({
        to: email,
        subject: 'Reset your password',
        html: `Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.`,
    });

    return sendResponse(httpStatus.OK, FORGET_PASSWORD.SUCCESS);
};
