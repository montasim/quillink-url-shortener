import { nanoid } from 'nanoid';
import COOKIES from '@/constants/cookies';
import { getGuestCookie, setCookie } from '@/lib/cookies';
import configuration from '@/configuration/configuration';
import ENVIRONMENTS from '@/constants/environments';

export const getOrCreateGuestId = async () => {
    const guestToken = await getGuestCookie();
    if (guestToken) return guestToken;

    const isProduction = configuration.nodeEnv === ENVIRONMENTS.PRODUCTION;
    const newGuestId = nanoid();
    await setCookie(
        COOKIES.NAME.GUEST_TOKEN,
        newGuestId,
        true,
        isProduction,
        'lax',
        '/',
        60 * 60 * 24 * 365 // 1 year
    );

    return newGuestId;
};
