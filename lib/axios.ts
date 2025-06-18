import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import contentTypesLite from 'content-types-lite';
import configuration from '@/configuration/configuration';
import httpStatusLite from 'http-status-lite';

let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
    config: InternalAxiosRequestConfig;
}[] = [];

const processQueue = (
    error: AxiosError | null,
    token: string | null = null
) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.config.headers = prom.config.headers || {};
            prom.config.headers['Authorization'] = `Bearer ${token}`;
            prom.resolve(axiosInstance(prom.config));
        }
    });
    failedQueue = [];
};

const axiosInstance = axios.create({
    baseURL: '',
    timeout: configuration.api.timeout,
    headers: {
        'Content-Type': contentTypesLite.JSON,
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (
            error.response?.status === httpStatusLite.UNAUTHORIZED &&
            originalRequest &&
            originalRequest.url !== '/api/v1/auth/refresh'
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject,
                        config: originalRequest,
                    });
                });
            }

            isRefreshing = true;

            try {
                const refreshResponse = await axiosInstance.get(
                    '/api/v1/auth/refresh'
                );

                isRefreshing = false;
                processQueue(null, 'new-token-from-refresh-if-applicable');

                return axiosInstance(originalRequest);
            } catch (refreshError: any) {
                isRefreshing = false;
                processQueue(refreshError);

                console.error(
                    'Token refresh failed, redirecting to login or handling globally.'
                );

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

let refreshTimer: NodeJS.Timeout | null = null;

export const startProactiveRefresh = () => {
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }
    refreshTimer = setInterval(async () => {
        if (!isRefreshing) {
            // Only attempt if no refresh is already in progress
            console.log('Attempting proactive token refresh...');
            try {
                // Perform a silent refresh
                await axiosInstance.get('/api/v1/auth/refresh');
                console.log('Proactive token refresh successful.');
            } catch (error) {
                console.error('Proactive token refresh failed:', error);
            }
        }
    }, configuration.jwt.refreshToken.apiInterval);
};

export const getData = async (endpoint: string) => {
    const res = await axiosInstance.get(endpoint);
    return res.data;
};

export const getDataById = async (endpoint: string, id: string) => {
    const res = await axiosInstance.get(`${endpoint}${id}`);
    return res.data;
};

export const createData = async (endpoint: string, data: any) => {
    const requestData = data instanceof FormData ? data : JSON.stringify(data);
    const res = await axiosInstance.post(endpoint, requestData);
    return res.data;
};

export const updateData = async (endpoint: string, data: any) => {
    const isArray = Array.isArray(data);
    const headers = {
        'Content-Type': contentTypesLite.JSON,
    };
    const requestData = isArray ? data : JSON.stringify(data);
    const res = await axiosInstance.put(endpoint, requestData, { headers });
    return res.data;
};

export const deleteData = async (endpoint: string) => {
    const res = await axiosInstance.delete(endpoint);
    return res.data;
};
