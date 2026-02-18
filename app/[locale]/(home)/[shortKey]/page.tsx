'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';

const RedirectPage = () => {
    const t = useTranslations('common');
    const params = useParams();
    const shortKey = params?.shortKey as string;

    useEffect(() => {
        if (!shortKey) return;
        window.location.href = `/api/v1/${shortKey}`;
    }, [shortKey]);

    return (
        <section className="relative min-h-screen py-24 md:py-32 px-6 overflow-hidden bg-background">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-6 flex items-center justify-center">
                    <RotateCcw className="h-6 w-6" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {t('redirecting')}
                </h1>

                <p className="text-lg text-muted-foreground mb-2">
                    {t('redirectingMessage', { shortKey })}
                </p>

                <p className="text-sm text-muted-foreground/70">
                    {t('redirectingDescription')}
                </p>
            </div>
        </section>
    );
};

export default RedirectPage;
