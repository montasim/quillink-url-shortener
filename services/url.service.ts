import dataService from '@/lib/dataService';
import { getData } from '@/lib/axios';
import { toast } from 'sonner';
import MESSAGES from '@/constants/messages';

const { shortUrlModel } = dataService;

export const deleteShortUrl = async (filterConditions?: {}) => {
    // Delete the short URL record from the database
    return await shortUrlModel.deleteData({
        where: filterConditions,
    });
};

export const createShortUrl = async (data: {
    originalUrl: string;
    shortKey: string;
    expiresAt?: Date | null;
    passwordHash?: string | null;
    customSlug?: string | null;
    guestId?: string | null;
    userId?: string | null;
}, dataSelection?: {}) => {
    // Create the short URL record
    return await shortUrlModel.create({
        data: {
            originalUrl: data.originalUrl,
            shortKey: data.shortKey,
            clicks: 0,
            expiresAt: data.expiresAt,
            passwordHash: data.passwordHash,
            customSlug: data.customSlug,
            ...(data.guestId ? { guestId: data.guestId } : {}),
            ...(data.userId ? { userId: data.userId } : {}),
        },
        select: dataSelection,
    });
};

export const getShortUrlDetails = async (
    filterConditions: {},
    dataSelection?: {}
) => {
    // Find the short URL record, including its click logs
    return await shortUrlModel.findUnique({
        where: filterConditions,
        select: dataSelection,
    });
};

export const getExistingShortUrl = async (
    filterConditions: {},
    dataSelection?: {}
) => {
    // Find the short URL record, including its click logs
    return await shortUrlModel.findFirst({
        where: filterConditions,
        select: dataSelection,
    });
};

export const getShortUrlList = async (
    filterConditions: {},
    dataSelection?: {}
) => {
    return await shortUrlModel.findMany({
        where: filterConditions,
        select: dataSelection,
        orderBy: { createdAt: 'desc' },
    });
};

export const updateShortUrl = async (filterConditions: {}, updateData: {}) => {
    return await shortUrlModel.update({
        where: filterConditions,
        data: updateData,
    });
};

interface FetchActionParams {
    apiEndpoint: string;
    setLoading: (val: boolean) => void;
    setData: any;
    successMessage?: string;
    errorMessage?: string;
    t?: (key: string) => string;
}

export const handleFetchAction = async ({
    apiEndpoint,
    setLoading,
    setData,
    successMessage,
    errorMessage,
    t,
}: FetchActionParams) => {
    setLoading(true);

    try {
        const { success, message, data } = await getData(apiEndpoint);

        if (success) {
            toast.success(successMessage || message || (t ? t('common.successMessage') : message));
            setData(data);
        } else {
            toast.error(errorMessage || message || (t ? t('common.errorMessage') : message));
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            toast.error(error.response.data.message);
        } else {
            toast.error(errorMessage || (t ? t('common.unexpectedError') : MESSAGES.COMMON.UNEXPECTED_ERROR));
        }
    } finally {
        setLoading(false);
    }
};
