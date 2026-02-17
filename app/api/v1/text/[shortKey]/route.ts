import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import {
    getTextShare,
    updateTextShare,
    deleteTextShare,
    incrementViewCount,
    createTextShareViewLog,
} from '@/services/text-share.service';
import getClientIp from '@/lib/getClientIp';
import { verifyPassword } from '@/lib/verifyPassword';
import { getCookies } from '@/lib/cookies';

const { TEXT_SHARE } = MESSAGES;

const handleGetTextShare = async (
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

    // Check if expired
    if (textShare.expiresAt && new Date() > textShare.expiresAt) {
        return sendResponse(
            httpStatus.GONE,
            TEXT_SHARE?.EXPIRED || 'This text share has expired'
        );
    }

    // Check view limit
    if (textShare.viewLimit && textShare.viewCount >= textShare.viewLimit) {
        return sendResponse(
            httpStatus.GONE,
            TEXT_SHARE?.VIEW_LIMIT_REACHED ||
                'This text share has reached its view limit'
        );
    }

    // Check ownership for non-public shares
    if (!textShare.isPublic) {
        if (!guestCookie || textShare.guestId !== guestCookie) {
            return sendResponse(
                httpStatus.FORBIDDEN,
                TEXT_SHARE?.UNAUTHORIZED || 'Unauthorized'
            );
        }
    }

    // Log the view (async, don't wait)
    const ipAddress = getClientIp(request);
    createTextShareViewLog({
        textShareId: textShare.id,
        ipAddress: ipAddress || 'unknown',
        userAgent: request.headers.get('user-agent') || undefined,
    }).catch(console.error);

    // Increment view count
    await incrementViewCount(shortKey);

    // Return without sensitive data
    const { passwordHash, ...safeData } = textShare;
    return sendResponse(
        httpStatus.OK,
        TEXT_SHARE?.FETCH_SUCCESS || 'Text share fetched successfully',
        {
            ...safeData,
            requiresPassword: !!passwordHash,
        }
    );
};

const handleUpdateTextShare = async (
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
            TEXT_SHARE?.UNAUTHORIZED || 'Only the owner can update this share'
        );
    }

    const requestBody = await request.json();
    const { title, content, format, syntaxLanguage, isPublic } = requestBody;

    const updated = await updateTextShare(
        { shortKey },
        {
            ...(title !== undefined && { title }),
            ...(content !== undefined && { content }),
            ...(format !== undefined && { format }),
            ...(syntaxLanguage !== undefined && { syntaxLanguage }),
            ...(isPublic !== undefined && { isPublic }),
        }
    );

    const { passwordHash, ...safeData } = updated;
    return sendResponse(
        httpStatus.OK,
        TEXT_SHARE?.UPDATE_SUCCESS || 'Text share updated successfully',
        safeData
    );
};

const handleDeleteTextShare = async (
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
            TEXT_SHARE?.UNAUTHORIZED || 'Only the owner can delete this share'
        );
    }

    await deleteTextShare(shortKey);

    return sendResponse(
        httpStatus.OK,
        TEXT_SHARE?.DELETION_SUCCESS || 'Text share deleted successfully'
    );
};

export const GET = asyncError(handleGetTextShare);
export const PUT = asyncError(handleUpdateTextShare);
export const DELETE = asyncError(handleDeleteTextShare);
