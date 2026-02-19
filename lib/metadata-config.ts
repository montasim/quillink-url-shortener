import configuration from '@/configuration/configuration';

interface MetadataConfig {
    pathname: string;
    title: string;
    description: string;
    translationKey?: string;
    isDynamic?: boolean;
}

const appName = configuration.app.name;
const baseUrl = configuration.app.baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'https://shrnkly.com';

const metadataConfig: MetadataConfig[] = [
    // Public Pages
    {
        pathname: '/',
        title: `Home - ${appName}`,
        description: 'URL Shortener, Text Sharing & QR Code Generator',
        translationKey: 'home.urls',
    },
    {
        pathname: '/urls',
        title: `URL Shortener - ${appName}`,
        description: 'Shorten and track your URLs',
        translationKey: 'home.urls',
    },
    {
        pathname: '/texts',
        title: `Text Sharing - ${appName}`,
        description: 'Share text, code, and notes securely',
        translationKey: 'home.texts',
    },
    {
        pathname: '/qr',
        title: `QR Code Generator - ${appName}`,
        description: 'Generate custom QR codes for free',
        translationKey: 'home.qr',
    },
    {
        pathname: '/pricing',
        title: `Pricing - ${appName}`,
        description: 'Choose your perfect plan',
        translationKey: 'home.pricing',
    },
    {
        pathname: '/contact',
        title: `Contact Us - ${appName}`,
        description: 'Get in touch with us',
        translationKey: 'home.contact',
    },
    {
        pathname: '/terms',
        title: `Terms of Service - ${appName}`,
        description: 'Terms of Service',
        translationKey: 'home.terms',
    },
    {
        pathname: '/privacy',
        title: `Privacy Policy - ${appName}`,
        description: 'Privacy Policy',
        translationKey: 'home.privacy',
    },
    
    // Authentication Pages
    {
        pathname: '/login',
        title: `Log In - ${appName}`,
        description: 'Access your dashboard to manage URLs and text shares',
        translationKey: 'login',
    },
    {
        pathname: '/signup',
        title: `Sign Up - ${appName}`,
        description: 'Create a free account to unlock unlimited features',
        translationKey: 'signup',
    },
    {
        pathname: '/forgot-password',
        title: `Forgot Password - ${appName}`,
        description: 'Reset your password to regain access to your account',
        translationKey: 'forgotPassword',
    },
    {
        pathname: '/reset-password',
        title: `Reset Password - ${appName}`,
        description: 'Set a new password for your account',
        translationKey: 'resetPassword',
    },

    // Dashboard Pages
    {
        pathname: '/dashboard',
        title: `Dashboard - ${appName}`,
        description: 'Manage your shortened URLs, view analytics, and track link performance',
        translationKey: 'dashboard',
    },
    {
        pathname: '/dashboard/urls',
        title: `Link Management - ${appName}`,
        description: 'Create, edit, and manage all your shortened URLs in one place',
        translationKey: 'dashboardUrls',
    },
    {
        pathname: '/dashboard/texts',
        title: `Text Shares - ${appName}`,
        description: 'Manage your shared text snippets and code blocks',
        translationKey: 'dashboardTexts',
    },

    // Dynamic Routes - Individual Items
    {
        pathname: '/dashboard/urls/[shortKey]',
        title: `View URL Details - ${appName}`,
        description: 'View and manage your shortened URL details and analytics',
        translationKey: 'url',
        isDynamic: true,
    },
    {
        pathname: '/dashboard/texts/[shortKey]',
        title: `View Text Share - ${appName}`,
        description: 'View and manage your shared text snippet',
        translationKey: 'text',
        isDynamic: true,
    },

    // Public View Pages
    {
        pathname: '/texts/[shortKey]',
        title: `View Shared Text - ${appName}`,
        description: 'View shared text snippet or code',
        translationKey: 'text',
        isDynamic: true,
    },
    {
        pathname: '/[shortKey]',
        title: `Redirecting - ${appName}`,
        description: 'Redirecting to destination URL',
        translationKey: 'redirect',
        isDynamic: true,
    },
];

export function getMetadataByPathname(pathname: string): MetadataConfig | null {
    // Remove locale prefix from pathname
    const cleanPathname = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Handle dynamic routes
    // Check for exact match first
    const exactMatch = metadataConfig.find(meta => meta.pathname === cleanPathname);
    if (exactMatch) {
        return exactMatch;
    }
    
    // Handle dynamic routes patterns
    if (cleanPathname.match(/^\/dashboard\/urls\/[a-zA-Z0-9_-]+$/)) {
        return metadataConfig.find(meta => meta.pathname === '/dashboard/urls/[shortKey]') || null;
    }
    
    if (cleanPathname.match(/^\/dashboard\/texts\/[a-zA-Z0-9_-]+$/)) {
        return metadataConfig.find(meta => meta.pathname === '/dashboard/texts/[shortKey]') || null;
    }
    
    if (cleanPathname.match(/^\/texts\/[a-zA-Z0-9_-]+$/)) {
        return metadataConfig.find(meta => meta.pathname === '/texts/[shortKey]') || null;
    }
    
    if (cleanPathname.match(/^\/[a-zA-Z0-9_-]+$/) && !cleanPathname.includes('/dashboard')) {
        return metadataConfig.find(meta => meta.pathname === '/[shortKey]') || null;
    }
    
    return null;
}

export function getCanonicalUrl(pathname: string): string {
    const cleanPathname = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    return `${baseUrl}${cleanPathname}`;
}

export function getPageMetadata(pathname: string): {
    title: string;
    description: string;
    canonical: string;
    translationKey?: string;
} | null {
    const metadata = getMetadataByPathname(pathname);
    if (!metadata) return null;
    
    return {
        title: metadata.title,
        description: metadata.description,
        canonical: getCanonicalUrl(pathname),
        translationKey: metadata.translationKey,
    };
}
