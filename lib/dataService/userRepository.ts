import prisma from '@/lib/prisma';
import { IUserRepo } from '@/types/types';

const userRepository: IUserRepo = {
    findUnique: async (args) => await prisma.user.findUnique(args),
    findFirst: async (args) => await prisma.user.findFirst(args),
    findMany: async (args) => await prisma.user.findMany(args),
    update: async (args) => await prisma.user.update(args),
    deleteData: async (args) => await prisma.user.delete(args),
    create: async (args) => await prisma.user.create(args),
};

export default userRepository;
