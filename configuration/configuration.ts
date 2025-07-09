import { z } from 'zod';
import envSchema, { TEnvSchema } from '@/schemas/envSchema';
import MESSAGES from '@/constants/messages';

const {
    ENV_DATA_VALIDATION_ERROR_SEPARATOR,
    ENV_DATA_VALIDATION_ERROR,
    INVALID_ENV_CONFIGURATION,
    UNEXPECTED_ENV_VALIDATION_ERROR,
} = MESSAGES.SYSTEM;
const RAW_ENV = process.env;

let parsedEnv: TEnvSchema;

try {
    parsedEnv = envSchema.parse(RAW_ENV);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.error(ENV_DATA_VALIDATION_ERROR_SEPARATOR);
        console.error(ENV_DATA_VALIDATION_ERROR);
        console.error(ENV_DATA_VALIDATION_ERROR_SEPARATOR);

        const fieldErrors = error.flatten().fieldErrors;
        for (const key in fieldErrors) {
            if (Object.prototype.hasOwnProperty.call(fieldErrors, key)) {
                const errors = fieldErrors[key];

                // Ensure that key is treated as a string for console.error
                console.error(`- ${key}: ${errors?.join(', ')}`);
            }
        }

        console.error(ENV_DATA_VALIDATION_ERROR_SEPARATOR);
        throw new Error(INVALID_ENV_CONFIGURATION);
    } else {
        console.error(UNEXPECTED_ENV_VALIDATION_ERROR, error);
        throw new Error(UNEXPECTED_ENV_VALIDATION_ERROR);
    }
}

const configuration = {
    app: {
        name: 'QuilLink',
        baseUrl: parsedEnv.NEXT_PUBLIC_BASE_URL,
    },

    nodeEnv: parsedEnv.NODE_ENV,

    api: {
        timeout: parsedEnv.API_CALL_TIMEOUT_S,
    },

    jwt: {
        accessToken: {
            secret: parsedEnv.JWT_ACCESS_TOKEN_SECRET,
            expiration: parsedEnv.JWT_ACCESS_TOKEN_EXPIRATION_IN_MINUTES,
        },

        refreshToken: {
            apiInterval: parsedEnv.NEXT_PUBLIC_JWT_REFRESH_INTERVAL_MS,
            secret: parsedEnv.JWT_REFRESH_TOKEN_SECRET,
            expiration: parsedEnv.JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTES,
        },
    },

    forgetPassword: {
        expires: parsedEnv.FORGET_PASSWORD_EXPIRES_MS,
    },

    cookies: {
        secure: parsedEnv.COOKIE_SECURE,
        sameSite: parsedEnv.COOKIE_SAME_SITE,
        httpOnly: parsedEnv.COOKIE_HTTP_ONLY,
        maxAge: parsedEnv.COOKIE_MAX_AGE_IN_SECONDS,
        userTokenName: parsedEnv.COOKIE_USER_TOKEN_NAME,
    },

    googleOauth2: {
        clientId: parsedEnv.GOOGLE_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: parsedEnv.GOOGLE_OAUTH_GOOGLE_CLIENT_SECRET,
        redirectUri: parsedEnv.GOOGLE_OAUTH_GOOGLE_REDIRECT_URI,
        tokenUrl: parsedEnv.GOOGLE_OAUTH_TOKEN_URL,
        userInfoUrl: parsedEnv.GOOGLE_OAUTH_USERINFO_URL,
    },

    mailer: {
        service: parsedEnv.MAILER_SERVICE,
        auth: {
            user: parsedEnv.MAILER_USER,
            pass: parsedEnv.MAILER_PASS,
        },
    },
};

export default configuration;
