import type { Metadata } from 'next';
import Navbar from '@/components/navbar/navbar';
import React from 'react';
import Footer from '@/components/footer/footer';

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_PROJECT_NAME || 'Shrnkly'} – URL Shortener`,
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
