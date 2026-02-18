import { Prisma } from '@/lib/generated/prisma/index.js';
import prisma from '@/lib/prisma';

export const textShareSelection = {
    id: true,
    shortKey: true,
    title: true,
    content: true,
    format: true,
    syntaxLanguage: true,
    passwordHash: true,
    expiresAt: true,
    viewLimit: true,
    viewCount: true,
    isPublic: true,
    customSlug: true,
    guestId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.TextShareSelect;

export const textShareWithViewLogsSelection = {
    ...textShareSelection,
    viewLogs: true,
} satisfies Prisma.TextShareSelect;

interface CreateTextShareInput {
    shortKey: string;
    title?: string;
    content: string;
    format?: 'plain' | 'markdown' | 'code';
    syntaxLanguage?: string;
    passwordHash?: string;
    expiresAt?: Date;
    viewLimit?: number;
    isPublic?: boolean;
    customSlug?: string;
    guestId?: string;
    userId?: string;
}

interface FindTextShareInput {
    shortKey?: string;
    customSlug?: string;
    guestId?: string;
    userId?: string;
}

interface UpdateTextShareInput {
    title?: string;
    content?: string;
    format?: 'plain' | 'markdown' | 'code';
    syntaxLanguage?: string;
    passwordHash?: string;
    expiresAt?: Date;
    viewLimit?: number;
    isPublic?: boolean;
    customSlug?: string;
}

/**
 * Create a new text share
 */
export async function createTextShare(data: CreateTextShareInput) {
    return prisma.textShare.create({
        data,
        select: textShareWithViewLogsSelection,
    });
}

/**
 * Find a text share by shortKey or customSlug
 */
export async function getTextShare({
    shortKey,
    customSlug,
}: FindTextShareInput) {
    return prisma.textShare.findFirst({
        where: {
            OR: [
                shortKey ? { shortKey } : {},
                customSlug ? { customSlug } : {},
            ].filter(Boolean),
        },
        select: textShareWithViewLogsSelection,
    });
}

/**
 * Get text share by ID
 */
export async function getTextShareById(id: string) {
    return prisma.textShare.findUnique({
        where: { id },
        select: textShareWithViewLogsSelection,
    });
}

/**
 * Check if a text share with same content already exists for user/guest
 */
export async function getExistingTextShare({
    content,
    title,
    guestId,
    userId,
}: {
    content: string;
    title?: string;
    guestId?: string;
    userId?: string;
}) {
    return prisma.textShare.findFirst({
        where: {
            content,
            title: title || undefined,
            ...(guestId ? { guestId } : {}),
            ...(userId ? { userId } : {}),
        },
        select: textShareSelection,
    });
}

/**
 * Update a text share
 */
export async function updateTextShare(
    where: { shortKey: string },
    data: UpdateTextShareInput
) {
    return prisma.textShare.update({
        where,
        data,
        select: textShareWithViewLogsSelection,
    });
}

/**
 * Delete a text share
 */
export async function deleteTextShare(shortKey: string) {
    return prisma.textShare.delete({
        where: { shortKey },
    });
}

/**
 * Get list of text shares for a user or guest
 */
export async function getTextShareList(
    filter: {
        guestId?: string;
        userId?: string;
        shortKey?: { contains: string; mode?: 'insensitive' };
        title?: { contains: string; mode?: 'insensitive' };
    },
    selection: Prisma.TextShareSelect = textShareSelection
) {
    return prisma.textShare.findMany({
        where: filter,
        select: selection,
        orderBy: { createdAt: 'desc' },
    });
}

/**
 * Increment view count for a text share
 */
export async function incrementViewCount(shortKey: string) {
    return prisma.textShare.update({
        where: { shortKey },
        data: { viewCount: { increment: 1 } },
        select: { viewCount: true },
    });
}

/**
 * Create a view log for a text share
 */
export async function createTextShareViewLog(data: {
    textShareId: string;
    ipAddress: string;
    country?: string;
    countryCode?: string;
    userAgent?: string;
}) {
    return prisma.textShareViewLog.create({
        data,
    });
}

/**
 * Get view logs for a text share
 */
export async function getTextShareViewLogs(textShareId: string) {
    return prisma.textShareViewLog.findMany({
        where: { textShareId },
        orderBy: { accessedAt: 'desc' },
    });
}

/**
 * Get expired text shares
 */
export async function getExpiredTextShares() {
    return prisma.textShare.findMany({
        where: {
            expiresAt: {
                lt: new Date(),
            },
        },
        select: { id: true, shortKey: true },
    });
}

/**
 * Delete expired text shares
 */
export async function deleteExpiredTextShares() {
    return prisma.textShare.deleteMany({
        where: {
            expiresAt: {
                lt: new Date(),
            },
        },
    });
}

/**
 * Check if a custom slug is available
 */
export async function isCustomSlugAvailable(customSlug: string) {
    const existing = await prisma.textShare.findUnique({
        where: { customSlug },
    });
    return !existing;
}
