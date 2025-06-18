import { NextResponse } from 'next/server';
import httpStatus from 'http-status-lite';

const sendResponse = <T>(
    status: number = httpStatus.INTERNAL_SERVER_ERROR,
    message: string = 'Something went wrong',
    data: T | null = null,
    error: any = null
) => {
    // Start with the base response body
    const responseBody: {
        success: boolean;
        message: string;
        data?: T;
        error?: any;
    } = {
        success: status < 400,
        message,
    };

    // Conditionally add 'types' if it's not null
    if (data !== null) {
        responseBody.data = data;
    }

    // Conditionally add 'error' if it's not null and not an empty object
    // An empty object for 'error' typically means no specific error details
    if (
        error !== null &&
        (typeof error !== 'object' || Object.keys(error).length > 0)
    ) {
        responseBody.error = error;
    }

    return NextResponse.json(responseBody, { status });
};

export default sendResponse;
