import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, incrementApiCall } from '@/services/usage.service';
import COOKIES from '@/constants/cookies';
import { verifyToken } from '@/lib/jwt';

export async function rateLimitMiddleware(request: NextRequest): Promise<NextResponse | null> {
    const { pathname } = request.nextUrl;

    if (!pathname.startsWith('/api/')) {
        return null;
    }

    if (pathname.includes('.')) {
        return null;
    }

    let userId: string | null = null;
    const accessCookie = request.cookies.get(COOKIES.NAME.ACCESS_TOKEN)?.value;

    if (accessCookie) {
        try {
            const decoded = verifyToken(accessCookie, COOKIES.TYPE.ACCESS);
            userId = decoded?.currentUser?.id || null;
        } catch (err) {
            console.error('Rate limit: Access token verification failed:', err);
        }
    }

    const rateLimitResult = await checkRateLimit(userId);

    if (!rateLimitResult.allowed) {
        const resetSeconds = Math.ceil((rateLimitResult.resetAt.getTime() - Date.now()) / 1000);
        
        const response = NextResponse.json(
            {
                error: 'Rate limit exceeded',
                message: `Too many requests. Please try again in ${resetSeconds} seconds.`,
                retryAfter: resetSeconds,
            },
            { status: 429 }
        );

        response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
        response.headers.set('X-RateLimit-Remaining', '0');
        response.headers.set('X-RateLimit-Reset', rateLimitResult.resetAt.toISOString());
        response.headers.set('Retry-After', resetSeconds.toString());

        return response;
    }

    await incrementApiCall(userId);

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetAt.toISOString());

    return response;
}
