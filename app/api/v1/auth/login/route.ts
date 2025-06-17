import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import httpStatus from 'http-status-lite';
import { LoginSchema } from '@/schemas/schemas';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import comparePassword from '@/utils/comparePassword';
import { createToken } from '@/lib/jwt';
import asyncError from '@/lib/asyncError';

const { USER_LOGIN_MESSAGES } = MESSAGES;
const { userModel } = dataService;

const loginHandler = async (req: NextRequest) => {
    const body = await req.json();

    // ✅ Validate request body
    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            USER_LOGIN_MESSAGES.VALIDATION_ERROR,
            {},
            validation.error.flatten()
        );
    }

    const { email, password } = validation.data;

    // ✅ Find user by email
    const user = await userModel.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        },
    });

    if (!user) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            USER_LOGIN_MESSAGES.UNAUTHORIZED
        );
    }

    // ✅ Validate password
    const isValidPassword = await comparePassword(password, user.password || '');
    if (!isValidPassword) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            USER_LOGIN_MESSAGES.UNAUTHORIZED
        );
    }

    // ✅ Generate JWT tokens
    const { accessToken, refreshToken } = await createToken({
        id: user.id,
        name: user.name,
        email: user.email,
    });

    // ✅ Set HTTP-only cookies
    const cookieJar = await cookies();
    cookieJar.set('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
    });

    cookieJar.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // ✅ Return response with public user info only
    return sendResponse(httpStatus.OK, USER_LOGIN_MESSAGES.AUTHORIZED, {
        name: user.name,
        email: user.email,
    });
};

export const POST = asyncError(loginHandler);
