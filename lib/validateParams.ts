import { ZodSchema } from 'zod';
import sendResponse from '@/utils/sendResponse';
import httpStatusLite from 'http-status-lite';
import MESSAGES from '@/constants/messages';

const validateParams = <T>(
    schema: ZodSchema<T>,
    params: { shortKey: string }
): { success: true; data: T } | { success: false; response: Response } => {
    const result = schema.safeParse(params);
    if (!result.success) {
        const message =
            result.error.issues[0]?.message || MESSAGES.COMMON.VALIDATION_ERROR;
        return {
            success: false,
            response: sendResponse(httpStatusLite.BAD_REQUEST, message),
        };
    }
    return { success: true, data: result.data };
};

export default validateParams;
