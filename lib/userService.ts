import prisma from '@/lib/prisma';

type GoogleProfile = {
    id: string;
    email: string;
    name: string;
    picture: string;
    provider: string;
};

export const upsertUserFromGoogleProfile = async (profile: GoogleProfile) => {
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
