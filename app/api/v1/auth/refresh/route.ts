import { cookies } from 'next/headers';
import httpStatus from 'http-status-lite';
import { verifyToken, createToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import asyncError from '@/lib/asyncError';
import { setAuthCookies } from '@/lib/cookies';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import { refreshTokenSelection } from '@/app/api/v1/auth/refresh/selection';

const { AUTHENTICATION_MESSAGES, REFRESH_TOKEN_MESSAGES } = MESSAGES;
const { userModel } = dataService;

const handleTokenRefresh = async () => {
    const cookieStore = cookies();
    const currentRefreshToken = cookieStore.get('refreshToken')?.value;

    if (!currentRefreshToken) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION_MESSAGES.UNAUTHORIZED
        );
    }

    let decodedPayload: any;
    try {
        decodedPayload = verifyToken(currentRefreshToken, 'refresh');
    } catch (error) {
        console.error('Refresh token verification failed:', error);
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION_MESSAGES.UNAUTHORIZED
        );
    }

    if (!decodedPayload || !decodedPayload?.currentUser?.id) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION_MESSAGES.UNAUTHORIZED
        );
    }

    const user = await userModel.findUnique({
        where: { id: decodedPayload?.currentUser?.id },
        select: refreshTokenSelection,
    });

    if (!user) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION_MESSAGES.UNAUTHORIZED
        );
    }

    const { accessToken, refreshToken: newRefreshToken } =
        await createToken(user);

    delete user.id;

    await setAuthCookies({
        accessToken,
        refreshToken: newRefreshToken,
    });

    return sendResponse(httpStatus.OK, REFRESH_TOKEN_MESSAGES.SUCCESSFUL, user);
};

export const GET = asyncError(handleTokenRefresh);
