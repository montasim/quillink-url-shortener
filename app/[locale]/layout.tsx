import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { locales } from '@/i18n/config';
import React from 'react';
import { MetadataProvider } from '@/components/metadata-provider';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <AuthProvider>
                <MetadataProvider>
                    {children}
                    <Toaster richColors />
                </MetadataProvider>
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
