import { SubscriptionTier } from '@/lib/generated/prisma';

/**
 * Text Share Creation Limits by Subscription Tier
 * -1 means unlimited
 */
const TEXT_SHARE_CREATION_LIMIT = {
    [SubscriptionTier.GUEST]: 10,
    [SubscriptionTier.FREE]: -1, // unlimited for now
    [SubscriptionTier.PREMIUM]: -1, // unlimited
} as const satisfies Record<SubscriptionTier, number>;

/**
 * Content Length Limits (KB) by Subscription Tier
 */
const MAX_CONTENT_LENGTH_KB = {
    [SubscriptionTier.GUEST]: 100,
    [SubscriptionTier.FREE]: 100,
    [SubscriptionTier.PREMIUM]: 500,
} as const satisfies Record<SubscriptionTier, number>;

/**
 * View Limits by Subscription Tier
 * -1 means unlimited
 */
const MAX_VIEW_LIMIT = {
    [SubscriptionTier.GUEST]: 1000,
    [SubscriptionTier.FREE]: 1000,
    [SubscriptionTier.PREMIUM]: 10000,
} as const satisfies Record<SubscriptionTier, number>;

/**
 * Feature Availability by Subscription Tier
 */
const TEXT_SHARE_FEATURES = {
    [SubscriptionTier.GUEST]: {
        passwordProtection: true,
        syntaxHighlighting: true,
        analytics: false,
        customSlugs: true,
        autoExpiration: true,
        advancedExpiration: false,
    },
    [SubscriptionTier.FREE]: {
        passwordProtection: true,
        syntaxHighlighting: true,
        analytics: 'basic' as const,
        customSlugs: true,
        autoExpiration: true,
        advancedExpiration: false,
    },
    [SubscriptionTier.PREMIUM]: {
        passwordProtection: true,
        syntaxHighlighting: true,
        analytics: 'advanced' as const,
        customSlugs: true,
        autoExpiration: true,
        advancedExpiration: true,
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
    TEXT_SHARE_CREATION_LIMIT,
    MAX_CONTENT_LENGTH_KB,
    MAX_VIEW_LIMIT,
    TEXT_SHARE_FEATURES,
    RATE_LIMITS,
} as const);

export default CONSTANTS;
