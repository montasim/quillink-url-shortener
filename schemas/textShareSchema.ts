import { z } from 'zod';
import { nonEmptyString, englishAlphanumericOnly } from '@/schemas/schemas';

const TEXT_SHARE_CONTENT_MAX_LENGTH = 100 * 1024; // 100KB

export const TextShareSchema = z
    .object({
        title: z
            .string()
            .trim()
            .max(100, 'Title must be less than 100 characters')
            .optional()
            .or(z.literal('')),
        content: z
            .string()
            .trim()
            .min(1, 'Content is required')
            .max(
                TEXT_SHARE_CONTENT_MAX_LENGTH,
                `Content must be less than ${TEXT_SHARE_CONTENT_MAX_LENGTH / 1024}KB`
            ),
        format: z
            .enum(['plain', 'markdown', 'code'], {
                errorMap: () => ({
                    message:
                        'Format must be one of: plain, markdown, code',
                }),
            })
            .optional()
            .default('plain'),
        syntaxLanguage: z
            .string()
            .trim()
            .max(50, 'Syntax language must be less than 50 characters')
            .optional()
            .or(z.literal('')),
        password: z
            .string()
            .min(4, 'Password must be at least 4 characters')
            .max(100, 'Password must be less than 100 characters')
            .optional()
            .or(z.literal('')),
        expiresAt: z
            .string()
            .optional()
            .or(z.literal(''))
            .transform((val) => (val ? new Date(val) : undefined))
            .refine(
                (val) => {
                    if (!val) return true;
                    return val > new Date();
                },
                {
                    message: 'Expiration date must be in the future',
                }
            )
            .optional(),
        viewLimit: z
            .string()
            .optional()
            .or(z.literal(''))
            .transform((val) => (val ? parseInt(val, 10) : undefined))
            .refine(
                (val) => {
                    if (val === undefined) return true;
                    return !isNaN(val) && val >= 1 && val <= 1000;
                },
                {
                    message: 'View limit must be between 1 and 1000',
                }
            )
            .optional(),
        isPublic: z
            .boolean()
            .optional()
            .default(true),
        customSlug: z
            .string()
            .trim()
            .max(50, 'Custom slug must be less than 50 characters')
            .regex(/^[a-zA-Z0-9-_]+$/, {
                message:
                    'Custom slug must contain only alphanumeric characters, hyphens, and underscores',
            })
            .optional()
            .or(z.literal('')),
    })
    .strict();

export const TextSharePasswordSchema = z
    .object({
        password: nonEmptyString('Password'),
    })
    .strict();

export const TextShareUpdateSchema = TextShareSchema.partial();
