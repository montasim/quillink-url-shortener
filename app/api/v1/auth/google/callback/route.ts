import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { upsertUserFromGoogleProfile } from '@/lib/userService';
import { createToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import { cookies } from 'next/headers';
import httpStatus from 'http-status-lite';
import asyncError from "@/lib/asyncError";
import configuration from "@/configuration/configuration";
import contentTypesLite from "content-types-lite";

const handleGoogleLogin = async (req: NextRequest) => {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return sendResponse(httpStatus.BAD_REQUEST, 'Missing authorization code');
    }

    try {
        // Exchange code for tokens
        const { data: tokenResponse } = await axios.post(
            'https://oauth2.googleapis.com/token',
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

        // Fetch user profile
        const { data: profile } = await axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        // Upsert user in DB
        const user = await upsertUserFromGoogleProfile(profile);

        // Generate tokens
        const { accessToken, refreshToken } = await createToken(user);

        const cookieJar = await cookies();
        cookieJar.set('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60,
        });

        cookieJar.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        // ✅ Redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard/urls', req.url));
    } catch (error) {
        console.error('OAuth error:', error);
        return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'OAuth failed. Please try again.'
        );
    }
};

export const GET = asyncError(handleGoogleLogin);