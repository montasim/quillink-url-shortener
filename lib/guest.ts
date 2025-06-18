import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import COOKIES from '@/constants/cookies';
import { setCookie } from '@/lib/cookies';
import configuration from '@/configuration/configuration';
import ENVIRONMENTS from '@/constants/environments';

export const getOrCreateGuestId = async () => {
    const cookieStore = await cookies();
    const guestId = cookieStore.get(COOKIES.NAME.GUEST_TOKEN)?.value;
    if (guestId) return guestId;

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
