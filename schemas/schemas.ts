import { z } from 'zod';
import MESSAGES from '@/constants/messages';
import REGEX_PATTERNS from '@/constants/regexPatterns';
import getEnvironmentData from '@/utils/getEnvironmentData';

const {
    ENGLISH_LETTERS_ONLY,
    NUMBERS_ONLY,
    ENGLISH_ALPHANUMERIC_ONLY,
    FLOAT_STRING,
    POSITIVE_INTEGER_STRING,
    SHORT_KEY,
    EMAIL,
    UPPERCASE,
    LOWERCASE,
    NUMBER,
    SPECIAL_CHARACTER,
} = REGEX_PATTERNS;

export const nonEmptyString = (fieldName: string) =>
    z.string().nonempty(`${fieldName} is required`);

export const englishLettersOnly = (fieldName: string) =>
    nonEmptyString(fieldName).regex(
        ENGLISH_LETTERS_ONLY,
        `${fieldName} must contain only English letters.`
    );

export const englishAlphanumericOnly = (fieldName: string) =>
    nonEmptyString(fieldName).regex(
        ENGLISH_ALPHANUMERIC_ONLY,
        `${fieldName} must contain only English letters and numbers.`
    );

export const numbersOnly = (fieldName: string) =>
    nonEmptyString(fieldName).regex(
        NUMBERS_ONLY,
        `${fieldName} must contain only numbers.`
    );
export const floatStringOnly = (fieldName: string) =>
    nonEmptyString(fieldName).regex(
        FLOAT_STRING,
        `${fieldName} must be a valid number (e.g., 123, -4.5).`
    );
export const positiveIntegerStringOnly = (fieldName: string) =>
    nonEmptyString(fieldName).regex(
        POSITIVE_INTEGER_STRING,
        `${fieldName} must be a positive integer.`
    );

export const validUrl = (fieldName = 'Url') =>
    z.string().url(`Invalid ${fieldName.toLowerCase()}`);

export const validEmail = (fieldName = 'Email') =>
    z
        .string()
        .email(`Invalid ${fieldName.toLowerCase()}`)
        .regex(EMAIL, `Invalid ${fieldName.toLowerCase()} format`);

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
        .refine((val) => UPPERCASE.test(val), {
            message: `${fieldName} must contain at least one uppercase letter`,
        })
        .refine((val) => LOWERCASE.test(val), {
            message: `${fieldName} must contain at least one lowercase letter`,
        })
        .refine((val) => NUMBER.test(val), {
            message: `${fieldName} must contain at least one number`,
        })
        .refine((val) => SPECIAL_CHARACTER.test(val), {
            message: `${fieldName} must contain at least one special character (@$!%*?&#)`,
        });

// Define the Zod validation schema
const name = englishLettersOnly('Name');
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
                    const ownDomain = getEnvironmentData(
                        'NEXT_PUBLIC_BASE_URL'
                    );
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
            .regex(SHORT_KEY, {
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
