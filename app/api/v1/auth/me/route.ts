import { cookies } from 'next/headers';
import httpStatus from 'http-status-lite';
import { verifyToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import asyncError from '@/lib/asyncError';

const meHandler = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    console.log(token);

    if (!token) {
        return sendResponse(httpStatus.UNAUTHORIZED, 'Not authenticated');
    }

    try {
        const user = verifyToken(token);
        return sendResponse(httpStatus.OK, 'User authenticated', user);
    } catch (error) {
        return sendResponse(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
    }
};

export const GET = asyncError(meHandler);
