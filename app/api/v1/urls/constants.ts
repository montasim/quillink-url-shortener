import { SubscriptionTier } from '@/lib/generated/prisma';

/**
 * URL Creation Limits by Subscription Tier
 * -1 means unlimited
 */
const URL_CREATION_LIMIT = {
    [SubscriptionTier.GUEST]: 10,
    [SubscriptionTier.FREE]: -1, // unlimited for now
    [SubscriptionTier.PREMIUM]: -1, // unlimited
} as const;

/**
 * Feature Availability by Subscription Tier
 */
const URL_FEATURES = {
    [SubscriptionTier.GUEST]: {
        customSlugs: true,
        analytics: 'basic' as const,
        qrCodes: true,
        customQrCodes: false,
        linkExpiration: false,
        passwordProtection: false,
        apiAccess: false,
    },
    [SubscriptionTier.FREE]: {
        customSlugs: true,
        analytics: 'full' as const,
        qrCodes: true,
        customQrCodes: false,
        linkExpiration: false,
        passwordProtection: false,
        apiAccess: true,
    },
    [SubscriptionTier.PREMIUM]: {
        customSlugs: true,
        analytics: 'advanced' as const,
        qrCodes: true,
        customQrCodes: true,
        linkExpiration: true,
        passwordProtection: true,
        apiAccess: true,
    },
} as const;

/**
 * Rate Limits (requests per minute) by Subscription Tier
 */
const RATE_LIMITS = {
    [SubscriptionTier.GUEST]: 10,
    [SubscriptionTier.FREE]: 60,
    [SubscriptionTier.PREMIUM]: 1000,
} as const;

const CONSTANTS = Object.freeze({
    URL_CREATION_LIMIT,
    URL_FEATURES,
    RATE_LIMITS,
} as const);

export default CONSTANTS;
