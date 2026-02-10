import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/config.ts');

const nextConfig: NextConfig = {
    /* configuration options here */
    env: {
        NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.GOOGLE_OAUTH_GOOGLE_CLIENT_ID,
        NEXT_PUBLIC_GOOGLE_REDIRECT_URI:
            process.env.GOOGLE_OAUTH_GOOGLE_REDIRECT_URI,
    },
    allowedDevOrigins: ['192.168.0.106'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
