import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';
import httpStatus from 'http-status-lite';
import contentTypesLite from 'content-types-lite';

import sendResponse from '@/utils/sendResponse';
import { upsertUserFromGoogleProfile } from '@/lib/userService';
import { createToken } from '@/lib/jwt';
import asyncError from '@/lib/asyncError';
import configuration from '@/configuration/configuration';
import { setAuthCookies } from '@/lib/cookies';
import MESSAGES from '@/constants/messages';

const { GOOGLE_AUTH } = MESSAGES;

const googleAuthCallbackHandler = async (req: NextRequest) => {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return sendResponse(httpStatus.BAD_REQUEST, GOOGLE_AUTH.MISSING_CODE);
    }

    try {
        // Exchange code for tokens
        const { data: tokenResponse } = await axios.post(
            configuration.googleOauth2.tokenUrl,
            {
                code,
                client_id: configuration.googleOauth2.clientId,
                client_secret: configuration.googleOauth2.clientSecret,
                redirect_uri: configuration.googleOauth2.redirectUri,
                grant_type: 'authorization_code',
            },
            {
                headers: {
                    'Content-Type': contentTypesLite.JSON,
                },
            }
        );

        const { access_token } = tokenResponse;

        if (!access_token) {
            return sendResponse(
                httpStatus.INTERNAL_SERVER_ERROR,
                GOOGLE_AUTH.TOKEN_EXCHANGE_FAILED
            );
        }

        // Fetch user profile
        const { data: profile } = await axios.get(
            configuration.googleOauth2.userInfoUrl,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (!profile) {
            return sendResponse(
                httpStatus.INTERNAL_SERVER_ERROR,
                GOOGLE_AUTH.PROFILE_FETCH_FAILED
            );
        }

        // Upsert user in DB
        const user = await upsertUserFromGoogleProfile(profile);

        if (!user) {
            return sendResponse(
                httpStatus.INTERNAL_SERVER_ERROR,
                GOOGLE_AUTH.UPSERT_FAILED
            );
        }

        // Generate tokens
        const { accessToken, refreshToken } = await createToken(user);

        await setAuthCookies({ accessToken, refreshToken });

        // Redirect to dashboard on successful login
        // Note: For successful redirects, sendResponse is typically not used,
        // as NextResponse.redirect handles the entire response.
        return NextResponse.redirect(new URL('/dashboard/urls', req.url));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return sendResponse(
                httpStatus.INTERNAL_SERVER_ERROR,
                GOOGLE_AUTH.INTERNAL_ERROR
            );
        }
        return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            GOOGLE_AUTH.INTERNAL_ERROR
        );
    }
};

export const GET = asyncError(googleAuthCallbackHandler);
