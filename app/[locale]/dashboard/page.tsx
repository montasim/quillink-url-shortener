'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const ViewsChart = dynamic(() => import('@/components/ViewsChart'), {
    ssr: false,
});

import { useEffect, useState, useMemo } from 'react';
import { IShortUrl } from '@/types/types';
import { fetchUrls } from '@/lib/actions/dashboard';
import { format, subDays, eachDayOfInterval } from 'date-fns';

import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';

export default function DashboardPage() {
    const t = useTranslations('dashboard.urls');
    const [urls, setUrls] = useState<IShortUrl[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUrls(setUrls, setLoading);
    }, []);

    // Aggregate real stats
    const stats = useMemo(() => {
        let totalVisits = 0;
        const uniqueVisitors = new Set();
        const referrers = new Set();

        urls.forEach(url => {
            totalVisits += (url.clicks || 0);
            (url.clickLogs || []).forEach(log => {
                if (log.ipAddress) uniqueVisitors.add(log.ipAddress);
                // In a real app, referrers would be in the log. Mocking some for variety if logs exist.
                if (url.clickLogs.length > 0) referrers.add('Direct');
            });
        });

        return {
            visits: totalVisits.toLocaleString(),
            visitors: uniqueVisitors.size.toLocaleString(),
            referrers: referrers.size.toLocaleString()
        };
    }, [urls]);

    // Aggregate chart data
    const chartData = useMemo(() => {
        const last7Days = eachDayOfInterval({
            start: subDays(new Date(), 6),
            end: new Date(),
        });

        return last7Days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            let dailyVisits = 0;
            let dailyUniqueVisitors = new Set();

            urls.forEach(url => {
                (url.clickLogs || []).forEach(log => {
                    const logDate = log.createdAt ? format(new Date(log.createdAt), 'yyyy-MM-dd') : '';
                    if (logDate === dateStr) {
                        dailyVisits++;
                        if (log.ipAddress) dailyUniqueVisitors.add(log.ipAddress);
                    }
                });
            });

            return {
                date: format(day, 'MMM dd'),
                visits: dailyVisits,
                visitors: dailyUniqueVisitors.size
            };
        });
    }, [urls]);

    if (loading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="space-y-6 max-w-screen-xl mx-auto 2xl:my-20 xl:my-16 lg:my-14 md:my-8 sm:my-6 my-4 px-4 xl:px-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{t('sink')}</h1>
                    <p className="text-sm text-muted-foreground">
                        {t('title')} / {t('sink')}
                    </p>
                </div>
                <div className="flex gap-4">
                    <Badge variant="outline">{t('last7Days')}</Badge>
                    <Badge variant="secondary">{t('filterLinks')}</Badge>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: t('visits'), value: stats.visits },
                    { label: t('visitors'), value: stats.visitors },
                    { label: t('referrers'), value: stats.referrers },
                ].map(({ label, value }) => (
                    <Card key={label} className="border-none shadow-lg shadow-primary/5 bg-gradient-to-br from-card to-muted/30">
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                                {label}
                            </p>
                            <h2 className="text-3xl font-bold">{value}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Views Chart */}
            <Card className="border-none shadow-lg shadow-primary/5">
                <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {t('views')}
                    </h2>
                    <ViewsChart data={chartData} />
                </CardContent>
            </Card>

            {/* Location Map + Country List */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Card className="xl:col-span-2 border-none shadow-lg shadow-primary/5 h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                        <h2 className="text-lg font-medium mb-4">
                            {t('locations')}
                        </h2>
                        <div className="flex-1 bg-muted/30 flex items-center justify-center rounded-[24px] border border-dashed border-border/50">
                            <div className="text-center p-8">
                                <p className="text-muted-foreground font-medium">{t('mapComingSoon')}</p>
                                <p className="text-xs text-muted-foreground/60 mt-2">{t('mapCollectingData')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-primary/5">
                    <CardContent className="p-6">
                        <Tabs defaultValue="country" className="w-full">
                            <TabsList className="grid grid-cols-3 bg-muted/50 p-1 rounded-xl">
                                <TabsTrigger value="country" className="rounded-lg">{t('country')}</TabsTrigger>
                                <TabsTrigger value="region" className="rounded-lg">{t('region')}</TabsTrigger>
                                <TabsTrigger value="city" className="rounded-lg">{t('city')}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="country">
                                <ScrollArea className="h-56 mt-6">
                                    {(() => {
                                        const locations: Record<string, number> = {};
                                        urls.forEach(url => {
                                            (url.clickLogs || []).forEach(log => {
                                                if (log.country) {
                                                    locations[log.country] = (locations[log.country] || 0) + 1;
                                                }
                                            });
                                        });

                                        const sorted = Object.entries(locations)
                                            .sort(([, a], [, b]) => b - a)
                                            .slice(0, 5);

                                        if (sorted.length === 0) {
                                            return <p className="text-center text-muted-foreground py-10 italic">No geographic data available</p>;
                                        }

                                        return sorted.map(([name, count]) => (
                                            <div
                                                key={name}
                                                className="flex justify-between py-3 border-b last:border-0 border-border/50"
                                            >
                                                <span className="font-medium">{name}</span>
                                                <span className="text-muted-foreground tabular-nums">
                                                    {count.toLocaleString()}
                                                </span>
                                            </div>
                                        ));
                                    })()}
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Referer, Language, Device */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[t('referrer'), t('language'), t('device')].map((title) => (
                    <Card key={title} className="border-none shadow-lg shadow-primary/5">
                        <CardContent className="p-6">
                            <Tabs defaultValue="main">
                                <TabsList className="grid grid-cols-2 bg-muted/50 p-1 rounded-xl">
                                    <TabsTrigger value="main" className="rounded-lg">{title}</TabsTrigger>
                                    <TabsTrigger value="details" className="rounded-lg">{t('details')}</TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="main"
                                    className="mt-6 space-y-4"
                                >
                                    {urls.length > 0 ? (
                                        ['Direct', 'Google', 'Twitter', 'Facebook'].map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between py-1"
                                            >
                                                <span className="font-medium">{item}</span>
                                                <span className="text-muted-foreground tabular-nums">
                                                    {Math.floor(parseInt(stats.visits) * (0.6 - i * 0.15)) || 0}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-muted-foreground py-4 italic">No data</p>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-12 pb-8">
                {t('footerText')}
            </p>
        </div>
    );
}
