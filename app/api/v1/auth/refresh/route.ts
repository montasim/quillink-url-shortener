import { cookies } from 'next/headers';
import { verifyToken, createToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import prisma from '@/lib/prisma';
import httpStatus from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import { setAuthCookies } from '@/lib/cookies';

const refreshTokenHandler = async () => {
    const cookieJar = await cookies();
    const refreshToken = cookieJar.get('refreshToken')?.value;

    if (!refreshToken) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            'No refresh token provided'
        );
    }

    try {
        const decoded = verifyToken(refreshToken);

        if (!decoded || !decoded.id) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                'Invalid refresh token payload'
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return sendResponse(httpStatus.UNAUTHORIZED, 'User not found');
        }

        const { accessToken, refreshToken: newRefreshToken } =
            await createToken(user);

        await setAuthCookies({
            accessToken,
            refreshToken: newRefreshToken || refreshToken,
        });

        return sendResponse(httpStatus.OK, 'Access token refreshed');
    } catch (error) {
        console.error('Refresh token error:', error);
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            'Invalid or expired refresh token'
        );
    }
};

export const GET = asyncError(refreshTokenHandler);
