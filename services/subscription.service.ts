import prisma from '@/lib/prisma';
import { SubscriptionTier } from '@/lib/generated/prisma';

/**
 * Subscription Service
 * Manages user subscription tiers and premium features
 */

export interface SubscriptionInfo {
    tier: SubscriptionTier;
    isActive: boolean;
    expiresAt?: Date | null;
    features: SubscriptionFeatures;
}

export interface SubscriptionFeatures {
    // URL Shortener limits
    urlCreationLimit: number; // -1 = unlimited
    customSlugs: boolean;
    analyticsLevel: 'basic' | 'full' | 'advanced';
    qrCodes: boolean;
    customQrCodes: boolean;
    linkExpiration: boolean;
    passwordProtection: boolean;
    apiAccess: boolean;
    apiRateLimit: number; // requests per minute

    // Text Sharing limits
    textShareCreationLimit: number; // -1 = unlimited
    maxContentLengthKb: number;
    maxViewLimit: number; // -1 = unlimited
    defaultExpiryDays: number;
    advancedExpiration: boolean;

    // General
    prioritySupport: boolean;
}

// Tier configurations
const TIER_FEATURES: Record<SubscriptionTier, SubscriptionFeatures> = {
    [SubscriptionTier.GUEST]: {
        urlCreationLimit: 10,
        customSlugs: true,
        analyticsLevel: 'basic',
        qrCodes: true,
        customQrCodes: false,
        linkExpiration: false,
        passwordProtection: false,
        apiAccess: false,
        apiRateLimit: 10,
        textShareCreationLimit: 10,
        maxContentLengthKb: 100,
        maxViewLimit: 1000,
        defaultExpiryDays: 30,
        advancedExpiration: false,
        prioritySupport: false,
    },
    [SubscriptionTier.FREE]: {
        urlCreationLimit: -1, // unlimited for now (no payment system)
        customSlugs: true,
        analyticsLevel: 'full',
        qrCodes: true,
        customQrCodes: false,
        linkExpiration: false,
        passwordProtection: false,
        apiAccess: true,
        apiRateLimit: 60,
        textShareCreationLimit: -1, // unlimited for now
        maxContentLengthKb: 100,
        maxViewLimit: 1000,
        defaultExpiryDays: 30,
        advancedExpiration: false,
        prioritySupport: false,
    },
    [SubscriptionTier.PREMIUM]: {
        urlCreationLimit: -1, // unlimited
        customSlugs: true,
        analyticsLevel: 'advanced',
        qrCodes: true,
        customQrCodes: true,
        linkExpiration: true,
        passwordProtection: true,
        apiAccess: true,
        apiRateLimit: 1000,
        textShareCreationLimit: -1, // unlimited
        maxContentLengthKb: 500,
        maxViewLimit: 10000,
        defaultExpiryDays: -1, // custom
        advancedExpiration: true,
        prioritySupport: true,
    },
};

/**
 * Get user's subscription info
 */
export async function getUserSubscription(userId: string | null): Promise<SubscriptionInfo> {
    if (!userId) {
        return {
            tier: SubscriptionTier.GUEST,
            isActive: false,
            features: TIER_FEATURES[SubscriptionTier.GUEST],
        };
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            subscriptionTier: true,
            subscriptionActive: true,
            subscriptionExpiresAt: true,
        },
    });

    if (!user) {
        return {
            tier: SubscriptionTier.GUEST,
            isActive: false,
            features: TIER_FEATURES[SubscriptionTier.GUEST],
        };
    }

    const tier = user.subscriptionTier || SubscriptionTier.FREE;
    const isActive = user.subscriptionActive && (!user.subscriptionExpiresAt || user.subscriptionExpiresAt > new Date());

    return {
        tier,
        isActive,
        expiresAt: user.subscriptionExpiresAt,
        features: TIER_FEATURES[tier as keyof typeof TIER_FEATURES],
    };
}

/**
 * Upgrade user to premium tier
 */
export async function upgradeToPremium(
    userId: string,
    expiresAt?: Date
): Promise<SubscriptionInfo> {
    await prisma.user.update({
        where: { id: userId },
        data: {
            subscriptionTier: SubscriptionTier.PREMIUM,
            subscriptionActive: true,
            subscriptionStartedAt: new Date(),
            subscriptionExpiresAt: expiresAt,
        },
    });

    return getUserSubscription(userId);
}

/**
 * Downgrade user to free tier
 */
export async function downgradeToFree(userId: string): Promise<SubscriptionInfo> {
    await prisma.user.update({
        where: { id: userId },
        data: {
            subscriptionTier: SubscriptionTier.FREE,
            subscriptionActive: false,
            subscriptionExpiresAt: null,
        },
    });

    return getUserSubscription(userId);
}

/**
 * Check if user has access to a specific feature
 */
export function hasFeature(features: SubscriptionFeatures, featureName: keyof SubscriptionFeatures): boolean {
    const value = features[featureName];
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number') {
        return value > 0;
    }
    return false;
}

/**
 * Get limit for a specific feature
 */
export function getLimit(features: SubscriptionFeatures, limitName: keyof SubscriptionFeatures): number {
    const value = features[limitName];
    if (typeof value === 'number') {
        return value;
    }
    return 0;
}

/**
 * Check if user can create more URLs
 */
export async function canCreateUrl(userId: string | null, currentCount: number): Promise<{ canCreate: boolean; limit: number; remaining: number }> {
    const subscription = await getUserSubscription(userId);
    const limit = subscription.features.urlCreationLimit;

    if (limit === -1) {
        return { canCreate: true, limit: -1, remaining: -1 };
    }

    const remaining = Math.max(0, limit - currentCount);
    return {
        canCreate: remaining > 0,
        limit,
        remaining,
    };
}

/**
 * Check if user can create more text shares
 */
export async function canCreateTextShare(userId: string | null, currentCount: number): Promise<{ canCreate: boolean; limit: number; remaining: number }> {
    const subscription = await getUserSubscription(userId);
    const limit = subscription.features.textShareCreationLimit;

    if (limit === -1) {
        return { canCreate: true, limit: -1, remaining: -1 };
    }

    const remaining = Math.max(0, limit - currentCount);
    return {
        canCreate: remaining > 0,
        limit,
        remaining,
    };
}

/**
 * Get all available tiers with features
 */
export function getAvailableTiers(): Array<{
    tier: SubscriptionTier;
    name: string;
    price: string;
    features: SubscriptionFeatures;
}> {
    return [
        {
            tier: SubscriptionTier.GUEST,
            name: 'Guest',
            price: 'Free',
            features: TIER_FEATURES[SubscriptionTier.GUEST],
        },
        {
            tier: SubscriptionTier.FREE,
            name: 'Registered',
            price: 'Free',
            features: TIER_FEATURES[SubscriptionTier.FREE],
        },
        {
            tier: SubscriptionTier.PREMIUM,
            name: 'Premium',
            price: '$0.99/month',
            features: TIER_FEATURES[SubscriptionTier.PREMIUM],
        },
    ];
}
