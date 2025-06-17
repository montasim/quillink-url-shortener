import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { upsertUserFromGoogleProfile } from '@/lib/userService';

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return NextResponse.redirect('/login?error=NoCodeFromGoogle');
    }

    try {
        // 1. Exchange code for tokens
        const { data: tokenData } = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token, id_token } = tokenData;

        // 2. Get user info from Google
        const { data: profile } = await axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        // 3. Create or update user in your DB
        const user = await upsertUserFromGoogleProfile(profile);

        // 4. Generate JWT tokens
        const { accessToken, refreshToken } = await createToken(user);

        // 5. Set cookies
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

        return NextResponse.redirect('/dashboard/urls');
    } catch (error) {
        console.error('Google auth error:', error);
        return NextResponse.redirect('/login?error=OAuthFailed');
    }
};
