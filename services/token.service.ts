import dataService from '@/lib/dataService';

const { tokenModel } = dataService;

export const createToken = async (createData: {}, dataSelection?: {}) => {
    return await tokenModel.create({
        data: createData,
        select: dataSelection,
    });
};

export const getTokenDetails = async (
    filterConditions: {},
    includeConditions: {},
    dataSelection?: {}
) => {
    return await tokenModel.findUnique({
        where: filterConditions,
        include: includeConditions,
        select: dataSelection,
    });
};

export const deleteToken = async (filterConditions: {}) => {
    return await tokenModel.deleteData({
        where: filterConditions,
    });
};
