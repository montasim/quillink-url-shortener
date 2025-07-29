const API_ENDPOINT = Object.freeze({
    LOGIN: '/api/v1/auth/login',
    SIGNUP: '/api/v1/auth/signup',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
    DASHBOARD_URLS: '/dashboard/urls',
} as const);

export default API_ENDPOINT;
