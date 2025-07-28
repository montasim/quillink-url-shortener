import prisma from '@/lib/prisma';

(async () => {
    try {
        const result = await prisma.shortUrl.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });

        console.log(`🧹 Cleaned up ${result.count} expired URLs`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Cleanup failed:', error);
        process.exit(1);
    }
})();
