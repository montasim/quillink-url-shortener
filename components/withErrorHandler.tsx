import { handleError } from '@/components/handleError';

// Higher-order function for safe async usage
export const withErrorHandler = <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    fallbackMessage?: string
) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
        try {
            return await fn(...args);
        } catch (error) {
            return handleError(error, fallbackMessage);
        }
    };
};
