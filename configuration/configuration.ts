const configuration = {
    app: {
        name: 'Shrnkly',
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
    },

    nodeEnv: process.env.NODE_ENV || '',

    api: {
        timeout: parseInt(process.env.API_CALL_TIMEOUT_S || '0', 10),
    },

    jwt: {
        accessToken: {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET || '',
            expiration: parseInt(
                process.env.JWT_ACCESS_TOKEN_EXPIRATION_IN_MINUTES || '0',
                10
            ),
        },

        refreshToken: {
            apiInterval: parseInt(
                process.env.NEXT_PUBLIC_JWT_REFRESH_INTERVAL_MS || '0',
                10
            ),
            secret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
            expiration: parseInt(
                process.env.JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTES || '0',
                10
            ),
        },
    },

    forgetPassword: {
        expires: parseInt(process.env.FORGET_PASSWORD_EXPIRES_MS || '0', 10),
    },

    cookies: {
        secure: process.env.COOKIE_SECURE || '',
        sameSite: process.env.COOKIE_SAME_SITE || '',
        httpOnly: process.env.COOKIE_HTTP_ONLY || '',
        maxAge: parseInt(process.env.COOKIE_MAX_AGE_IN_SECONDS || '0', 10),
        userTokenName: process.env.COOKIE_USER_TOKEN_NAME || '',
    },

    googleOauth2: {
        clientId: process.env.GOOGLE_OAUTH_GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_OAUTH_GOOGLE_CLIENT_SECRET || '',
        redirectUri: process.env.GOOGLE_OAUTH_GOOGLE_REDIRECT_URI || '',
        tokenUrl: process.env.GOOGLE_OAUTH_TOKEN_URL || '',
        userInfoUrl: process.env.GOOGLE_OAUTH_USERINFO_URL || '',
    },

    mailer: {
        service: process.env.MAILER_SERVICE || '',
        auth: {
            user: process.env.MAILER_USER || '',
            pass: process.env.MAILER_PASS || '',
        },
    },

    textShare: {
        maxContentLengthKb: parseInt(
            process.env.TEXT_SHARE_MAX_CONTENT_LENGTH_KB || '100',
            10
        ),
        defaultExpiryDays: parseInt(
            process.env.TEXT_SHARE_DEFAULT_EXPIRY_DAYS || '30',
            10
        ),
        cleanupCron: process.env.TEXT_SHARE_CLEANUP_CRON || '0 2 * * *',
    },
};

export default configuration;
