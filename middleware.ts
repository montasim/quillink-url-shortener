import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
});

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        '/(de|en|es|fr|zh)/:path*',

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        // Exclude API routes, _next, _vercel, and static files
        '/((?!api|_next|_vercel|.*\\..*).*)',
    ],
};
