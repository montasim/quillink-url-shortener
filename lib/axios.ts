import { withErrorHandler } from '@/components/withErrorHandler';
import axios from 'axios';
import contentTypesLite from 'content-types-lite';

const axiosInstance = axios.create({
    baseURL: '',
    timeout: 15000,
    headers: {
        'Content-Type': contentTypesLite.JSON,
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers['Token'] = '';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const _getData = async (endpoint: string) => {
    const res = await axiosInstance.get(endpoint);
    return res.data;
};

const _getDataById = async (endpoint: string, id: string) => {
    const res = await axiosInstance.get(`${endpoint}${id}`);
    return res.data;
};

const _createData = async (endpoint: string, data: any) => {
    const requestData = data instanceof FormData ? data : JSON.stringify(data);
    const res = await axiosInstance.post(endpoint, requestData);
    return res.data;
};

const _updateData = async (endpoint: string, data: any) => {
    const isArray = Array.isArray(data);
    const headers = {
        'Content-Type': 'application/json',
        ...(isArray && { Hello: 'Hello' }),
    };
    const requestData = isArray ? data : JSON.stringify(data);
    const res = await axiosInstance.put(endpoint, requestData, { headers });
    return res.data;
};

const _deleteData = async (endpoint: string) => {
    const res = await axiosInstance.delete(endpoint);
    return res.data;
};

// Export wrapped versions
export const getData = withErrorHandler(_getData);
export const getDataById = withErrorHandler(_getDataById);
export const createData = withErrorHandler(_createData);
export const updateData = withErrorHandler(_updateData);
export const deleteData = withErrorHandler(_deleteData);
