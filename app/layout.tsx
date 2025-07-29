import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'QuilLink – URL Shortener',
    description: 'Create short links, QR codes, share them anywhere.',
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
                {children}
            </body>
        </html>
    );
}
