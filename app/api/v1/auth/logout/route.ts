import httpStatus from 'http-status-lite';
import sendResponse from '@/utils/sendResponse';
import asyncError from '@/lib/asyncError';
import { clearAuthCookies } from '@/lib/cookies';
import MESSAGES from '@/constants/messages';

const { LOGOUT_HANDLER } = MESSAGES;

const logoutHandler = async () => {
    await clearAuthCookies();

    return sendResponse(httpStatus.OK, LOGOUT_HANDLER.SUCCESS);
};

export const GET = asyncError(logoutHandler);
