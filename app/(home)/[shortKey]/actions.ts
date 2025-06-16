import { getDataById } from '@/lib/axios';

export const getUrlData = async (shortKey: string) => {
    return await getDataById('/api/v1/redirect/', shortKey);
};
