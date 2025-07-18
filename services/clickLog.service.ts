import dataService from '@/lib/dataService';

const { clickLogModel } = dataService;

export const createClickLog = async (createData: {}, dataSelection?: {}) => {
    return await clickLogModel.create({
        data: createData,
        select: dataSelection,
    });
};
