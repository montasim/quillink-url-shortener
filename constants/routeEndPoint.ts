const ROUTE_ENDPOINT = Object.freeze({
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    DASHBOARD_URLS: '/dashboard/urls',
} as const);

export default ROUTE_ENDPOINT;
