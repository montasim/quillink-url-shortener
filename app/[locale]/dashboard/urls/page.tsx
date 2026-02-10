'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { IShortUrl } from '@/types/types';
import { fetchUrls } from '@/lib/actions/dashboard';
import UrlGrid from '@/app/[locale]/dashboard/urls/UrlGrid';
import TabSection from '@/components/TabSection';
import { Link2, Search, SlidersHorizontal, Plus, TrendingUp, MousePointerClick, Link } from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CreateLinkModal from '@/components/dashboard/CreateLinkModal';
import AnalysisTab from '@/components/dashboard/AnalysisTab';
import RealtimeComingSoon from '@/components/dashboard/RealtimeComingSoon';

const UrlDashboard = () => {
    const t = useTranslations('dashboard');
    const [urls, setUrls] = useState<IShortUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'clicks'>('newest');

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
            }
            return 0; // clicks sorting can be added when click data is available
        });

        return filtered;
    }, [urls, searchQuery, sortBy]);

    // Calculate stats
    const stats = useMemo(() => {
        return {
            totalLinks: urls.length,
            totalClicks: 0, // This would come from actual click data
            activeLinks: urls.length, // This would be based on active status
        };
    }, [urls]);

    const tabs = [
        {
            name: t('links'),
            value: 'links',
            icon: <Link2 className="w-4 h-4" />,
            content: (
                <div className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Links</p>
                                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">{stats.totalLinks}</p>
                                </div>
                                <div className="p-3 bg-blue-200 dark:bg-blue-800/50 rounded-xl">
                                    <Link className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Clicks</p>
                                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-1">{stats.totalClicks}</p>
                                </div>
                                <div className="p-3 bg-purple-200 dark:bg-purple-800/50 rounded-xl">
                                    <MousePointerClick className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Active Links</p>
                                    <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-1">{stats.activeLinks}</p>
                                </div>
                                <div className="p-3 bg-green-200 dark:bg-green-800/50 rounded-xl">
                                    <TrendingUp className="w-6 h-6 text-green-700 dark:text-green-300" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by short link or destination URL..."
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
                                    const newSort = sortBy === 'newest' ? 'oldest' : 'newest';
                                    setSortBy(newSort);
                                }}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    {sortBy === 'newest' ? 'Newest' : 'Oldest'}
                                </span>
                            </Button>
                            <CreateLinkModal onSuccess={() => fetchUrls(setUrls, setLoading)} />
                        </div>
                    </div>

                    {/* URLs Grid */}
                    <div className="min-h-[400px]">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                                    <p className="text-sm text-muted-foreground">
                                        {t('loadingUrls')}
                                    </p>
                                </div>
                            </div>
                        ) : filteredUrls.length === 0 ? (
                            <Card className="border-dashed border-2 bg-muted/20">
                                <div className="text-center py-16 px-4">
                                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                        <Link2 className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {searchQuery ? 'No links found' : t('noUrls')}
                                    </h3>
                                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                        {searchQuery
                                            ? 'Try adjusting your search query or filters'
                                            : 'Create your first short link to get started with tracking and analytics'
                                        }
                                    </p>
                                    {!searchQuery && (
                                        <CreateLinkModal
                                            triggerLabel="Create Your First Link"
                                            onSuccess={() => fetchUrls(setUrls, setLoading)}
                                        />
                                    )}
                                </div>
                            </Card>
                        ) : (
                            <UrlGrid urlData={filteredUrls} />
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
            content: <RealtimeComingSoon />,
        },
    ];

    useEffect(() => {
        fetchUrls(setUrls, setLoading);
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Links Dashboard</h1>
                <p className="text-muted-foreground">Manage and track all your shortened links</p>
            </div>

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

import { Activity } from 'lucide-react';

export default UrlDashboard;
