'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import DashboardSummary, { StatCard, TopItem, Location, ChartData } from './DashboardSummary';
import { IShortUrl } from '@/types/types';
import { Link } from 'lucide-react';

interface AnalysisTabProps {
    urls: IShortUrl[];
}

export default function AnalysisTab({ urls }: AnalysisTabProps) {
    const t = useTranslations('dashboard.urls');

    // Calculate top links from real data
    const topLinks: TopItem[] = useMemo(() => {
        return [...urls]
            .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
            .slice(0, 5)
            .map(url => ({
                shortKey: url.shortKey,
                title: url.shortKey,
                clicks: url.clicks || 0,
                growth: '+0%',
                color: 'text-emerald-500'
            }));
    }, [urls]);

    // Aggregate stats
    const stats: StatCard[] = useMemo(() => {
        const now = new Date();
        return [
            {
                label: t('totalLinks'),
                value: urls.length,
                icon: (
                    <div className="w-12 h-12 rounded-[20px] bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Link className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                ),
            },
            {
                label: t('totalClicks'),
                value: urls.reduce((sum, url) => sum + (url.clicks || 0), 0),
                icon: (
                    <div className="w-12 h-12 rounded-[20px] bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                    </div>
                ),
            },
            {
                label: t('activeLinks'),
                value: urls.filter(url => !url.expiresAt || new Date(url.expiresAt) > now).length,
                icon: (
                    <div className="w-12 h-12 rounded-[20px] bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                ),
            },
        ];
    }, [urls, t]);

    // Extract chart data from URLs
    const getChartStats = (items: IShortUrl[]): ChartData[] => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d;
        }).reverse();

        return last7Days.map(day => {
            const dateStr = day.toISOString().split('T')[0];
            let dailyVisits = 0;
            let dailyUniqueVisitors = new Set();

            items.forEach(url => {
                (url.clickLogs || []).forEach(log => {
                    const logDate = log.createdAt?.split('T')[0] || '';
                    if (logDate === dateStr) {
                        dailyVisits++;
                        if (log.ipAddress) dailyUniqueVisitors.add(log.ipAddress);
                    }
                });
            });

            return {
                date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                visits: dailyVisits,
                visitors: dailyUniqueVisitors.size
            };
        });
    };

    // Extract location data from URLs
    const getLocations = (items: IShortUrl[]): Location[] => {
        const locations: Record<string, Location> = {};

        items.forEach(url => {
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
                }
            });
        });

        return Object.values(locations)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    };

    return (
        <DashboardSummary
            stats={stats}
            items={urls}
            topItems={topLinks}
            translationKey="dashboard.urls"
            itemType="links"
            getItemStats={getChartStats}
            getItemLocations={getLocations}
        />
    );
}
