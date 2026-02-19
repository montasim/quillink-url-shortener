import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { rateLimitMiddleware } from './middleware/rate-limit';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
});

export default async function middleware(request: NextRequest) {
    // Apply rate limiting to API routes first
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const rateLimitResponse = rateLimitMiddleware(request);
        if (rateLimitResponse) {
            return rateLimitResponse;
        }
    }

    // Apply i18n middleware
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        '/(de|en|es|fr|zh|hi|ur|ar|bn)/:path*',

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        // Exclude API routes, _next, _vercel, and static files
        '/((?!api|_next|_vercel|.*\\..*).*)',

        // API routes for rate limiting
        '/api/:path*',
    ],
};
