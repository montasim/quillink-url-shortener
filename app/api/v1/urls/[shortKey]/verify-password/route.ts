import { NextRequest } from 'next/server';
import httpStatus from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { getShortUrlDetails } from '@/services/url.service';
import bcrypt from 'bcrypt';

const { URL_CREATION } = MESSAGES;

const handleVerifyPassword = async (request: NextRequest) => {
    try {
        const { shortKey, password } = await request.json();

        if (!shortKey || !password) {
            return sendResponse(
                httpStatus.BAD_REQUEST,
                'Short key and password are required'
            );
        }

        // Get the short URL details
        const shortUrl = await getShortUrlDetails(
            { shortKey },
            { passwordHash: true, expiresAt: true }
        );

        if (!shortUrl) {
            return sendResponse(
                httpStatus.NOT_FOUND,
                'Short URL not found'
            );
        }

        // Check if URL has expired
        if (shortUrl.expiresAt && new Date() > shortUrl.expiresAt) {
            return sendResponse(
                httpStatus.GONE,
                'This link has expired'
            );
        }

        // Check if password is set
        if (!shortUrl.passwordHash) {
            return sendResponse(
                httpStatus.BAD_REQUEST,
                'This link is not password protected'
            );
        }

        // Verify password
        const isValid = await bcrypt.compare(password, shortUrl.passwordHash);

        if (!isValid) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                'Invalid password'
            );
        }

        return sendResponse(
            httpStatus.OK,
            'Password verified successfully',
            { verified: true }
        );
    } catch (error) {
        console.error('Password verification error:', error);
        return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Failed to verify password'
        );
    }
};

export const POST = asyncError(handleVerifyPassword);
