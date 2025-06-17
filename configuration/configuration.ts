import getEnvironmentData from '@/utils/getEnvironmentData';

const configuration = {
    name: 'QuilLink',

    jwt: {
        accessToken: {
            secret: getEnvironmentData('JWT_ACCESS_TOKEN_SECRET'),
            expiration: parseInt(
                getEnvironmentData('JWT_ACCESS_TOKEN_EXPIRATION_IN_MINUTES')
            ),
        },
        refreshToken: {
            secret: getEnvironmentData('JWT_REFRESH_TOKEN_SECRET'),
            expiration: parseInt(
                getEnvironmentData('JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTES')
            ),
        },
    },

    cookies: {
        secure: getEnvironmentData('COOKIE_SECURE'),
        sameSite: getEnvironmentData('COOKIE_SAME_SITE'),
        httpOnly: getEnvironmentData('COOKIE_HTTP_ONLY'),
        maxAge: parseInt(getEnvironmentData('COOKIE_MAX_AGE_IN_SECONDS'), 10),
        userTokenName: getEnvironmentData('COOKIE_USER_TOKEN_NAME'),
    },

    googleOauth2: {
        clientId: getEnvironmentData('GOOGLE_CLIENT_ID'),
        clientSecret: getEnvironmentData('GOOGLE_CLIENT_SECRET'),
        redirectUri: getEnvironmentData('GOOGLE_REDIRECT_URI'),
    }
};

export default configuration;
