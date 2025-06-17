import { NextRequest } from 'next/server';
import httpStatusLite from 'http-status-lite';
import { nanoid } from 'nanoid';
import { addMonths } from 'date-fns';
import asyncError from '@/lib/asyncError';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import { ShortenUrlSchema } from '@/schemas/schemas';
import { selection } from '@/app/data/selection';

const { ALL_URLS_LISTING_MESSAGES, URL_CREATION_MESSAGES } = MESSAGES;
const { shortUrlModel } = dataService;

const createShortUrl = async (request: NextRequest) => {
    // Renamed from handlePost
    const requestBody = await request.json();

    const schemaValidationResult = ShortenUrlSchema.safeParse(requestBody); // Renamed from parseResult
    if (!schemaValidationResult.success) {
        return sendResponse(
            httpStatusLite.BAD_REQUEST,
            URL_CREATION_MESSAGES.VALIDATION_ERROR,
            {},
            schemaValidationResult.error.flatten()
        );
    }

    const { originalUrl } = schemaValidationResult.data;

    // Check if the original URL has already been shortened
    const existingShortUrlRecord = await shortUrlModel.findFirst({
        where: { originalUrl },
    });
    if (existingShortUrlRecord) {
        return sendResponse(
            httpStatusLite.OK,
            URL_CREATION_MESSAGES.URL_ALREADY_EXISTS,
            existingShortUrlRecord
        );
    }

    // Generate a unique short key and set an expiration date
    const generatedShortKey = nanoid(7);
    const expirationDate = addMonths(new Date(), 6);

    // Create a new entry in the database
    const createdShortUrlRecord = await shortUrlModel.create({
        data: {
            originalUrl,
            shortKey: generatedShortKey,
            expiresAt: expirationDate,
        },
        select: selection, // includes fields like clickLogs
    });

    // Return a success response with the newly created short URL
    return sendResponse(
        httpStatusLite.CREATED,
        URL_CREATION_MESSAGES.URL_CREATED_SUCCESS,
        createdShortUrlRecord
    );
};

const retrieveFilteredShortUrls = async (request: NextRequest) => {
    // Renamed from handleGetUrls
    const urlQueryParameters = request.nextUrl.searchParams;

    const shortKeyParam = urlQueryParameters.get('shortKey');
    const originalUrlParam = urlQueryParameters.get('originalUrl');
    const expiredParam = urlQueryParameters.get('expired');

    const filterConditions: any = {};

    // Apply filter for shortKey if provided
    if (shortKeyParam) {
        filterConditions.shortKey = {
            contains: shortKeyParam,
            mode: 'insensitive',
        };
    }

    // Apply filter for originalUrl if provided
    if (originalUrlParam) {
        filterConditions.originalUrl = {
            contains: originalUrlParam,
            mode: 'insensitive',
        };
    }

    // Apply filter for expiration status
    if (expiredParam === 'true') {
        filterConditions.expiresAt = { lt: new Date() };
    } else if (expiredParam === 'false') {
        // URLs that have not expired or have no expiration set
        filterConditions.OR = [
            { expiresAt: null },
            { expiresAt: { gte: new Date() } },
        ];
    }

    // Fetch short URL records from the database based on filter conditions
    const shortUrlRecords = await shortUrlModel.findMany({
        where: filterConditions,
        select: selection,
        orderBy: { createdAt: 'desc' },
    });

    // If no URLs are found after applying filters, return a 404 response
    if (!shortUrlRecords.length) {
        return sendResponse(
            httpStatusLite.NOT_FOUND,
            ALL_URLS_LISTING_MESSAGES.NOT_FOUND
        );
    }

    // Return a success response with the fetched URL records
    return sendResponse(
        httpStatusLite.OK,
        ALL_URLS_LISTING_MESSAGES.SUCCESSFUL,
        shortUrlRecords
    );
};

export const GET = asyncError(retrieveFilteredShortUrls);
export const POST = asyncError(createShortUrl);
