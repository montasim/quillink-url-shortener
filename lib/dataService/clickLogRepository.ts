import prisma from '@/lib/prisma';
import { IClickLogRepository } from '@/types/types';

const clickLogRepository: IClickLogRepository = {
    create: async (args) => await prisma.clickLog.create(args),
};

export default clickLogRepository;
