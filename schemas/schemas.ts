import { z } from 'zod';
import MESSAGES from '@/constants/messages';
import REGEX_PATTERNS from '@/constants/regexPatterns';
import configuration from '@/configuration/configuration';

const {
    SHORT_KEY_REGEX,
    EMAIL_REGEX,
    UPPERCASE_REGEX,
    LOWERCASE_REGEX,
    NUMBER_REGEX,
    SPECIAL_CHARACTER_REGEX,
} = REGEX_PATTERNS;

export const nonEmptyString = (fieldName: string) =>
    z.string().nonempty(`${fieldName} is required`);
const validEmail = (fieldName = 'Email') =>
    nonEmptyString(fieldName)
        .email(`Invalid ${fieldName.toLowerCase()}`)
        .regex(EMAIL_REGEX, `Invalid ${fieldName.toLowerCase()} format`);
export const validPassword = (
    fieldName = 'Password',
    minLength = 8,
    maxLength = 128
) =>
    z
        .string({
            required_error: `${fieldName} is required`,
        })
        .min(minLength, {
            message: `${fieldName} must be at least ${minLength} characters`,
        })
        .max(maxLength, {
            message: `${fieldName} must be at most ${maxLength} characters`,
        })
        .refine((val) => UPPERCASE_REGEX.test(val), {
            message: `${fieldName} must contain at least one uppercase letter`,
        })
        .refine((val) => LOWERCASE_REGEX.test(val), {
            message: `${fieldName} must contain at least one lowercase letter`,
        })
        .refine((val) => NUMBER_REGEX.test(val), {
            message: `${fieldName} must contain at least one number`,
        })
        .refine((val) => SPECIAL_CHARACTER_REGEX.test(val), {
            message: `${fieldName} must contain at least one special character (@$!%*?&#)`,
        });

// Define the Zod validation schema
const name = nonEmptyString('Name');
const email = validEmail('Email');
const password = validPassword('Password', 8, 20);

const normalizeUrl = (url: string): string => {
    try {
        const parsed = new URL(url);
        // Optional: normalize host casing and remove trailing slash
        parsed.hostname = parsed.hostname.toLowerCase();
        parsed.pathname = parsed.pathname.replace(/\/+$/, '');
        return parsed.toString();
    } catch {
        return url;
    }
};

export const ShortenUrlSchema = z
    .object({
        originalUrl: z
            .string()
            .transform((val) => val.trim())
            .transform((val) => normalizeUrl(val))
            .refine(
                (val) => {
                    const ownDomain = configuration.app.baseUrl;
                    return !val.startsWith(ownDomain ?? '');
                },
                {
                    message: MESSAGES.URL_CREATION.OWN_DOMAIN_ERROR,
                }
            ),
    })
    .strict();

export const ShortKeySchema = z
    .object({
        shortKey: z
            .string()
            .trim()
            .min(1, MESSAGES.COMMON.VALIDATION_REQUIRED)
            .regex(SHORT_KEY_REGEX, {
                message: MESSAGES.URL_VALIDATION.INVALID_SHORT_KEY_FORMAT,
            }),
    })
    .strict();

export const LoginSchema = z
    .object({
        email,
        password,
    })
    .strict();

export const SignupSchema = z
    .object({
        name,
        email,
        password,
    })
    .strict();

export const ForgotPasswordSchema = z
    .object({
        email,
    })
    .strict();

export const ResetPasswordSchema = z
    .object({
        token: nonEmptyString('Token'),
        newPassword: password,
    })
    .strict();

export type ShortenUrlInput = z.infer<typeof ShortenUrlSchema>;
export type ShortKeyParams = z.infer<typeof ShortKeySchema>;
