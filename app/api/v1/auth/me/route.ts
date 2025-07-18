import httpStatus from 'http-status-lite';
import { verifyToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import asyncError from '@/lib/asyncError';
import MESSAGES from '@/constants/messages';
import { meSelection } from '@/app/api/v1/auth/me/selection';
import COOKIES from '@/constants/cookies';
import { ISignedJwtPayload } from '@/types/types';
import { getAccessCookie } from '@/lib/cookies';
import { getUserDetails } from '@/services/user.service';

const { AUTHENTICATION, ME_HANDLER } = MESSAGES;

const retrieveUserProfileHandler = async () => {
    const accessCookie = await getAccessCookie();
    if (!accessCookie) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    let decodedPayload: ISignedJwtPayload;
    try {
        decodedPayload = verifyToken(accessCookie, COOKIES.TYPE.ACCESS);
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

    const user = await getUserDetails(
        { id: decodedPayload?.currentUser?.id },
        meSelection
    );

    if (!user) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION.UNAUTHORIZED
        );
    }

    return sendResponse(httpStatus.OK, ME_HANDLER.SUCCESS, user);
};

export const GET = asyncError(retrieveUserProfileHandler);
