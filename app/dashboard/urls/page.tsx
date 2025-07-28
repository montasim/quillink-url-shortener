'use client';

import { useEffect, useState } from 'react';
import { IShortUrl } from '@/types/types';
import { fetchUrls } from '@/app/dashboard/urls/actions';
import UrlGrid from '@/app/dashboard/urls/UrlGrid';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TabSection from '@/components/TabSection';

const UrlDashboard = () => {
    const [urls, setUrls] = useState<IShortUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const tabs = [
        {
            name: 'Links',
            value: 'links',
            content: (
                <div className="min-h-[400px]">
                    {loading ? (
                        <p className="text-muted-foreground">
                            Loading short URLs...
                        </p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : urls.length === 0 ? (
                        <div className="text-center text-muted-foreground py-10">
                            <img
                                src="/empty.svg"
                                alt="Empty"
                                className="mx-auto h-32"
                            />
                            <p className="mt-4">
                                No short URLs yet. Start by
                                creating one!
                            </p>
                        </div>
                    ) : (
                        <UrlGrid urlData={urls} />
                    )}
                </div>
            ),
        },
        {
            name: 'Analysis',
            value: 'analysis',
            content: (
                <div className="py-10 text-center text-muted-foreground">
                    Analysis coming soon...
                </div>
            ),
        },
        {
            name: 'Realtime',
            value: 'realtime',
            content: (
                <div className="py-10 text-center text-muted-foreground">
                    Realtime stats coming soon...
                </div>
            ),
        },
    ];

    useEffect(() => {
        fetchUrls(setUrls, setError, setLoading);
    }, []);

    return (
        <>
            {/* Navbar is now sticky and styled in the Navbar component */}
            <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <TabSection
                    defaultValue="links"
                    tabs={tabs}
                    listClassName="w-32 p-0 bg-background justify-start border-b rounded-none"
                    triggerClassName="rounded-none h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background data-[state=active]:bg-gradient-to-r from-gray-100 to-gray-300 -mb-[2px] rounded-t cursor-pointer text-secondary"
                    contentWrapperClassName="w-full mt-4"
                />
            </div>
        </>
    );
};

export default UrlDashboard;
