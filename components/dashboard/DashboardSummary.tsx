'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import { Globe, TrendingUp, Timer, Share2 } from 'lucide-react';
import { format, startOfDay, subDays, eachDayOfInterval } from 'date-fns';

const ViewsChart = dynamic(() => import('@/components/ViewsChart'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-muted/20 animate-pulse rounded-xl" />
});

export interface StatCard {
    label: string;
    value: number | string;
    icon?: React.ReactNode;
    color?: string;
}

export interface TopItem {
    shortKey: string;
    title?: string;
    clicks?: number;
    views?: number;
    growth?: string;
    color?: string;
}

export interface Location {
    country: string;
    code: string;
    count: number;
}

export interface ChartData {
    date: string;
    visits: number;
    visitors: number;
}

export interface DashboardSummaryProps {
    stats: StatCard[];
    items: any[]; // IShortUrl[] or TextShare[] - used for chart/location data extraction
    topItems: TopItem[];
    translationKey: string;
    itemType: 'links' | 'shares';
    getItemStats?: (items: any[]) => ChartData[];
    getItemLocations?: (items: any[]) => Location[];
}

function getFlagEmoji(countryCode: string) {
    if (!countryCode || countryCode === '??') return '🏳️';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export default function DashboardSummary({
    stats,
    items,
    topItems,
    translationKey,
    itemType,
    getItemStats,
    getItemLocations,
}: DashboardSummaryProps) {
    const t = useTranslations(translationKey);

    // Extract chart data from items
    const chartData: ChartData[] = useMemo(() => {
        if (getItemStats) {
            return getItemStats(items);
        }

        // Default extraction for URLs (IShortUrl)
        if ('clickLogs' in (items[0] || {})) {
            const last7Days = eachDayOfInterval({
                start: subDays(new Date(), 6),
                end: new Date(),
            });

            return last7Days.map(day => {
                const dateStr = format(day, 'yyyy-MM-dd');
                let dailyVisits = 0;
                let dailyUniqueVisitors = new Set();

                items.forEach((item: any) => {
                    (item.clickLogs || []).forEach((log: any) => {
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
        }

        // Default extraction for TextShares
        if ('viewLogs' in (items[0] || {})) {
            const last7Days = eachDayOfInterval({
                start: subDays(new Date(), 6),
                end: new Date(),
            });

            return last7Days.map(day => {
                const dateStr = format(day, 'yyyy-MM-dd');
                let dailyViews = 0;
                let dailyUniqueVisitors = new Set();

                items.forEach((item: any) => {
                    (item.viewLogs || []).forEach((log: any) => {
                        const logDate = log.accessedAt ? format(new Date(log.accessedAt), 'yyyy-MM-dd') : '';
                        if (logDate === dateStr) {
                            dailyViews++;
                            if (log.ipAddress) dailyUniqueVisitors.add(log.ipAddress);
                        }
                    });
                });

                return {
                    date: format(day, 'MMM dd'),
                    visits: dailyViews,
                    visitors: dailyUniqueVisitors.size
                };
            });
        }

        return [];
    }, [items, getItemStats]);

    // Extract location data from items
    const topLocations: Location[] = useMemo(() => {
        if (getItemLocations) {
            return getItemLocations(items);
        }

        const locations: Record<string, Location> = {};
        let totalCount = 0;

        items.forEach((item: any) => {
            const logs = item.clickLogs || item.viewLogs || [];
            logs.forEach((log: any) => {
                if (log.country) {
                    const country = log.country;
                    if (!locations[country]) {
                        locations[country] = {
                            country,
                            code: log.countryCode || '??',
                            count: 0
                        };
                    }
                    locations[country].count++;
                    totalCount++;
                }
            });
        });

        return Object.values(locations)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [items, getItemLocations]);

    const statIcons = [
        <div key="icon1" className="w-12 h-12 rounded-[20px] bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>,
        <div key="icon2" className="w-12 h-12 rounded-[20px] bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>,
        <div key="icon3" className="w-12 h-12 rounded-[20px] bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Timer className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>,
    ];

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <Card
                        key={stat.label}
                        className="border-none shadow-lg shadow-primary/5 bg-gradient-to-br from-card to-muted/30"
                    >
                        <CardContent className="p-6 flex items-center gap-4">
                            {stat.icon || statIcons[index % statIcons.length]}
                            <div>
                                <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                                    {stat.label}
                                </p>
                                <h2 className="text-3xl font-bold">{stat.value}</h2>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Views Chart */}
            <Card className="border-none shadow-lg shadow-primary/5">
                <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {t('overallTrafficDesc') || t('views')}
                    </h2>
                    <ViewsChart data={chartData} />
                </CardContent>
            </Card>

            {/* Location Map + Country List */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Card className="xl:col-span-2 border-none shadow-lg shadow-primary/5 h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                        <h2 className="text-lg font-medium mb-4">
                            {t('locations') || t('trafficByLocation')}
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
                        <h2 className="text-lg font-medium mb-4">
                            {t('trafficByCountry') || t('country')}
                        </h2>
                        <ScrollArea className="h-56">
                            {topLocations.length === 0 ? (
                                <p className="text-center text-muted-foreground py-10 italic">
                                    {t('noDataYet') || 'No geographic data available'}
                                </p>
                            ) : (
                                topLocations.map(({ country, code, count }) => (
                                    <div
                                        key={country}
                                        className="flex justify-between py-3 border-b last:border-0 border-border/50"
                                    >
                                        <span className="font-medium flex items-center gap-2">
                                            <span className="text-xl">{getFlagEmoji(code)}</span>
                                            {country}
                                        </span>
                                        <span className="text-muted-foreground tabular-nums">
                                            {count.toLocaleString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Top Performing Items */}
            <Card className="border-none shadow-lg shadow-primary/5">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">
                        {itemType === 'links' ? t('topPerformingLinks') : t('topPerformingShares')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {topItems.map((item, index) => (
                            <div
                                key={item.shortKey}
                                className="bg-gradient-to-br from-card to-muted/30 rounded-[20px] p-5 border border-border/30 hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 rounded-[16px] bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Share2 className="w-5 h-5 text-primary" />
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        #{index + 1}
                                    </Badge>
                                </div>
                                <h3 className="font-semibold text-sm mb-1 truncate" title={item.title || item.shortKey}>
                                    {item.title || item.shortKey}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-medium ${item.color || 'text-primary'}`}>
                                        {item.clicks || item.views} {itemType === 'links' ? 'clicks' : 'views'}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{item.growth}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
