import { NextRequest } from 'next/server';
import httpStatus from 'http-status-lite';
import { LoginSchema } from '@/schemas/schemas';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import comparePassword from '@/utils/comparePassword';
import { createToken } from '@/lib/jwt';
import asyncError from '@/lib/asyncError';
import { setAuthCookies } from '@/lib/cookies';
import { loginSelection } from '@/app/api/v1/auth/login/selection';

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
        select: loginSelection,
    });

    if (!user) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            USER_LOGIN_MESSAGES.UNAUTHORIZED
        );
    }

    // ✅ Validate password
    const isValidPassword = await comparePassword(
        password,
        user.password || ''
    );
    if (!isValidPassword) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            USER_LOGIN_MESSAGES.UNAUTHORIZED
        );
    }

    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
    };

    // ✅ Generate JWT tokens
    const { accessToken, refreshToken } = await createToken(userData);

    // ✅ Set cookies
    await setAuthCookies({ accessToken, refreshToken });

    delete userData.id;

    // ✅ Return response with public user info only
    return sendResponse(
        httpStatus.OK,
        USER_LOGIN_MESSAGES.AUTHORIZED,
        userData
    );
};

export const POST = asyncError(loginHandler);
