import prisma from '@/lib/prisma';
import { getUserSubscription } from './subscription.service';

/**
 * Usage Tracking Service
 * Tracks user activity for rate limiting and feature access control
 */

export interface UsageStats {
    urlsCreated: number;
    textSharesCreated: number;
    apiCalls: number;
    qrCodesGenerated: number;
    lastApiCall?: Date | null;
    lastUrlCreation?: Date | null;
    lastTextShare?: Date | null;
}

export interface RateLimitCheck {
    allowed: boolean;
    remaining: number;
    resetAt: Date;
    limit: number;
}

/**
 * Get or create usage record for user
 */
export async function getOrCreateUsage(userId: string | null) {
    if (!userId) {
        // For guests, track by session (simplified - in production use session ID)
        return {
            urlsCreated: 0,
            textSharesCreated: 0,
            apiCalls: 0,
            qrCodesGenerated: 0,
            lastApiCall: null,
            lastUrlCreation: null,
            lastTextShare: null,
        };
    }

    const usage = await prisma.usage.upsert({
        where: { userId },
        update: {},
        create: {
            userId,
            urlsCreated: 0,
            textSharesCreated: 0,
            apiCalls: 0,
            qrCodesGenerated: 0,
        },
    });

    return usage;
}

/**
 * Increment URL creation count
 */
export async function incrementUrlCreation(userId: string | null) {
    if (!userId) return;

    await prisma.usage.update({
        where: { userId },
        data: {
            urlsCreated: { increment: 1 },
            lastUrlCreation: new Date(),
            updatedAt: new Date(),
        },
    });
}

/**
 * Increment text share creation count
 */
export async function incrementTextShareCreation(userId: string | null) {
    if (!userId) return;

    await prisma.usage.update({
        where: { userId },
        data: {
            textSharesCreated: { increment: 1 },
            lastTextShare: new Date(),
            updatedAt: new Date(),
        },
    });
}

/**
 * Increment API call count
 */
export async function incrementApiCall(userId: string | null) {
    if (!userId) return;

    await prisma.usage.update({
        where: { userId },
        data: {
            apiCalls: { increment: 1 },
            lastApiCall: new Date(),
            updatedAt: new Date(),
        },
    });
}

/**
 * Increment QR code generation count
 */
export async function incrementQrCodeGeneration(userId: string | null) {
    if (!userId) return;

    await prisma.usage.update({
        where: { userId },
        data: {
            qrCodesGenerated: { increment: 1 },
            updatedAt: new Date(),
        },
    });
}

/**
 * Check rate limit for API calls
 */
export async function checkRateLimit(userId: string | null): Promise<RateLimitCheck> {
    const subscription = await getUserSubscription(userId);
    const limit = subscription.features.apiRateLimit;
    
    if (!userId) {
        // Guest rate limiting (simplified)
        return {
            allowed: true,
            remaining: limit,
            resetAt: new Date(Date.now() + 60000), // 1 minute
            limit,
        };
    }

    const usage = await getOrCreateUsage(userId);
    const oneMinuteAgo = new Date(Date.now() - 60000);
    
    // Reset counter if last call was more than a minute ago
    if (!usage.lastApiCall || usage.lastApiCall < oneMinuteAgo) {
        await prisma.usage.update({
            where: { userId },
            data: {
                apiCalls: 0,
                periodStart: new Date(),
            },
        });
        return {
            allowed: true,
            remaining: limit,
            resetAt: new Date(Date.now() + 60000),
            limit,
        };
    }

    const remaining = Math.max(0, limit - usage.apiCalls);
    return {
        allowed: remaining > 0,
        remaining,
        resetAt: new Date(Date.now() + 60000),
        limit,
    };
}

/**
 * Check if user can create URL based on limits
 */
export async function checkUrlCreationLimit(userId: string | null): Promise<{
    allowed: boolean;
    remaining: number;
    limit: number;
}> {
    const subscription = await getUserSubscription(userId);
    const limit = subscription.features.urlCreationLimit;

    if (limit === -1) {
        return { allowed: true, remaining: -1, limit: -1 };
    }

    if (!userId) {
        // For guests, count from database
        const guestUrlCount = await prisma.shortUrl.count({
            where: { guestId: 'guest-session' }, // In production, use actual session ID
        });
        const remaining = Math.max(0, limit - guestUrlCount);
        return {
            allowed: remaining > 0,
            remaining,
            limit,
        };
    }

    const usage = await getOrCreateUsage(userId);
    const remaining = Math.max(0, limit - usage.urlsCreated);

    return {
        allowed: remaining > 0,
        remaining,
        limit,
    };
}

/**
 * Check if user can create text share based on limits
 */
export async function checkTextShareCreationLimit(userId: string | null): Promise<{
    allowed: boolean;
    remaining: number;
    limit: number;
}> {
    const subscription = await getUserSubscription(userId);
    const limit = subscription.features.textShareCreationLimit;

    if (limit === -1) {
        return { allowed: true, remaining: -1, limit: -1 };
    }

    if (!userId) {
        // For guests, count from database
        const guestTextShareCount = await prisma.textShare.count({
            where: { guestId: 'guest-session' }, // In production, use actual session ID
        });
        const remaining = Math.max(0, limit - guestTextShareCount);
        return {
            allowed: remaining > 0,
            remaining,
            limit,
        };
    }

    const usage = await getOrCreateUsage(userId);
    const remaining = Math.max(0, limit - usage.textSharesCreated);

    return {
        allowed: remaining > 0,
        remaining,
        limit,
    };
}

/**
 * Reset usage counters (for monthly reset or subscription change)
 */
export async function resetUsage(userId: string) {
    await prisma.usage.update({
        where: { userId },
        data: {
            urlsCreated: 0,
            textSharesCreated: 0,
            apiCalls: 0,
            qrCodesGenerated: 0,
            periodStart: new Date(),
            updatedAt: new Date(),
        },
    });
}

/**
 * Get user's complete usage statistics
 */
export async function getUsageStats(userId: string | null): Promise<UsageStats | null> {
    if (!userId) {
        return null;
    }

    const usage = await prisma.usage.findUnique({
        where: { userId },
    });

    if (!usage) {
        return {
            urlsCreated: 0,
            textSharesCreated: 0,
            apiCalls: 0,
            qrCodesGenerated: 0,
            lastApiCall: null,
            lastUrlCreation: null,
            lastTextShare: null,
        };
    }

    return {
        urlsCreated: usage.urlsCreated,
        textSharesCreated: usage.textSharesCreated,
        apiCalls: usage.apiCalls,
        qrCodesGenerated: usage.qrCodesGenerated,
        lastApiCall: usage.lastApiCall,
        lastUrlCreation: usage.lastUrlCreation,
        lastTextShare: usage.lastTextShare,
    };
}
