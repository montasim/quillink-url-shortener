'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { FileText, Search, SlidersHorizontal, Plus, TrendingUp, Eye, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import TabSection from '@/components/TabSection';
import TextShareGrid from './TextShareGrid';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { getData } from '@/lib/axios';

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
}

export default function DashboardTextsPage() {
    const t = useTranslations('textShare.dashboard');
    const router = useRouter();

    const [shares, setShares] = useState<TextShare[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views'>('newest');

    const fetchShares = async () => {
        setIsLoading(true);
        try {
            const response = await getData(API_ENDPOINT.TEXT_SHARE_LIST);
            if (response.success) {
                setShares(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch text shares:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchShares();
    }, []);

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
                return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
            } else if (sortBy === 'views') {
                return (b.viewCount || 0) - (a.viewCount || 0);
            }
            return 0;
        });

        return filtered;
    }, [shares, searchQuery, sortBy]);

    // Calculate stats
    const stats = useMemo(() => {
        const now = new Date();
        return {
            totalShares: shares.length,
            totalViews: shares.reduce((acc, share) => acc + (share.viewCount || 0), 0),
            activeShares: shares.filter(share => !share.expiresAt || new Date(share.expiresAt) > now).length,
        };
    }, [shares]);

    const tabs = [
        {
            name: t('links'),
            value: 'links',
            icon: <FileText className="w-4 h-4" />,
            content: isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : (
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
                            <Button
                                className="gap-2 h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                                onClick={() => router.push('/create')}
                            >
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">{t('newShare')}</span>
                            </Button>
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
                                        <Button
                                            onClick={() => router.push('/create')}
                                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            {t('newShare')}
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ) : (
                            <TextShareGrid
                                shares={filteredShares}
                                onRefresh={fetchShares}
                            />
                        )}
                    </div>
                </div>
            ),
        },
        {
            name: t('analysis'),
            value: 'analysis',
            icon: <TrendingUp className="w-4 h-4" />,
            content: (
                <div className="text-center py-12">
                    <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                        <TrendingUp className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground">Analytics for text shares will be available soon.</p>
                </div>
            ),
        },
        {
            name: t('realtime'),
            value: 'realtime',
            icon: <Activity className="w-4 h-4" />,
            content: (
                <div className="text-center py-12">
                    <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Activity className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground">Real-time stats will be available soon.</p>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('totalShares')}</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">{stats.totalShares}</p>
                        </div>
                        <div className="p-3 bg-blue-200 dark:bg-blue-800/50 rounded-xl">
                            <FileText className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">{t('totalViews')}</p>
                            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-1">{stats.totalViews}</p>
                        </div>
                        <div className="p-3 bg-purple-200 dark:bg-purple-800/50 rounded-xl">
                            <Eye className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-700 dark:text-green-300">Active Shares</p>
                            <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-1">{stats.activeShares}</p>
                        </div>
                        <div className="p-3 bg-green-200 dark:bg-green-800/50 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-green-700 dark:text-green-300" />
                        </div>
                    </div>
                </Card>
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
}
