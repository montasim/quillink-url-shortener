import prisma from '@/lib/prisma';
import { User } from '@/lib/generated/prisma';

interface IUserRepo {
    findUnique: (args: any) => Promise<User | null>;
    findFirst: (args: any) => Promise<User | null>;
    findMany: (args: any) => Promise<User[]>;
    update: (args: any) => Promise<User>;
    deleteData: (args: any) => Promise<User>;
    create: (args: any) => Promise<User>;
}

const userRepository: IUserRepo = {
    findUnique: async (args) => await prisma.user.findUnique(args),
    findFirst: async (args) => await prisma.user.findFirst(args),
    findMany: async (args) => await prisma.user.findMany(args),
    update: async (args) => await prisma.user.update(args),
    deleteData: async (args) => await prisma.user.delete(args),
    create: async (args) => await prisma.user.create(args),
};

export default userRepository;
