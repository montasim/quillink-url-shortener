'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { FileText, Search, SlidersHorizontal, TrendingUp, Activity, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import TabSection from '@/components/TabSection';
import TextShareGrid from './components/TextShareGrid';
import TextAnalysisTab from '@/components/dashboard/TextAnalysisTab';
import TextAnalysisSkeleton from '@/components/dashboard/TextAnalysisSkeleton';
import TextShareDashboardSkeleton from '@/components/dashboard/TextShareDashboardSkeleton';
import CreateTextShareModal from '@/components/dashboard/CreateTextShareModal';
import ComingSoonFeatures from '@/components/dashboard/ComingSoonFeatures';
import Pagination from '@/components/Pagination';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { getData } from '@/lib/axios';
import UsageProgress from '@/components/dashboard/UsageProgress';
import useUsageStats from '@/hooks/useUsageStats';
import { useAuth } from '@/context/AuthContext';

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

export default function DashboardTextsPage() {
    const t = useTranslations('dashboard.texts');
    const usageT = useTranslations('dashboard.texts.usage');
    const { isAuthenticated } = useAuth();

    const [shares, setShares] = useState<TextShare[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views'>('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    // Use reusable usage stats hook
    const { usage, usageLoading, fetchUsageStats } = useUsageStats('textShares');

    // Combined refresh function for shares and usage
    const handleRefresh = useCallback(() => {
        fetchShares();
        fetchUsageStats();
    }, [fetchUsageStats]);

    const fetchShares = async () => {
        setIsLoading(true);
        try {
            const response = await getData(API_ENDPOINT.TEXT_SHARE_LIST);
            if (response.success) {
                // Fetch viewLogs for each share to populate analytics
                const sharesWithLogs = await Promise.all(
                    response.data.map(async (share: TextShare) => {
                        try {
                            const statsResponse = await getData(
                                API_ENDPOINT.TEXT_SHARE_STATS(share.shortKey)
                            );
                            if (statsResponse.success && statsResponse.data.recentViews) {
                                return {
                                    ...share,
                                    viewLogs: statsResponse.data.recentViews.map((view: any) => ({
                                        id: view.id || share.id,
                                        textShareId: share.id,
                                        ipAddress: view.ipAddress,
                                        country: view.country,
                                        countryCode: view.countryCode,
                                        userAgent: view.userAgent,
                                        accessedAt: view.accessedAt,
                                    })),
                                };
                            }
                            return share;
                        } catch (error) {
                            console.error(`Failed to fetch stats for ${share.shortKey}:`, error);
                            return share;
                        }
                    })
                );
                setShares(sharesWithLogs);
            }
        } catch (error) {
            console.error('Failed to fetch text shares:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleRefresh();
    }, [handleRefresh]);

    // Filter and sort shares
    const filteredShares = useMemo(() => {
        let filtered = shares.filter((share) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                share.shortKey?.toLowerCase().includes(searchLower) ||
                share.title?.toLowerCase().includes(searchLower) ||
                share.content.toLowerCase().includes(searchLower)
            );
        });

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            } else if (sortBy === 'oldest') {
                return new Date(a.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            } else if (sortBy === 'views') {
                return (b.viewCount || 0) - (a.viewCount || 0);
            }
            return 0;
        });

        return filtered;
    }, [shares, searchQuery, sortBy]);

    // Paginate shares
    const paginatedShares = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredShares.slice(startIndex, endIndex);
    }, [filteredShares, currentPage]);

    // Reset to page 1 when search or sort changes
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, sortBy]);

    const tabs = [
        {
            name: t('links'),
            value: 'links',
            icon: <FileText className="w-4 h-4" />,
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
                                    const options: ('newest' | 'oldest' | 'views')[] = ['newest', 'oldest', 'views'];
                                    const currentIndex = options.indexOf(sortBy);
                                    const nextIndex = (currentIndex + 1) % options.length;
                                    setSortBy(options[nextIndex]);
                                }}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    {sortBy === 'newest' ? 'Newest' : sortBy === 'oldest' ? 'Oldest' : 'Most Views'}
                                </span>
                            </Button>
                            <CreateTextShareModal
                                onRefresh={handleRefresh}
                                isDisabled={!!(usage && usage.limit !== -1 && usage.remaining <= 0)}
                                disabledReason="Text share creation limit reached"
                            />
                        </div>
                    </div>

                    {/* Shares Grid */}
                    <div className="min-h-[400px]">
                        {filteredShares.length === 0 ? (
                            <Card className="border-dashed border-2 bg-muted/20">
                                <div className="text-center py-16 px-4">
                                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {searchQuery ? 'No matches found' : t('noShares')}
                                    </h3>
                                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                        {searchQuery
                                            ? 'Try adjusting your search query'
                                            : t('createFirstShare')
                                        }
                                    </p>
                                    {!searchQuery && (
                                        <CreateTextShareModal
                                onRefresh={handleRefresh}
                                isDisabled={!!(usage && usage.limit !== -1 && usage.remaining <= 0)}
                                disabledReason="Text share creation limit reached"
                            />
                                    )}
                                </div>
                            </Card>
                        ) : (
                            <>
                                <TextShareGrid
                                    shares={paginatedShares}
                                    onRefresh={handleRefresh}
                                />
                                <Pagination
                                    currentPage={currentPage}
                                    totalItems={filteredShares.length}
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
            content: isLoading ? (
                <TextAnalysisSkeleton />
            ) : (
                <TextAnalysisTab shares={shares} />
            ),
        },
        {
            name: t('realtime'),
            value: 'realtime',
            icon: <Activity className="w-4 h-4" />,
            content: <ComingSoonFeatures />,
        },
    ];

    if (isLoading) {
        return <TextShareDashboardSkeleton />;
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
            {/* Header with Usage Stats - Side by Side */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <h1 className="text-2xl font-semibold">
                            {t('title')}
                        </h1>
                    </div>
                    <p className="text-muted-foreground">{t('subtitle')}</p>
                </div>

                {/* Usage Stats Card - Circular */}
                {!usageLoading && usage && (
                    <UsageProgress
                        current={usage.used}
                        limit={usage.limit}
                        label={usageT('textsUsed')}
                        variant="circular"
                        size="md"
                    />
                )}
            </div>

            {/* Upgrade/Login prompt when limit reached */}
            {!usageLoading && usage && usage.limit !== -1 && usage.remaining <= 0 && (
                <div className="mb-6 p-6 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-orange-500/5">
                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-red-500/10">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {t('limitTitle')}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {t('limitMessage', { limit: usage.limit })}
                                {isAuthenticated ? (
                                    <> {t('upgradeMessage.upgrade')} </>
                                ) : (
                                    <> {t('upgradeMessage.signup')} </>
                                )}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {!isAuthenticated ? (
                                    <>
                                        <Button
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                            onClick={() => window.location.href = '/signup'}
                                        >
                                            {t('signUpFree')}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => window.location.href = '/login'}
                                        >
                                            {t('login')}
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                        onClick={() => window.location.href = '/pricing'}
                                    >
                                        {t('upgradeMessage.upgrade')}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
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

            <TabSection
                defaultValue="links"
                tabs={tabs}
                listClassName="inline-flex p-1.5 bg-muted/50 rounded-[20px] mb-10 border border-border/40"
                triggerClassName="px-8 py-2.5 rounded-[14px] transition-all duration-300 font-semibold text-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-xl data-[state=active]:shadow-primary/5 text-muted-foreground hover:text-foreground flex items-center gap-2"
                contentWrapperClassName="w-full"
            />
        </div>
    );
}
