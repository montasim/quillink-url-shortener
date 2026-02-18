import { NextRequest } from 'next/server';
import httpStatus from 'http-status-lite';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import { isCustomSlugAvailable } from '@/services/text-share.service';

const { TEXT_SHARE } = MESSAGES;

const checkSlug = async (slug: string | null) => {
    // Validate slug exists
    if (!slug || typeof slug !== 'string') {
        return {
            status: httpStatus.BAD_REQUEST,
            message: TEXT_SHARE?.VALIDATION_ERROR || 'Slug is required',
            data: { available: false }
        };
    }

    // Validate slug format (alphanumeric, hyphens, underscores, max 50 chars)
    const slugRegex = /^[a-zA-Z0-9-_]+$/;
    if (!slugRegex.test(slug)) {
        return {
            status: httpStatus.BAD_REQUEST,
            message: 'Slug must contain only alphanumeric characters, hyphens, and underscores',
            data: { available: false }
        };
    }

    if (slug.length > 50) {
        return {
            status: httpStatus.BAD_REQUEST,
            message: 'Slug must be less than 50 characters',
            data: { available: false }
        };
    }

    // Check availability
    const available = await isCustomSlugAvailable(slug);

    if (available) {
        return {
            status: httpStatus.OK,
            message: TEXT_SHARE?.SLUG_AVAILABLE || 'This custom link is available',
            data: { available: true, slug }
        };
    } else {
        return {
            status: httpStatus.CONFLICT,
            message: TEXT_SHARE?.SLUG_TAKEN || 'This custom link is already taken',
            data: { available: false, slug }
        };
    }
};

const handleCheckSlugPOST = async (request: NextRequest) => {
    const { slug } = await request.json();
    const result = await checkSlug(slug);
    return sendResponse(result.status, result.message, result.data);
};

const handleCheckSlugGET = async (request: NextRequest) => {
    const slug = request.nextUrl.searchParams.get('slug');
    const result = await checkSlug(slug);
    return sendResponse(result.status, result.message, result.data);
};

export const POST = asyncError(handleCheckSlugPOST);
export const GET = asyncError(handleCheckSlugGET);
