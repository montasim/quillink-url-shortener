import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = [
    'en',
    'de',
    'es',
    'fr',
    'zh',
    'hi',
    'ur',
    'ar',
] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !locales.includes(locale as any)) {
        locale = defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
