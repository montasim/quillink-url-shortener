import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import configuration from '@/configuration/configuration';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const projectName = configuration.app.name;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@shrnkly.com';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: `${projectName} – Smart URL Shortener, Text Sharing & QR Code Generator`,
        template: `%s | ${projectName}`,
    },
    description: 'Free URL shortener with analytics, secure text sharing, and custom QR codes. Create trackable links, share code snippets, and generate QR codes in seconds. No signup required.',
    keywords: [
        'URL shortener',
        'link shortener',
        'QR code generator',
        'text sharing',
        'code sharing',
        'analytics',
        'track links',
        'custom QR codes',
        'free URL shortener',
        'secure text sharing',
        'pastebin alternative',
        'link management',
    ],
    authors: [{ name: projectName }],
    creator: projectName,
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: baseUrl,
        title: projectName,
        description: 'Free URL shortener with analytics, secure text sharing, and custom QR codes.',
        siteName: projectName,
    },
    twitter: {
        card: 'summary_large_image',
        title: projectName,
        description: 'Free URL shortener with analytics, secure text sharing, and custom QR codes.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        other: {
            'contact': contactEmail,
        },
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
                {children}
            </body>
        </html>
    );
}
