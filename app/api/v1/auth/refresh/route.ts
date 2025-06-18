import { cookies } from 'next/headers';
import httpStatus from 'http-status-lite';
import { verifyToken, createToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import asyncError from '@/lib/asyncError';
import { setAuthCookies } from '@/lib/cookies';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import { refreshTokenSelection } from '@/app/api/v1/auth/refresh/selection';
import COOKIES from '@/constants/cookies';
import {ISignedJwtPayload} from "@/types/types";

const { AUTHENTICATION, REFRESH_TOKEN } = MESSAGES;
const { userModel } = dataService;

const handleTokenRefresh = async () => {
    const cookieStore = await cookies();
    const currentRefreshToken = cookieStore.get(
        COOKIES.NAME.REFRESH_TOKEN
    )?.value;

    if (!currentRefreshToken) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    let decodedPayload: ISignedJwtPayload;
    try {
        decodedPayload = verifyToken(currentRefreshToken, COOKIES.TYPE.REFRESH);
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

    const user = await userModel.findUnique({
        where: { id: decodedPayload?.currentUser?.id },
        select: refreshTokenSelection,
    });

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
