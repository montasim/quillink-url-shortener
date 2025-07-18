import dataService from '@/lib/dataService';

const { shortUrlModel } = dataService;

export const deleteShortUrl = async (filterConditions?: {}) => {
    // Delete the short URL record from the database
    return await shortUrlModel.deleteData({
        where: filterConditions,
    });
};

export const createShortUrl = async (data: {}, dataSelection?: {}) => {
    // Create the short URL record
    return await shortUrlModel.create({
        data: data,
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
