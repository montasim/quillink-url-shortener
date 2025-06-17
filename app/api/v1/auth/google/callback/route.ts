import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { upsertUserFromGoogleProfile } from '@/lib/userService';
import { createToken } from '@/lib/jwt';
import sendResponse from '@/utils/sendResponse';
import { cookies } from 'next/headers';
import httpStatus from 'http-status-lite';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = 'https://quillink.netlify.app/api/v1/auth/google/callback';

export const GET = async (req: NextRequest) => {
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
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60,
        });

        cookieJar.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
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
