import type { Metadata } from 'next';
import Navbar from '@/components/navbar/navbar';
import React from 'react';
import Footer from '@/components/footer/footer';
import configuration from '@/configuration/configuration';

export const metadata: Metadata = {
    title: `${configuration.app.name} – URL Shortener`,
    description: 'Create short links, QR codes, share them anywhere.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex-grow">
            <Navbar />

            {children}

            <Footer />
        </main>
    );
}
