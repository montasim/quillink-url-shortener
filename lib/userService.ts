import prisma from '@/lib/prisma';

type GoogleProfile = {
    id: string;
    email: string;
    name: string;
    picture: string;
};

export const upsertUserFromGoogleProfile = async (profile: GoogleProfile) => {
    const { email, name, picture } = profile;

    // Upsert the user based on email
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            name,
        },
        create: {
            email,
            name,
        },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });

    return user;
};
