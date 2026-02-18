'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import DashboardSummary, { StatCard, TopItem, Location, ChartData } from './DashboardSummary';
import { FileText } from 'lucide-react';

interface TextViewLog {
    id: string;
    textShareId: string;
    ipAddress?: string;
    country?: string;
    countryCode?: string;
    userAgent?: string;
    accessedAt?: string;
}

export interface TextShare {
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

export default function TextAnalysisTab({ shares }: TextAnalysisTabProps) {
    const t = useTranslations('dashboard.texts');

    // Calculate top shares from real data
    const topShares: TopItem[] = useMemo(() => {
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
    const stats: StatCard[] = useMemo(() => {
        const now = new Date();
        return [
            {
                label: t('totalShares'),
                value: shares.length,
                icon: (
                    <div className="w-12 h-12 rounded-[20px] bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                ),
            },
            {
                label: t('totalViews'),
                value: shares.reduce((sum, share) => sum + (share.viewCount || 0), 0),
                icon: (
                    <div className="w-12 h-12 rounded-[20px] bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                ),
            },
            {
                label: t('activeShares'),
                value: shares.filter(share => !share.expiresAt || new Date(share.expiresAt) > now).length,
                icon: (
                    <div className="w-12 h-12 rounded-[20px] bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                ),
            },
        ];
    }, [shares, t]);

    // Extract chart data from shares
    const getChartStats = (items: TextShare[]): ChartData[] => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d;
        }).reverse();

        return last7Days.map(day => {
            const dateStr = day.toISOString().split('T')[0];
            let dailyViews = 0;
            let dailyUniqueVisitors = new Set();

            items.forEach(share => {
                (share.viewLogs || []).forEach(log => {
                    const logDate = log.accessedAt?.split('T')[0] || '';
                    if (logDate === dateStr) {
                        dailyViews++;
                        if (log.ipAddress) dailyUniqueVisitors.add(log.ipAddress);
                    }
                });
            });

            return {
                date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                visits: dailyViews,
                visitors: dailyUniqueVisitors.size
            };
        });
    };

    // Extract location data from shares
    const getLocations = (items: TextShare[]): Location[] => {
        const locations: Record<string, Location> = {};

        items.forEach(share => {
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
            items={shares}
            topItems={topShares}
            translationKey="dashboard.texts"
            itemType="shares"
            getItemStats={getChartStats}
            getItemLocations={getLocations}
        />
    );
}
