import prisma from '@/lib/prisma';
import { ITokenRepo } from '@/types/types';

const tokenRepository: ITokenRepo = {
    findUnique: async (args) => await prisma.token.findUnique(args),
    findFirst: async (args) => await prisma.token.findFirst(args),
    findMany: async (args) => await prisma.token.findMany(args),
    update: async (args) => await prisma.token.update(args),
    deleteData: async (args) => await prisma.token.delete(args),
    create: async (args) => await prisma.token.create(args),
};

export default tokenRepository;
