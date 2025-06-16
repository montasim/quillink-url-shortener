import { NextRequest } from 'next/server';

const getClientIp = (req: NextRequest): string => {
    const xff = req.headers.get('x-forwarded-for');
    if (xff) {
        // Handles multiple IPs (proxies)
        return xff.split(',')[0].trim();
    }

    return req.headers.get('x-real-ip') ?? 'unknown';
};

export default getClientIp;
