import { cookies } from 'next/headers';
import configuration from '@/configuration/configuration';
import COOKIES from '@/constants/cookies';
import { IAuthTokens } from '@/types/types';

export const setCookie = async (
    name: string,
    value: string,
    httpOnly: boolean,
    secure: boolean,
    sameSite: 'lax' | 'strict' | 'none',
    path: string,
    maxAge: number
) => {
    const cookieJar = await cookies();
    cookieJar.set(name, value, {
        httpOnly,
        secure,
        sameSite,
        path,
        maxAge,
    });
};

export async function setAuthCookies(tokens: IAuthTokens) {
    const isProduction = configuration.nodeEnv === 'production';

    await setCookie(
        COOKIES.NAME.ACCESS_TOKEN,
        tokens.accessToken,
        true,
        isProduction,
        'lax',
        '/',
        60 * 60
    );

    await setCookie(
        COOKIES.NAME.REFRESH_TOKEN,
        tokens.refreshToken,
        true,
        isProduction,
        'lax',
        '/',
        60 * 60 * 24 * 7
    );
}

export const clearAuthCookies = async () => {
    const cookieJar = await cookies();

    cookieJar.delete(COOKIES.NAME.ACCESS_TOKEN);
    cookieJar.delete(COOKIES.NAME.REFRESH_TOKEN);
};
