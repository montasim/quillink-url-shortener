import { NextRequest } from 'next/server';
import httpStatus from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import { getUserSubscription } from '@/services/subscription.service';
import { getShortUrlList } from '@/services/url.service';
import { getTextShareList } from '@/services/text-share.service';
import COOKIES from '@/constants/cookies';
import { verifyToken } from '@/lib/jwt';
import { getAccessCookie, getGuestCookie } from '@/lib/cookies';

const handleGetUsageStats = async (request: NextRequest) => {
    try {
        const accessCookie = await getAccessCookie();
        const guestCookie = await getGuestCookie();
        let userId: string | null = null;
        let guestId: string | null = null;

        if (accessCookie) {
            try {
                const decoded = verifyToken(accessCookie, COOKIES.TYPE.ACCESS);
                userId = decoded?.currentUser?.id || null;
            } catch (err) {
                console.error('Access token verification failed:', err);
            }
        }

        // If no user, use guest ID from cookie
        if (!userId && guestCookie) {
            guestId = guestCookie;
        }

        console.log('Usage API - userId:', userId, 'guestId:', guestId);

        // Get subscription info
        const subscription = await getUserSubscription(userId);
        console.log('Usage API - subscription:', subscription.tier);

        // Get actual usage from database
        const [urlCount, textShareCount] = await Promise.all([
            userId
                ? getShortUrlList({ userId }).then(urls => {
                      console.log('Usage API - User URL count:', urls.length);
                      return urls.length;
                  })
                : guestId
                ? getShortUrlList({ guestId }).then(urls => {
                      console.log('Usage API - Guest URL count:', urls.length);
                      return urls.length;
                  })
                : Promise.resolve(0),
            userId
                ? getTextShareList({ userId }).then(shares => {
                      console.log('Usage API - User text share count:', shares.length);
                      return shares.length;
                  })
                : guestId
                ? getTextShareList({ guestId }).then(shares => {
                      console.log('Usage API - Guest text share count:', shares.length);
                      return shares.length;
                  })
                : Promise.resolve(0),
        ]);

        return sendResponse(
            httpStatus.OK,
            'Usage stats retrieved successfully',
            {
                tier: subscription.tier,
                isActive: subscription.isActive,
                urls: {
                    used: urlCount,
                    limit: subscription.features.urlCreationLimit,
                    remaining: subscription.features.urlCreationLimit === -1
                        ? -1
                        : Math.max(0, subscription.features.urlCreationLimit - urlCount),
                },
                textShares: {
                    used: textShareCount,
                    limit: subscription.features.textShareCreationLimit,
                    remaining: subscription.features.textShareCreationLimit === -1
                        ? -1
                        : Math.max(0, subscription.features.textShareCreationLimit - textShareCount),
                },
            }
        );
    } catch (error) {
        console.error('Failed to fetch usage stats:', error);
        return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Failed to fetch usage stats'
        );
    }
};

export const GET = asyncError(handleGetUsageStats);
