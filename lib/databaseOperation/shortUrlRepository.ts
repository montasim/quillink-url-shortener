import prisma from '@/lib/prisma';
import { IShortUrlRepo } from '@/types/types';

const shortUrlRepository: IShortUrlRepo = {
    findUnique: async (args) => await prisma.shortUrl.findUnique(args),
    findFirst: async (args) => await prisma.shortUrl.findFirst(args),
    findMany: async (args) => await prisma.shortUrl.findMany(args),
    update: async (args) => await prisma.shortUrl.update(args),
    deleteData: async (args) => await prisma.shortUrl.delete(args),
    create: async (args) => await prisma.shortUrl.create(args),
};

export default shortUrlRepository;
