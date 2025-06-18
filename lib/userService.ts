import prisma from '@/lib/prisma';
import { IGoogleProfile } from '@/types/types';

export const upsertUserFromGoogleProfile = async (profile: IGoogleProfile) => {
    const { email, name, picture } = profile;

    // Upsert the user based on email
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            name,
            picture,
        },
        create: {
            email,
            name,
            picture,
            provider: 'google',
        },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });

    return user;
};
