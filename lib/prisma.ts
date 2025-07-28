import { PrismaClient } from './generated/prisma';
import ENVIRONMENTS from '@/constants/environments';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== ENVIRONMENTS.PRODUCTION)
    globalForPrisma.prisma = prisma;

export default prisma;
