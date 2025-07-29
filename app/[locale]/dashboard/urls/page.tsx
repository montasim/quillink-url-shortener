'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { IShortUrl } from '@/types/types';
import { fetchUrls } from '@/lib/actions/dashboard';
import UrlGrid from '@/app/[locale]/dashboard/urls/UrlGrid';
import TabSection from '@/components/TabSection';
import { Folder } from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';

const UrlDashboard = () => {
    const t = useTranslations('dashboard');
    const [urls, setUrls] = useState<IShortUrl[]>([]);
    const [loading, setLoading] = useState(true);

    const tabs = [
        {
            name: t('links'),
            value: 'links',
            content: (
                <div className="min-h-[400px]">
                    {loading ? (
                        <p className="text-muted-foreground">
                            {t('loadingUrls')}
                        </p>
                    ) : urls.length === 0 ? (
                        <div className="text-center text-muted-foreground py-10">
                            <Folder className="mx-auto w-16 h-16 text-muted" />
                            <p className="mt-2">{t('noUrls')}</p>
                        </div>
                    ) : (
                        <UrlGrid urlData={urls} />
                    )}
                </div>
            ),
        },
        {
            name: t('analysis'),
            value: 'analysis',
            content: <ComingSoon text={t('analysisComingSoon')} />,
        },
        {
            name: t('realtime'),
            value: 'realtime',
            content: <ComingSoon text={t('realtimeComingSoon')} />,
        },
    ];

    useEffect(() => {
        fetchUrls(setUrls, setLoading);
    }, []);

    return (
        <>
            {/* Navbar is now sticky and styled in the Navbar component */}
            <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between">
                    {/* Tabs */}
                    <TabSection
                        defaultValue="links"
                        tabs={tabs}
                        listClassName="w-32 p-0 bg-background justify-start border-b rounded-none"
                        triggerClassName="rounded-none h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background data-[state=active]:bg-gradient-to-r from-gray-100 to-gray-300 -mb-[2px] rounded-t cursor-pointer text-secondary"
                        contentWrapperClassName="w-full mt-4"
                    />
                </div>
            </div>
        </>
    );
};

export default UrlDashboard;
