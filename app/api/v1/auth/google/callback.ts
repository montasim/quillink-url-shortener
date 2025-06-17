import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return NextResponse.redirect('/login?error=missing-code');
    }

    try {
        const tokenRes = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const { access_token } = tokenRes.data;

        const userRes = await axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );

        const { email, name } = userRes.data;

        // Check or create user
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma.user.create({
                data: { email, name, password: '' },
            });
        }

        const { accessToken, refreshToken } = await createToken({
            id: user.id,
            name: user.name,
            email: user.email,
        });

        const cookieJar = await cookies();
        cookieJar.set('accessToken', accessToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60,
        });
        cookieJar.set('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.redirect('/dashboard/urls');
    } catch (error) {
        console.error(error);
        return NextResponse.redirect('/login?error=oauth-failed');
    }
};
