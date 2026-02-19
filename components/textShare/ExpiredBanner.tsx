'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';

interface ExpiredBannerProps {
    message?: string;
}

export default function ExpiredBanner({
    message,
}: ExpiredBannerProps) {
    const t = useTranslations('dashboard.texts');

    const defaultMessage = t('expiredMessage');

    return (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div>
                    <h3 className="font-medium text-destructive">{t('expiredTitle')}</h3>
                    <p className="text-sm text-muted-foreground">{message || defaultMessage}</p>
                </div>
            </div>
        </div>
    );
}
