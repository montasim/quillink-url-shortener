import Navbar from '@/components/navbar/navbar';
import React from 'react';
import Footer from '@/components/footer/footer';

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
