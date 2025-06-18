const COOKIES = Object.freeze({
    NAME: Object.freeze({
        ACCESS_TOKEN: 'accessToken',
        REFRESH_TOKEN: 'refreshToken',
    }),

    TYPE: Object.freeze({
        ACCESS: 'access',
        REFRESH: 'refresh',
    }),
} as const);

export default COOKIES;
