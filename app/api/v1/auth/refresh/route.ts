import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
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
        // Use the 'refresh' type explicitly for verification
        const decoded = verifyToken(refreshToken, 'refresh');

        // Access nested properties: decoded.currentUser.id or decoded.currentUser.email
        if (!decoded || !decoded.currentUser || !decoded.currentUser.id) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                'Invalid refresh token payload or missing user info'
            );
        }

        // Use decoded.currentUser.id for lookup, as it's the primary key
        const user = await prisma.user.findUnique({
            where: { id: decoded.currentUser.id },
            select: {
                id: true,
                name: true,
                email: true,
                picture: true,
            },
        });

        if (!user) {
            return sendResponse(httpStatus.UNAUTHORIZED, 'User not found');
        }

        // If you need to check the expiry stored *inside* the token payload
        // This is separate from jwt.verify's automatic 'exp' check.
        // You might use this for specific business logic if the JWT 'exp' isn't sufficient.
        const expiryDate = new Date(decoded.expiry);
        if (expiryDate.getTime() < Date.now()) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                'Refresh token payload expired'
            );
        }

        // createToken expects the `TokenUserDetails` shape
        const { accessToken, refreshToken: newRefreshToken } =
            await createToken(user);

        await setAuthCookies({
            accessToken,
            refreshToken: newRefreshToken,
        });

        const userData = {
            name: user.name,
            email: user.email,
            picture: user.picture,
        };

        return sendResponse(httpStatus.OK, 'Access token refreshed', userData);
    } catch (error) {
        console.error('Refresh token error:', error);
        // Distinguish between actual token expiration/invalidity and other errors
        if (error instanceof jwt.JsonWebTokenError) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                'Invalid or expired refresh token'
            );
        }
        return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'An internal error occurred during token refresh.'
        );
    }
};

export const GET = asyncError(refreshTokenHandler);
