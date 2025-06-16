import prisma from '@/lib/prisma';
import { ClickLog } from '@/lib/generated/prisma';

interface ClickLogRepository {
    create: (args: any) => Promise<ClickLog>;
}

const clickLogRepository: ClickLogRepository = {
    create: async (args) => await prisma.clickLog.create(args),
};

export default clickLogRepository;
