'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { IShortUrl } from '@/types/types';
import { fetchUrls } from '@/lib/actions/dashboard';
import UrlGrid from '@/app/[locale]/dashboard/urls/components/UrlGrid';
import TabSection from '@/components/TabSection';
import { Link2, Search, SlidersHorizontal, TrendingUp, Activity, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CreateLinkModal from '@/components/dashboard/CreateLinkModal';
import AnalysisTab from '@/components/dashboard/AnalysisTab';
import ComingSoonFeatures from '@/components/dashboard/ComingSoonFeatures';
import UrlDashboardSkeleton from '@/components/dashboard/UrlDashboardSkeleton';
import Pagination from '@/components/Pagination';
import UsageProgress from '@/components/dashboard/UsageProgress';
import UsageLimitPrompt from '@/components/dashboard/UsageLimitPrompt';
import useUsageStats from '@/hooks/useUsageStats';
import { useAuth } from '@/context/AuthContext';

const UrlDashboard = () => {
    const t = useTranslations('dashboard.urls');
    const urlT = useTranslations('dashboard.urls.messages');
    const usageT = useTranslations('dashboard.urls.usage');
    const { isAuthenticated } = useAuth();
    const [urls, setUrls] = useState<IShortUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'clicks'>('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    // Use reusable usage stats hook
    const { usage, usageLoading, fetchUsageStats } = useUsageStats('urls');

    // Combined refresh function for URLs and usage
    const handleRefresh = useCallback(() => {
        fetchUrls(setUrls, setLoading, urlT);
        fetchUsageStats();
    }, [fetchUsageStats, urlT]);

    // Filter and sort URLs
    const filteredUrls = useMemo(() => {
        let filtered = urls.filter((url) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                url.shortKey?.toLowerCase().includes(searchLower) ||
                url.originalUrl?.toLowerCase().includes(searchLower)
            );
        });

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            } else if (sortBy === 'oldest') {
                return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
            } else if (sortBy === 'clicks') {
                return (b.clicks || 0) - (a.clicks || 0);
            }
            return 0;
        });

        return filtered;
    }, [urls, searchQuery, sortBy]);

    // Paginate URLs
    const paginatedUrls = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredUrls.slice(startIndex, endIndex);
    }, [filteredUrls, currentPage]);

    // Reset to page 1 when search or sort changes
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, sortBy]);

    // Calculate stats
    const stats = useMemo(() => {
        const now = new Date();
        return {
            totalLinks: urls.length,
            totalClicks: urls.reduce((acc, url) => acc + (url.clicks || 0), 0),
            activeLinks: urls.filter(url => !url.expiresAt || new Date(url.expiresAt) > now).length,
        };
    }, [urls]);

    const tabs = [
        {
            name: t('links'),
            value: 'links',
            icon: <Link2 className="w-4 h-4" />,
            content: (
                <div className="space-y-6">
                    {/* Search and Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder={t('searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-11 bg-card border-border/50 focus:border-primary/50"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="gap-2 h-11"
                                onClick={() => {
                                    const options: ('newest' | 'oldest' | 'clicks')[] = ['newest', 'oldest', 'clicks'];
                                    const currentIndex = options.indexOf(sortBy);
                                    const nextIndex = (currentIndex + 1) % options.length;
                                    setSortBy(options[nextIndex]);
                                }}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    {sortBy === 'newest' ? t('newest') : sortBy === 'oldest' ? t('oldest') : t('mostClicks')}
                                </span>
                            </Button>
                            <CreateLinkModal
                                onSuccess={handleRefresh}
                                isDisabled={!!(usage && usage.limit !== -1 && usage.remaining <= 0)}
                                disabledReason="URL creation limit reached"
                            />
                        </div>
                    </div>

                    {/* URLs Grid */}
                    <div className="min-h-[400px]">
                        {filteredUrls.length === 0 ? (
                            <Card className="border-dashed border-2 bg-muted/20">
                                <div className="text-center py-16 px-4">
                                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                        <Link2 className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {searchQuery ? t('noLinksFound') : t('noUrls')}
                                    </h3>
                                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                        {searchQuery
                                            ? t('tryAdjustingSearch')
                                            : t('createFirstLinkDesc')
                                        }
                                    </p>
                                    {!searchQuery && (
                                        <CreateLinkModal
                                            triggerLabel={t('createFirstLinkButton')}
                                            onSuccess={handleRefresh}
                                            isDisabled={!!(usage && usage.limit !== -1 && usage.remaining <= 0)}
                                            disabledReason="URL creation limit reached"
                                        />
                                    )}
                                </div>
                            </Card>
                        ) : (
                            <>
                                <UrlGrid
                                    urlData={paginatedUrls}
                                    onRefresh={handleRefresh}
                                />
                                <Pagination
                                    currentPage={currentPage}
                                    totalItems={filteredUrls.length}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        )}
                    </div>
                </div>
            ),
        },
        {
            name: t('analysis'),
            value: 'analysis',
            icon: <TrendingUp className="w-4 h-4" />,
            content: <AnalysisTab urls={urls} />,
        },
        {
            name: t('realtime'),
            value: 'realtime',
            icon: <Activity className="w-4 h-4" />,
            content: <ComingSoonFeatures />,
        },
    ];

    useEffect(() => {
        handleRefresh();
    }, [handleRefresh]);

    if (loading) {
        return <UrlDashboardSkeleton />;
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
            {/* Header with Usage Stats - Side by Side */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link2 className="w-5 h-5 text-primary" />
                        <h1 className="text-2xl font-semibold">
                            {t('dashboardTitle')}
                        </h1>
                    </div>
                    <p className="text-muted-foreground">
                        {t('dashboardSubtitle')}
                    </p>
                </div>

                {/* Usage Stats Card - Circular */}
                {!usageLoading && usage && (
                    <UsageProgress
                        current={usage.used}
                        limit={usage.limit}
                        label={usageT('urlsUsed')}
                        variant="circular"
                        size="md"
                    />
                )}
            </div>

            {/* Upgrade/Login prompt when limit reached */}
            {!usageLoading && usage && usage.limit !== -1 && usage.remaining <= 0 && (
                <UsageLimitPrompt
                    variant="limit-reached"
                    isAuthenticated={isAuthenticated}
                    t={t}
                    limit={usage.limit}
                />
            )}

            {/* Low usage warning */}
            {!usageLoading &&
                usage &&
                usage.limit !== -1 &&
                usage.remaining > 0 &&
                usage.remaining <= 5 && (
                    <div className="mb-6 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                        <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {usage.remaining} {t('remaining')} {usageT('upgradeForMore')}
                        </p>
                    </div>
                )}

            {/* Upgrade/Login prompt when only 2 URLs remaining */}
            {!usageLoading &&
                usage &&
                usage.limit !== -1 &&
                usage.remaining > 0 &&
                usage.remaining <= 2 && (
                    <UsageLimitPrompt
                        variant="low-limit"
                        isAuthenticated={isAuthenticated}
                        t={t}
                        remaining={usage.remaining}
                    />
                )}

            <TabSection
                defaultValue="links"
                tabs={tabs}
                listClassName="inline-flex p-1.5 bg-muted/50 rounded-[20px] mb-10 border border-border/40"
                triggerClassName="px-8 py-2.5 rounded-[14px] transition-all duration-300 font-semibold text-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-xl data-[state=active]:shadow-primary/5 text-muted-foreground hover:text-foreground flex items-center gap-2"
                contentWrapperClassName="w-full"
            />
        </div>
    );
};

export default UrlDashboard;
