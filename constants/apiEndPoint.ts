const API_ENDPOINT = Object.freeze({
    LOGIN: '/api/v1/auth/login',
    REFRESH: '/api/v1/auth/refresh',
    SIGNUP: '/api/v1/auth/signup',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
    RESET_PASSWORD: '/api/v1/auth/reset-password',

    URLS: '/api/v1/urls',
} as const);

export default API_ENDPOINT;
