import getEnvironmentData from '@/utils/getEnvironmentData';

const configuration = {
    app: {
        name: 'QuilLink',
        baseUrl: getEnvironmentData('NEXT_PUBLIC_BASE_URL'),
    },

    nodeEnv: getEnvironmentData('NODE_ENV'),

    api: {
        timeout: parseInt(getEnvironmentData('API_CALL_TIMEOUT_S')),
    },

    jwt: {
        accessToken: {
            secret: getEnvironmentData('JWT_ACCESS_TOKEN_SECRET'),
            expiration: parseInt(
                getEnvironmentData('JWT_ACCESS_TOKEN_EXPIRATION_IN_MINUTES')
            ),
        },
        refreshToken: {
            apiInterval: parseInt(
                getEnvironmentData('JWT_REFRESH_INTERVAL_MS')
            ),
            secret: getEnvironmentData('JWT_REFRESH_TOKEN_SECRET'),
            expiration: parseInt(
                getEnvironmentData('JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTES')
            ),
        },
    },

    forgetPassword: {
        expires: parseInt(getEnvironmentData('FORGET_PASSWORD_EXPIRES_MS')),
    },

    cookies: {
        secure: getEnvironmentData('COOKIE_SECURE'),
        sameSite: getEnvironmentData('COOKIE_SAME_SITE'),
        httpOnly: getEnvironmentData('COOKIE_HTTP_ONLY'),
        maxAge: parseInt(getEnvironmentData('COOKIE_MAX_AGE_IN_SECONDS'), 10),
        userTokenName: getEnvironmentData('COOKIE_USER_TOKEN_NAME'),
    },

    googleOauth2: {
        clientId: getEnvironmentData('GOOGLE_OAUTH_GOOGLE_CLIENT_ID'),
        clientSecret: getEnvironmentData('GOOGLE_OAUTH_GOOGLE_CLIENT_SECRET'),
        redirectUri: getEnvironmentData('GOOGLE_OAUTH_GOOGLE_REDIRECT_URI'),
        tokenUrl: getEnvironmentData('GOOGLE_OAUTH_TOKEN_URL'),
        userInfoUrl: getEnvironmentData('GOOGLE_OAUTH_USERINFO_URL'),
    },

    mailer: {
        service: getEnvironmentData('MAILER_SERVICE'),
        auth: {
            user: getEnvironmentData('MAILER_USER'),
            pass: getEnvironmentData('MAILER_PASS'),
        },
    },
};

export default configuration;
