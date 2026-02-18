#!/usr/bin/env node
/**
 * Cleanup script for expired text shares.
 * Run this periodically via cron to remove expired content.
 * 
 * Usage: node scripts/cleanup-expired-shares.js
 */

const { PrismaClient } = require('../lib/generated/prisma/index.js');

const prisma = new PrismaClient();

async function cleanupExpiredShares() {
    try {
        const now = new Date();
        console.log(`Starting cleanup at ${now.toISOString()}`);

        // Find expired text shares
        const expiredShares = await prisma.textShare.findMany({
            where: {
                expiresAt: {
                    lt: now,
                },
            },
            select: {
                id: true,
                shortKey: true,
                title: true,
            },
        });

        if (expiredShares.length === 0) {
            console.log('No expired shares found.');
            return;
        }

        console.log(`Found ${expiredShares.length} expired shares to delete.`);

        // Delete expired shares
        const result = await prisma.textShare.deleteMany({
            where: {
                expiresAt: {
                    lt: now,
                },
            },
        });

        console.log(`Deleted ${result.count} expired text shares.`);

        // Also clean up orphaned view logs (cascade should handle this, but just in case)
        const orphanedLogs = await prisma.textShareViewLog.deleteMany({
            where: {
                textShare: {
                    is: null,
                },
            },
        });

        if (orphanedLogs.count > 0) {
            console.log(`Deleted ${orphanedLogs.count} orphaned view logs.`);
        }

        console.log('Cleanup completed successfully.');
    } catch (error) {
        console.error('Cleanup failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Run cleanup
cleanupExpiredShares();
