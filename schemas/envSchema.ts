import { z } from 'zod';
import { nonEmptyString } from '@/schemas/schemas';
import ENVIRONMENTS from '@/constants/environments';

const envSchema = z.object({
    // App
    NEXT_PUBLIC_BASE_URL: nonEmptyString('NEXT_PUBLIC_BASE_URL').url(),

    // Node Environment
    NODE_ENV: z.enum([
        ENVIRONMENTS.DEVELOPMENT,
        ENVIRONMENTS.STAGING,
        ENVIRONMENTS.PRODUCTION,
    ]),

    // API
    API_CALL_TIMEOUT_S: nonEmptyString('API_CALL_TIMEOUT_S')
        .transform((v) => parseInt(v, 10))
        .pipe(z.number().int().positive()),

    // JWT
    JWT_ACCESS_TOKEN_SECRET: nonEmptyString('JWT_ACCESS_TOKEN_SECRET'),
    JWT_ACCESS_TOKEN_EXPIRATION_IN_MINUTES: nonEmptyString(
        'JWT_ACCESS_TOKEN_EXPIRATION_IN_MINUTES'
    )
        .transform((v) => parseInt(v, 10))
        .pipe(z.number().int().positive()),
    NEXT_PUBLIC_JWT_REFRESH_INTERVAL_MS: nonEmptyString(
        'NEXT_PUBLIC_JWT_REFRESH_INTERVAL_MS'
    )
        .transform((v) => parseInt(v, 10))
        .pipe(z.number().int().positive()),
    JWT_REFRESH_TOKEN_SECRET: nonEmptyString('JWT_REFRESH_TOKEN_SECRET'),
    JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTES: nonEmptyString(
        'JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTES'
    )
        .transform((v) => parseInt(v, 10))
        .pipe(z.number().int().positive()),

    // Forget Password
    FORGET_PASSWORD_EXPIRES_MS: nonEmptyString('FORGET_PASSWORD_EXPIRES_MS')
        .transform((v) => parseInt(v, 10))
        .pipe(z.number().int().positive()),

    // Cookies
    COOKIE_SECURE: nonEmptyString('COOKIE_SECURE').transform(
        (v) => v === 'true'
    ), // Assuming boolean interpretation
    COOKIE_SAME_SITE: nonEmptyString('COOKIE_SAME_SITE').pipe(
        z.enum(['lax', 'strict', 'none'])
    ), // Common SameSite values
    COOKIE_HTTP_ONLY: nonEmptyString('COOKIE_HTTP_ONLY').transform(
        (v) => v === 'true'
    ), // Assuming boolean interpretation
    COOKIE_MAX_AGE_IN_SECONDS: nonEmptyString('COOKIE_MAX_AGE_IN_SECONDS')
        .transform((v) => parseInt(v, 10))
        .pipe(z.number().int().positive()),
    COOKIE_USER_TOKEN_NAME: nonEmptyString('COOKIE_USER_TOKEN_NAME'),

    // Google OAuth2
    GOOGLE_OAUTH_GOOGLE_CLIENT_ID: nonEmptyString(
        'GOOGLE_OAUTH_GOOGLE_CLIENT_ID'
    ),
    GOOGLE_OAUTH_GOOGLE_CLIENT_SECRET: nonEmptyString(
        'GOOGLE_OAUTH_GOOGLE_CLIENT_SECRET'
    ),
    GOOGLE_OAUTH_GOOGLE_REDIRECT_URI: nonEmptyString(
        'GOOGLE_OAUTH_GOOGLE_REDIRECT_URI'
    ).url(),
    GOOGLE_OAUTH_TOKEN_URL: nonEmptyString('GOOGLE_OAUTH_TOKEN_URL').url(),
    GOOGLE_OAUTH_USERINFO_URL: nonEmptyString(
        'GOOGLE_OAUTH_USERINFO_URL'
    ).url(),

    // Mailer
    MAILER_SERVICE: nonEmptyString('MAILER_SERVICE'),
    MAILER_USER: nonEmptyString('MAILER_USER').email(),
    MAILER_PASS: nonEmptyString('MAILER_PASS'),
});

export type TEnvSchema = z.infer<typeof envSchema>;

export default envSchema;
