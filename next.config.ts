import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* configuration options here */
    env: {
        NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.GOOGLE_OAUTH_GOOGLE_CLIENT_ID,
        NEXT_PUBLIC_GOOGLE_REDIRECT_URI:
            process.env.GOOGLE_OAUTH_GOOGLE_REDIRECT_URI,
    },
};

export default nextConfig;
