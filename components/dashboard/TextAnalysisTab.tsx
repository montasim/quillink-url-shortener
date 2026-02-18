'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import { Globe, Eye, FileText, Share2, Timer, TrendingUp } from 'lucide-react';
import { format, startOfDay, subDays, eachDayOfInterval } from 'date-fns';

const ViewsChart = dynamic(() => import('@/components/ViewsChart'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-muted/20 animate-pulse rounded-xl" />
});

interface TextViewLog {
    id: string;
    textShareId: string;
    ipAddress?: string;
    country?: string;
    countryCode?: string;
    userAgent?: string;
    accessedAt?: string;
}

interface TextShare {
    id: string;
    shortKey: string;
    title?: string;
    content: string;
    format: string;
    viewCount: number;
    createdAt: string;
    expiresAt?: string;
    passwordHash?: string;
    viewLogs?: TextViewLog[];
}

interface TextAnalysisTabProps {
    shares: TextShare[];
}

function getFlagEmoji(countryCode: string) {
    if (!countryCode || countryCode === '??') return '🏳️';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

const TextAnalysisTab = ({ shares }: TextAnalysisTabProps) => {
    const t = useTranslations('dashboard.texts');

    // Calculate top shares from real data
    const topShares = useMemo(() => {
        return [...shares]
            .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
            .slice(0, 5)
            .map(share => ({
                shortKey: share.shortKey,
                title: share.title || share.shortKey,
                views: share.viewCount || 0,
                growth: '+0%',
                color: 'text-emerald-500'
            }));
    }, [shares]);

    // Aggregate stats
    const stats = useMemo(() => {
        const now = new Date();
        return {
            totalShares: shares.length,
            totalViews: shares.reduce((sum, share) => sum + (share.viewCount || 0), 0),
            activeShares: shares.filter(share => !share.expiresAt || new Date(share.expiresAt) > now).length,
        };
    }, [shares]);

    // Aggregate view logs for the chart (last 7 days)
    const chartData = useMemo(() => {
        const last7Days = eachDayOfInterval({
            start: subDays(new Date(), 6),
            end: new Date(),
        });

        return last7Days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            let dailyViews = 0;
            let dailyUniqueVisitors = new Set();

            shares.forEach(share => {
                (share.viewLogs || []).forEach(log => {
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
    }, [shares]);

    // Derived data for geographic breakdown
    const topLocations = useMemo(() => {
        const locations: Record<string, { country: string; code: string; count: number }> = {};
        let totalCount = 0;

        shares.forEach(share => {
            (share.viewLogs || []).forEach(log => {
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

        const sortedLocations = Object.values(locations)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(loc => ({
                country: loc.country,
                flag: getFlagEmoji(loc.code),
                views: loc.count,
                percentage: totalCount > 0 ? `${Math.round((loc.count / totalCount) * 100)}%` : '0%'
            }));

        return sortedLocations.length > 0 ? sortedLocations : [
            { country: 'United States', flag: '🇺🇸', views: 0, percentage: '0%' },
            { country: 'Germany', flag: '🇩🇪', views: 0, percentage: '0%' },
        ];
    }, [shares]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('totalShares')}</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">{stats.totalShares}</p>
                        </div>
                        <div className="p-3 bg-blue-200/50 dark:bg-blue-800/50 rounded-xl">
                            <FileText className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">{t('totalViews')}</p>
                            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-1">{stats.totalViews}</p>
                        </div>
                        <div className="p-3 bg-purple-200/50 dark:bg-purple-800/50 rounded-xl">
                            <Eye className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-700 dark:text-green-300">{t('activeShares')}</p>
                            <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-1">{stats.activeShares}</p>
                        </div>
                        <div className="p-3 bg-green-200/50 dark:bg-green-800/50 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-green-700 dark:text-green-300" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Growth Chart */}
            <Card className="border-none shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm overflow-hidden rounded-[32px]">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">{t('overallTraffic')}</CardTitle>
                            <p className="text-sm text-muted-foreground">{t('overallTrafficDesc')}</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">{t('last7Days')}</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="h-[300px] w-full">
                        <ViewsChart data={chartData} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Performing Shares */}
                <Card className="border-border/50 rounded-[32px] overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg">
                            <Share2 className="w-5 h-5 text-primary" />
                            {t('topPerformingShares')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {topShares.length > 0 ? topShares.map((share, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                                            {share.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Timer className="w-3 h-3" /> {t('updatedAgo')}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold flex items-center gap-2 justify-end">
                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                            {share.views.toLocaleString()}
                                        </div>
                                        <span className={`text-xs font-medium ${share.color}`}>
                                            {share.growth}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-muted-foreground py-10 italic">{t('noDataYet')}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Geographic Breakdown */}
                <Card className="border-border/50 rounded-[32px] overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg">
                            <Globe className="w-5 h-5 text-primary" />
                            {t('trafficByCountry')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[220px] pr-4">
                            <div className="space-y-6">
                                {topLocations.map((loc, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="flex items-center gap-2 font-medium">
                                                <span className="text-lg">{loc.flag}</span>
                                                {loc.country}
                                            </span>
                                            <span className="text-muted-foreground font-semibold">
                                                {loc.views.toLocaleString()} ({loc.percentage})
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: loc.percentage }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TextAnalysisTab;
