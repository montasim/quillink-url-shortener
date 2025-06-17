import { cookies } from 'next/headers';
import httpStatus from 'http-status-lite';
import { verifyToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import asyncError from '@/lib/asyncError';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import { meSelection } from '@/app/api/v1/auth/me/selection';

const { AUTHENTICATION_MESSAGES, ME_HANDLER_MESSAGES } = MESSAGES;
const { userModel } = dataService;

const retrieveUserProfileHandler = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION_MESSAGES.UNAUTHORIZED
        );
    }

    let decodedPayload: any;
    try {
        decodedPayload = verifyToken(accessToken, 'access');
    } catch (error) {
        console.error('Access token verification failed:', error);
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION_MESSAGES.UNAUTHORIZED
        );
    }

    console.log(decodedPayload);

    if (!decodedPayload || !decodedPayload?.currentUser?.id) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION_MESSAGES.UNAUTHORIZED
        );
    }

    const user = await userModel.findUnique({
        where: { id: decodedPayload?.currentUser?.id },
        select: meSelection,
    });

    if (!user) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            AUTHENTICATION_MESSAGES.UNAUTHORIZED
        );
    }

    return sendResponse(httpStatus.OK, ME_HANDLER_MESSAGES.SUCCESSFUL, user);
};

export const GET = asyncError(retrieveUserProfileHandler);
