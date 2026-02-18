import { NextRequest } from 'next/server';
import httpStatus from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { getTextShare, getTextShareViewLogs } from '@/services/text-share.service';
import { getCookies } from '@/lib/cookies';

const { TEXT_SHARE } = MESSAGES;

const handleGetTextShareStats = async (
    request: NextRequest,
    { params }: { params: Promise<{ shortKey: string }> }
) => {
    const { shortKey } = await params;
    const { guestCookie } = await getCookies();

    const textShare = await getTextShare({ shortKey });

    if (!textShare) {
        return sendResponse(
            httpStatus.NOT_FOUND,
            TEXT_SHARE?.NOT_FOUND || 'Text share not found'
        );
    }

    // Check ownership
    if (textShare.guestId && textShare.guestId !== guestCookie) {
        return sendResponse(
            httpStatus.FORBIDDEN,
            TEXT_SHARE?.UNAUTHORIZED || 'Only the owner can view stats'
        );
    }

    const viewLogs = await getTextShareViewLogs(textShare.id);

    // Aggregate stats
    const stats = {
        totalViews: textShare.viewCount,
        viewLimit: textShare.viewLimit,
        remainingViews: textShare.viewLimit
            ? textShare.viewLimit - textShare.viewCount
            : null,
        expiresAt: textShare.expiresAt,
        isExpired: textShare.expiresAt
            ? new Date() > textShare.expiresAt
            : false,
        recentViews: viewLogs.slice(0, 10).map((log) => ({
            accessedAt: log.accessedAt,
            country: log.country,
            userAgent: log.userAgent,
        })),
    };

    return sendResponse(
        httpStatus.OK,
        TEXT_SHARE?.STATS_SUCCESS || 'Stats fetched successfully',
        stats
    );
};

export const GET = asyncError(handleGetTextShareStats);
