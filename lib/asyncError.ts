import httpStatusLite from 'http-status-lite';
import { NextRequest, NextResponse } from 'next/server';
import sendResponse from '@/utils/sendResponse';

type Handler<T = any> = (
    req: NextRequest,
    context: T
) => Promise<NextResponse | Response>;

const asyncError = <T = any>(handler: Handler<T>) => {
    return async function (
        req: NextRequest,
        context: T
    ): Promise<NextResponse | Response> {
        try {
            return await handler(req, context);
        } catch (err) {
            console.error('Unhandled error:', err);
            return sendResponse(
                httpStatusLite.INTERNAL_SERVER_ERROR,
                'Internal Server Error'
            );
        }
    };
};

export default asyncError;
