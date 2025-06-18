import { cookies } from 'next/headers';
import httpStatus from 'http-status-lite';
import { verifyToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import asyncError from '@/lib/asyncError';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import { meSelection } from '@/app/api/v1/auth/me/selection';
import COOKIES from '@/constants/cookies';
import { ISignedJwtPayload } from '@/types/types';

const { AUTHENTICATION, ME_HANDLER } = MESSAGES;
const { userModel } = dataService;

const retrieveUserProfileHandler = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(COOKIES.NAME.ACCESS_TOKEN)?.value;

    if (!accessToken) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    let decodedPayload: ISignedJwtPayload;
    try {
        decodedPayload = verifyToken(accessToken, COOKIES.TYPE.ACCESS);
    } catch (error) {
        console.error('Access token verification failed:', error);
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
        select: meSelection,
    });

    if (!user) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    return sendResponse(httpStatus.OK, ME_HANDLER.SUCCESS, user);
};

export const GET = asyncError(retrieveUserProfileHandler);
