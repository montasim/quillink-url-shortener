import dataService from '@/lib/dataService';

const { userModel } = dataService;

export const createUser = async (data: {}, dataSelection?: {}) => {
    return await userModel.create({
        data: data,
        select: dataSelection,
    });
};

export const getUserDetails = async (
    filterConditions: {},
    dataSelection?: {}
) => {
    return await userModel.findUnique({
        where: filterConditions,
        select: dataSelection,
    });
};

export const updateUser = async (filterConditions: {}, updateData: {}) => {
    return await userModel.update({
        where: filterConditions,
        data: updateData,
    });
};
