import httpStatus from 'http-status-lite';
import { verifyToken, createToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import asyncError from '@/lib/asyncError';
import { getRefreshCookie, setAuthCookies } from '@/lib/cookies';
import MESSAGES from '@/constants/messages';
import { refreshTokenSelection } from '@/app/api/v1/auth/refresh/selection';
import COOKIES from '@/constants/cookies';
import { ISignedJwtPayload } from '@/types/types';
import { getUserDetails } from '@/services/user.service';

const { AUTHENTICATION, REFRESH_TOKEN } = MESSAGES;

const handleTokenRefresh = async () => {
    const refreshCookie = await getRefreshCookie();
    if (!refreshCookie) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    let decodedPayload: ISignedJwtPayload;
    try {
        decodedPayload = verifyToken(refreshCookie, COOKIES.TYPE.REFRESH);
    } catch (error) {
        console.error('Refresh token verification failed:', error);
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    if (!decodedPayload || !decodedPayload?.currentUser?.id) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    const user = await getUserDetails(
        { id: decodedPayload?.currentUser?.id },
        refreshTokenSelection
    );

    if (!user) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    const { accessToken, refreshToken: newRefreshToken } =
        await createToken(user);

    const { id, ...userWithoutId } = user;

    await setAuthCookies({
        accessToken,
        refreshToken: newRefreshToken,
    });

    return sendResponse(httpStatus.OK, REFRESH_TOKEN.SUCCESS, userWithoutId);
};

export const GET = asyncError(handleTokenRefresh);
