import { NextRequest } from 'next/server';
import httpStatusLite from 'http-status-lite';
import { addMonths } from 'date-fns';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { TextShareSchema } from '@/schemas/textShareSchema';
import {
    createTextShare,
    getTextShare,
    getTextShareList,
    isCustomSlugAvailable,
    getExistingTextShare,
} from '@/services/text-share.service';
import { getOrCreateGuestId } from '@/lib/guest';
import COOKIES from '@/constants/cookies';
import httpStatus from 'http-status-lite';
import { ISignedJwtPayload } from '@/types/types';
import { verifyToken } from '@/lib/jwt';
import { meSelection } from '@/app/api/v1/auth/me/selection';
import { getAccessCookie, getCookies } from '@/lib/cookies';
import { getUserDetails } from '@/services/user.service';
import CONSTANTS from './constants';
import { hashPassword } from '@/lib/hashPassword';
import { generateShortKey } from '@/lib/generateShortKey';

const { AUTHENTICATION, TEXT_SHARE } = MESSAGES;
const { TEXT_SHARE_CREATION_LIMIT } = CONSTANTS;

const handleCreateTextShare = async (request: NextRequest) => {
    const accessCookie = await getAccessCookie();

    let userId: string | null = null;
    let guestId: string | null = null;

    // Parse request body
    const requestBody = await request.json();
    const schemaValidationResult = TextShareSchema.safeParse(requestBody);

    if (!schemaValidationResult.success) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            TEXT_SHARE?.VALIDATION_ERROR || 'Invalid data provided',
            {},
            schemaValidationResult.error.flatten()
        );
    }

    const data = schemaValidationResult.data;

    // Identify user or guest
    if (accessCookie) {
        try {
            const decoded = verifyToken(accessCookie, COOKIES.TYPE.ACCESS);
            userId = decoded?.currentUser?.id || null;
        } catch (err) {
            console.error('Access token verification failed:', err);
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                AUTHENTICATION.UNAUTHORIZED
            );
        }

        if (!userId) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                AUTHENTICATION.UNAUTHORIZED
            );
        }

        const user = await getUserDetails({ id: userId }, meSelection);
        if (!user) {
            return sendResponse(
                httpStatus.UNAUTHORIZED,
                AUTHENTICATION.UNAUTHORIZED
            );
        }

        const userTextShares = await getTextShareList({ userId });

        if (
            !user.subscription &&
            userTextShares.length >=
                TEXT_SHARE_CREATION_LIMIT.USER_WITHOUT_SUBSCRIPTION
        ) {
            return sendResponse(
                httpStatus.FORBIDDEN,
                TEXT_SHARE?.LIMIT_REACHED ||
                    'Limit reached. Subscribe to create more.'
            );
        }
    } else {
        guestId = await getOrCreateGuestId();

        const guestTextShares = await getTextShareList({ guestId });

        if (guestTextShares.length >= TEXT_SHARE_CREATION_LIMIT.GUEST) {
            return sendResponse(
                httpStatus.FORBIDDEN,
                TEXT_SHARE?.LIMIT_REACHED ||
                    'Limit reached. Sign in to create more.'
            );
        }
    }

    // Check custom slug availability
    if (data?.customSlug) {
        const isAvailable = await isCustomSlugAvailable(data.customSlug);

        if (!isAvailable) {
            return sendResponse(
                httpStatus.CONFLICT,
                TEXT_SHARE?.SLUG_TAKEN || 'This custom link is already taken',
                {}
            );
        }
    }

    // Check duplicate content for same user/guest
    const existingTextShare = await getExistingTextShare({
        content: data.content,
        title: data.title,
        ...(guestId ? { guestId } : {}),
        ...(userId ? { userId } : {}),
    });

    if (existingTextShare) {
        return sendResponse(
            httpStatus.OK,
            TEXT_SHARE?.ALREADY_EXISTS || 'This text share already exists',
            existingTextShare
        );
    }

    // Hash password if provided
    let passwordHash: string | undefined;
    if (data.password) {
        passwordHash = await hashPassword(data.password);
    }

    // Default expiration = 6 months
    const expiresAt = data.expiresAt || addMonths(new Date(), 6);

    // Generate shortKey with retry logic
    const maxRetries = data.customSlug ? 1 : 10;
    let retries = 0;
    let shortKey = data.customSlug || generateShortKey();

    while (retries < maxRetries) {
        try {
            const createdTextShare = await createTextShare({
                shortKey,
                customSlug: data.customSlug || undefined,
                title: data.title,
                content: data.content,
                format: data.format,
                syntaxLanguage: data.syntaxLanguage,
                passwordHash,
                expiresAt,
                viewLimit: data.viewLimit,
                isPublic: data.isPublic,
                ...(guestId ? { guestId } : {}),
                ...(userId ? { userId } : {}),
            });

            const { passwordHash: _, ...safeData } = createdTextShare;

            return sendResponse(
                httpStatus.CREATED,
                TEXT_SHARE?.CREATION_SUCCESS ||
                    'Text share created successfully',
                safeData
            );
        } catch (error: any) {
            const isShortKeyCollision =
                error.code === 'P2002' &&
                error.meta?.target?.includes('shortKey');

            if (isShortKeyCollision) {
                if (data.customSlug) {
                    return sendResponse(
                        httpStatus.CONFLICT,
                        TEXT_SHARE?.SLUG_TAKEN ||
                            'This custom link is already taken',
                        {}
                    );
                }

                retries++;
                console.log(
                    `ShortKey collision (${retries}/${maxRetries}), regenerating...`
                );

                shortKey = generateShortKey();
                continue;
            }

            // real error (content duplicate, title duplicate, etc.)
            console.error('Text share creation error:', {
                code: error?.code,
                message: error?.message,
                meta: error?.meta,
                stack: error?.stack,
            });

            throw error;
        }
    }

    console.error(
        `Failed to generate unique shortKey after ${maxRetries} attempts`
    );

    return sendResponse(
        httpStatus.CONFLICT,
        TEXT_SHARE?.CREATION_ERROR ||
            "Couldn't create share. Please try again.",
        {}
    );
};

const handleGetTextShares = async (request: NextRequest) => {
    const { accessCookie, guestCookie } = await getCookies();

    let userId: string | null = null;
    let guestId: string | null = null;

    if (accessCookie) {
        try {
            const decodedPayload: ISignedJwtPayload = verifyToken(
                accessCookie,
                'access'
            );
            if (decodedPayload?.currentUser?.id) {
                userId = decodedPayload.currentUser.id;
            }
        } catch (error) {
            console.error('Access token verification failed:', error);
        }
    }

    if (!userId && guestCookie) {
        guestId = guestCookie;
    }

    if (!userId && !guestId) {
        return sendResponse(
            httpStatus.UNAUTHORIZED,
            TEXT_SHARE?.UNAUTHORIZED || 'Unauthorized'
        );
    }

    // Extract query parameters
    const urlQueryParameters = request.nextUrl.searchParams;
    const shortKeyParam = urlQueryParameters.get('shortKey');
    const titleParam = urlQueryParameters.get('title');

    const filterConditions: any = {};

    if (userId) {
        filterConditions.userId = userId;
    } else if (guestId) {
        filterConditions.guestId = guestId;
    }

    if (shortKeyParam) {
        filterConditions.shortKey = {
            contains: shortKeyParam,
            mode: 'insensitive',
        };
    }

    if (titleParam) {
        filterConditions.title = {
            contains: titleParam,
            mode: 'insensitive',
        };
    }

    const textShares = await getTextShareList(filterConditions);

    if (!textShares.length) {
        return sendResponse(
            httpStatus.NOT_FOUND,
            TEXT_SHARE?.NOT_FOUND || 'No text shares found'
        );
    }

    // Remove passwordHash and add requiresPassword boolean for security
    const safeTextShares = textShares.map(({ passwordHash, ...share }) => ({
        ...share,
        requiresPassword: !!passwordHash,
    }));

    return sendResponse(
        httpStatus.OK,
        TEXT_SHARE?.LIST_SUCCESS || 'Text shares fetched successfully',
        safeTextShares
    );
};

export const GET = asyncError(handleGetTextShares);
export const POST = asyncError(handleCreateTextShare);
