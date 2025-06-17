import { cookies } from 'next/headers';
import { verifyToken, createToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import prisma from '@/lib/prisma';
import httpStatus from 'http-status-lite';

export const GET = async () => {
    const cookieJar = await cookies();
    const refreshToken = cookieJar.get('refreshToken')?.value;

    if (!refreshToken) {
        return sendResponse(httpStatus.UNAUTHORIZED, 'No refresh token provided');
    }

    try {
        const decoded = verifyToken(refreshToken);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            return sendResponse(httpStatus.UNAUTHORIZED, 'User not found');
        }

        const { accessToken } = await createToken(user);

        cookieJar.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60, // 1 hour
        });

        return sendResponse(httpStatus.OK, 'Access token refreshed');
    } catch (error) {
        return sendResponse(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
    }
};
