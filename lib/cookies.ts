import { cookies } from 'next/headers';
import configuration from '@/configuration/configuration';
import COOKIES from '@/constants/cookies';
import ENVIRONMENTS from '@/constants/environments';
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
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
        httpOnly,
        secure,
        sameSite,
        path,
        maxAge,
    });
};

export async function setAuthCookies(tokens: IAuthTokens) {
    const isProduction = configuration.nodeEnv === ENVIRONMENTS.PRODUCTION;

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
    const cookieStore = await cookies();

    cookieStore.delete(COOKIES.NAME.ACCESS_TOKEN);
    cookieStore.delete(COOKIES.NAME.REFRESH_TOKEN);
    cookieStore.delete(COOKIES.NAME.GUEST_TOKEN);
};

export const getAccessCookie = async () => {
    const cookieStore = await cookies();

    return cookieStore.get(COOKIES.NAME.ACCESS_TOKEN)?.value;
};

export const getGuestCookie = async () => {
    const cookieStore = await cookies();

    return cookieStore.get(COOKIES.NAME.GUEST_TOKEN)?.value;
};

export const getRefreshCookie = async () => {
    const cookieStore = await cookies();

    return cookieStore.get(COOKIES.NAME.REFRESH_TOKEN)?.value;
};

export const getCookies = async () => {
    const cookieStore = await cookies();

    const guestCookie = cookieStore.get(COOKIES.NAME.GUEST_TOKEN)?.value;
    const accessCookie = cookieStore.get(COOKIES.NAME.ACCESS_TOKEN)?.value;
    const refreshCookie = cookieStore.get(COOKIES.NAME.REFRESH_TOKEN)?.value;

    return { guestCookie, accessCookie, refreshCookie };
};
