import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import contentTypesLite from 'content-types-lite';

// Assume this exists and handles storing/retrieving tokens
// For demonstration, we'll use a placeholder.
// In a real app, this might interact with localStorage or actual cookies
// on the client side, or be managed by Next.js server-side cookies.
let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
    config: InternalAxiosRequestConfig;
}[] = [];

// Helper to process the queue of failed requests
const processQueue = (
    error: AxiosError | null,
    token: string | null = null
) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.config.headers = prom.config.headers || {};
            prom.config.headers['Authorization'] = `Bearer ${token}`; // Assuming your API uses Authorization header
            prom.resolve(axiosInstance(prom.config)); // Retry the original request with new token
        }
    });
    failedQueue = [];
};

const axiosInstance = axios.create({
    baseURL: '', // Your base API URL (e.g., 'https://api.yourdomain.com')
    timeout: 15000,
    headers: {
        'Content-Type': contentTypesLite.JSON,
    },
    withCredentials: true, // Essential for sending cookies
});

// --- Request Interceptor ---
axiosInstance.interceptors.request.use(
    (config) => {
        // You might set other headers here, e.g., an Authorization header
        // if your system uses it in addition to cookies.
        // For cookie-based auth, 'withCredentials: true' is often enough.
        // config.headers['Token'] = ''; // Review if this empty 'Token' header is necessary or intended.
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Response Interceptor ---
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // Check if the error is a 401 and it's not the refresh token request itself
        if (
            error.response?.status === 401 &&
            originalRequest &&
            originalRequest.url !== '/api/v1/auth/refresh'
        ) {
            if (isRefreshing) {
                // If a refresh is already in progress, queue the original request
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
                // Attempt to refresh the token
                const refreshResponse = await axiosInstance.get(
                    '/api/v1/auth/refresh'
                );
                // Assuming your refresh endpoint sets new cookies and maybe returns user types
                // If your refresh endpoint returns new access token in the response body,
                // you'd extract it here: const newAccessToken = refreshResponse.types.accessToken;

                isRefreshing = false;
                processQueue(null, 'new-token-from-refresh-if-applicable'); // Pass a placeholder or actual new token

                // Retry the original request with the (now hopefully valid) cookies
                // It's important to use axiosInstance directly for the retry
                return axiosInstance(originalRequest);
            } catch (refreshError: any) {
                isRefreshing = false;
                processQueue(refreshError); // Reject all queued requests
                // If refresh also fails, or if it's genuinely unauthorized,
                // you might want to redirect to login or handle it globally.
                console.error(
                    'Token refresh failed, redirecting to login or handling globally.'
                );
                // Example: client-side redirect to login page
                // window.location.href = '/login';
                return Promise.reject(refreshError); // Propagate the refresh error
            }
        }

        return Promise.reject(error); // For any other errors, just re-throw
    }
);

// --- Proactive Token Refresh ---
const REFRESH_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

let refreshTimer: NodeJS.Timeout | null = null;

const startProactiveRefresh = () => {
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
                // Handle proactive refresh failure (e.g., user is genuinely logged out, clear session)
                // If refresh fails proactively, it suggests the refresh token is also invalid.
                // You might want to clear user session and prompt re-login.
            }
        }
    }, REFRESH_INTERVAL_MS);
};

// You should call startProactiveRefresh() when your application initializes and the user is authenticated.
// For example, after a successful login or on app load if a session already exists.
// startProactiveRefresh(); // Call this when you want the timer to start

// --- Exported API Functions (remain largely the same) ---
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
        ...(isArray && { Hello: 'Hello' }), // Review if 'Hello' header is truly needed
    };
    const requestData = isArray ? data : JSON.stringify(data);
    const res = await axiosInstance.put(endpoint, requestData, { headers });
    return res.data;
};

export const deleteData = async (endpoint: string) => {
    const res = await axiosInstance.delete(endpoint);
    return res.data;
};

// Optionally, export the start/stop functions for refresh management
export { startProactiveRefresh };
