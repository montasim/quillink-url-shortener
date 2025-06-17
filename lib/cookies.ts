import { cookies } from 'next/headers';
import configuration from '@/configuration/configuration';

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

const cookieJar = await cookies();

export const setCookie = async (
    name: string,
    value: string,
    httpOnly: boolean,
    secure: boolean,
    sameSite: 'lax' | 'strict' | 'none',
    path: string,
    maxAge: number
) => {
    cookieJar.set(name, value, {
        httpOnly,
        secure,
        sameSite,
        path,
        maxAge,
    });
};

export async function setAuthCookies(tokens: AuthTokens) {
    const isProduction = configuration.nodeEnv === 'production';

    await setCookie(
        'accessToken',
        tokens.accessToken,
        true,
        isProduction,
        'lax',
        '/',
        60 * 60
    );

    await setCookie(
        'refreshToken',
        tokens.refreshToken,
        true,
        isProduction,
        'lax',
        '/',
        60 * 60 * 24 * 7
    );
}

export const clearAuthCookies = async () => {
    cookieJar.delete('accessToken');
    cookieJar.delete('refreshToken');
}
