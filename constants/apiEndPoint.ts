const API_ENDPOINT = Object.freeze({
    LOGIN: '/api/v1/auth/login',
    REFRESH: '/api/v1/auth/refresh',
    SIGNUP: '/api/v1/auth/signup',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
    RESET_PASSWORD: '/api/v1/auth/reset-password',

    URLS: '/api/v1/urls',

    // Text Share
    TEXT_SHARE_CREATE: '/api/v1/text',
    TEXT_SHARE_LIST: '/api/v1/texts',
    TEXT_SHARE_GET: (shortKey: string) => `/api/v1/text/${shortKey}`,
    TEXT_SHARE_UPDATE: (shortKey: string) => `/api/v1/text/${shortKey}`,
    TEXT_SHARE_DELETE: (shortKey: string) => `/api/v1/text/${shortKey}`,
    TEXT_SHARE_VERIFY_PASSWORD: (shortKey: string) =>
        `/api/v1/text/${shortKey}/verify-password`,
    TEXT_SHARE_STATS: (shortKey: string) => `/api/v1/text/${shortKey}/stats`,
} as const);

export default API_ENDPOINT;
