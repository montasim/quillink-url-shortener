import prisma from '@/lib/prisma';
import { ShortUrl } from '@/lib/generated/prisma';

interface IShortUrlRepo {
    findUnique: (args: any) => Promise<ShortUrl | null>;
    findFirst: (args: any) => Promise<ShortUrl | null>;
    findMany: (args: any) => Promise<ShortUrl[]>;
    update: (args: any) => Promise<ShortUrl>;
    deleteData: (args: any) => Promise<ShortUrl>;
    create: (args: any) => Promise<ShortUrl>;
}

const shortUrlRepository: IShortUrlRepo = {
    findUnique: async (args) => await prisma.shortUrl.findUnique(args),
    findFirst: async (args) => await prisma.shortUrl.findFirst(args),
    findMany: async (args) => await prisma.shortUrl.findMany(args),
    update: async (args) => await prisma.shortUrl.update(args),
    deleteData: async (args) => await prisma.shortUrl.delete(args),
    create: async (args) => await prisma.shortUrl.create(args),
};

export default shortUrlRepository;
