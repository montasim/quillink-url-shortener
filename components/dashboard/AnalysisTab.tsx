'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import { Globe, MousePointerClick, Share2, Timer, TrendingUp, Link } from 'lucide-react';

const ViewsChart = dynamic(() => import('@/components/ViewsChart'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-muted/20 animate-pulse rounded-xl" />
});

import { IShortUrl } from '@/types/types';
import { format, startOfDay, subDays, eachDayOfInterval } from 'date-fns';

interface AnalysisTabProps {
    urls: IShortUrl[];
}

const AnalysisTab = ({ urls }: AnalysisTabProps) => {
    // Calculate top links from real data
    const topLinks = [...urls]
        .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
        .slice(0, 5)
        .map(url => ({
            shortUrl: url.shortKey,
            clicks: url.clicks || 0,
            growth: '+0%', // Growth calculation would need historical snapshots
            color: 'text-emerald-500'
        }));

    // Aggregate stats
    const stats = useMemo(() => {
        const now = new Date();
        return {
            totalLinks: urls.length,
            totalClicks: urls.reduce((sum, url) => sum + (url.clicks || 0), 0),
            activeLinks: urls.filter(url => !url.expiresAt || new Date(url.expiresAt) > now).length,
        };
    }, [urls]);

    // Aggregate click logs for the chart (last 7 days)
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

    // Derived data for geographic
    const topLocations = useMemo(() => {
        const locations: Record<string, { country: string; code: string; count: number }> = {};
        let totalCount = 0;

        urls.forEach(url => {
            (url.clickLogs || []).forEach(log => {
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
                clicks: loc.count,
                percentage: totalCount > 0 ? `${Math.round((loc.count / totalCount) * 100)}%` : '0%'
            }));

        return sortedLocations.length > 0 ? sortedLocations : [
            { country: 'United States', flag: '🇺🇸', clicks: 0, percentage: '0%' },
            { country: 'Germany', flag: '🇩🇪', clicks: 0, percentage: '0%' },
        ];
    }, [urls]);

    function getFlagEmoji(countryCode: string) {
        if (!countryCode || countryCode === '??') return '🏳️';
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Links</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">{stats.totalLinks}</p>
                        </div>
                        <div className="p-3 bg-blue-200/50 dark:bg-blue-800/50 rounded-xl">
                            <Link className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Clicks</p>
                            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-1">{stats.totalClicks}</p>
                        </div>
                        <div className="p-3 bg-purple-200/50 dark:bg-purple-800/50 rounded-xl">
                            <MousePointerClick className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-700 dark:text-green-300">Active Links</p>
                            <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-1">{stats.activeLinks}</p>
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
                            <CardTitle className="text-xl font-bold">Overall Traffic Evolution</CardTitle>
                            <p className="text-sm text-muted-foreground">Clicks and unique visitors across all links</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">Last 7 Days</Badge>
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
                {/* Top Performing Links */}
                <Card className="border-border/50 rounded-[32px] overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg">
                            <Share2 className="w-5 h-5 text-primary" />
                            Top Performing Links
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {topLinks.length > 0 ? topLinks.map((link, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                                            {link.shortUrl}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Timer className="w-3 h-3" /> Updated 2h ago
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold flex items-center gap-2 justify-end">
                                            <MousePointerClick className="w-4 h-4 text-muted-foreground" />
                                            {link.clicks.toLocaleString()}
                                        </div>
                                        <span className={`text-xs font-medium ${link.color}`}>
                                            {link.growth}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-muted-foreground py-10 italic">No data yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Geographic Breakdown */}
                <Card className="border-border/50 rounded-[32px] overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg">
                            <Globe className="w-5 h-5 text-primary" />
                            Traffic by Location
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
                                                {loc.clicks.toLocaleString()} ({loc.percentage})
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

import { useMemo } from 'react';

export default AnalysisTab;
