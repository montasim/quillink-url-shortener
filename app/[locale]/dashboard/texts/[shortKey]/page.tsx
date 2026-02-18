'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, FileText, Eye, Calendar, Clock, Lock, Link as LinkIcon, Copy, ExternalLink, Globe, Share2, TrendingUp, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import ViewsChart from '@/components/ViewsChart';
import QRCodeViewer from '@/components/QRCodeViewer';
import { toast } from 'sonner';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { getData } from '@/lib/axios';
import { format, startOfDay, subDays, eachDayOfInterval } from 'date-fns';

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
    syntaxLanguage?: string;
    viewCount: number;
    createdAt: string;
    expiresAt?: string;
    requiresPassword?: boolean;
    customSlug?: string;
    viewLogs?: TextViewLog[];
}

export default function TextShareSummaryPage() {
    const t = useTranslations('dashboard.texts');
    const params = useParams();
    const router = useRouter();
    const shortKey = params.shortKey as string;

    const [share, setShare] = useState<TextShare | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showQrPopover, setShowQrPopover] = useState(false);

    const fetchTextShare = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getData(API_ENDPOINT.TEXT_SHARE_GET(shortKey));
            if (response.success) {
                const statsResponse = await getData(API_ENDPOINT.TEXT_SHARE_STATS(shortKey));
                if (statsResponse.success && statsResponse.data.recentViews) {
                    setShare({
                        ...response.data,
                        viewLogs: statsResponse.data.recentViews.map((view: any) => ({
                            id: view.id || response.data.id,
                            textShareId: response.data.id,
                            ipAddress: view.ipAddress,
                            country: view.country,
                            countryCode: view.countryCode,
                            userAgent: view.userAgent,
                            accessedAt: view.accessedAt,
                        })),
                    });
                } else {
                    setShare(response.data);
                }
            } else {
                setError(response.message || t('errors.serverError'));
            }
        } catch (err: any) {
            setError(err.response?.data?.message || t('errors.serverError'));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTextShare();
    }, [shortKey]);

    // Chart data (last 7 days)
    const chartData = useMemo(() => {
        if (!share?.viewLogs) return [];

        const last7Days = eachDayOfInterval({
            start: subDays(new Date(), 6),
            end: new Date(),
        });

        return last7Days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            let dailyViews = 0;
            let dailyUniqueVisitors = new Set();

            (share.viewLogs || []).forEach(log => {
                const logDate = log.accessedAt ? format(new Date(log.accessedAt), 'yyyy-MM-dd') : '';
                if (logDate === dateStr) {
                    dailyViews++;
                    if (log.ipAddress) dailyUniqueVisitors.add(log.ipAddress);
                }
            });

            return {
                date: format(day, 'MMM dd'),
                visits: dailyViews,
                visitors: dailyUniqueVisitors.size
            };
        });
    }, [share?.viewLogs]);

    // Top locations
    const topLocations = useMemo(() => {
        if (!share?.viewLogs) return [];

        const locations: Record<string, { country: string; code: string; count: number }> = {};
        let totalCount = 0;

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

        return Object.values(locations)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(loc => ({
                country: loc.country,
                flag: getFlagEmoji(loc.code),
                views: loc.count,
                percentage: totalCount > 0 ? `${Math.round((loc.count / totalCount) * 100)}%` : '0%'
            }));
    }, [share?.viewLogs]);

    // Recent views
    const recentViews = useMemo(() => {
        if (!share?.viewLogs) return [];

        return (share.viewLogs || [])
            .sort((a, b) => new Date(b.accessedAt || 0).getTime() - new Date(a.accessedAt || 0).getTime())
            .slice(0, 10);
    }, [share?.viewLogs]);

    const handleCopyLink = async () => {
        if (!share) return;
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/texts/${share.shortKey}`;
        try {
            await navigator.clipboard.writeText(url);
            toast.success(t('linkCopiedAlert') || 'Link copied!');
        } catch {
            toast.error('Failed to copy link');
        }
    };

    const handleView = () => {
        if (!share) return;
        window.open(`/texts/${share.shortKey}`, '_blank', 'noopener,noreferrer');
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
                {/* Back Button & Header Skeleton */}
                <div className="mb-8 space-y-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-5 w-96" />
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-8 w-16" />
                                </div>
                                <Skeleton className="h-12 w-12 rounded-xl" />
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Chart Skeleton */}
                <Card className="mb-8">
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>

                {/* Location & Recent Views Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (error || !share) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/dashboard/texts')}
                    className="mb-4 gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('back') || 'Back'}
                </Button>
                <Card className="p-8 text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        {error || t('errors.notFound')}
                    </h2>
                    <Button onClick={() => router.push('/dashboard/texts')}>
                        {t('backToDashboard') || 'Back to Dashboard'}
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
            {/* Header */}
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/dashboard/texts')}
                    className="mb-4 gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('back') || 'Back'}
                </Button>

                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{share.title || share.shortKey}</h1>
                            {share.customSlug && (
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                                    <LinkIcon className="w-3 h-3 mr-1" />
                                    {t('customSlug') || 'Custom URL'}
                                </Badge>
                            )}
                            {share.requiresPassword && (
                                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                                    <Lock className="w-3 h-3 mr-1" />
                                    {t('protected') || 'Protected'}
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {t('createdAt') || 'Created'}: {new Date(share.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-2">
                            <Copy className="w-4 h-4" />
                            {t('copyLink') || 'Copy Link'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleView} className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            {t('viewShare') || 'View'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setShowQrPopover(true)} className="gap-2">
                            <QrCode className="w-4 h-4" />
                            {t('qrCode') || 'QR Code'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('totalViews')}</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">{share.viewCount || 0}</p>
                        </div>
                        <div className="p-3 bg-blue-200/50 dark:bg-blue-800/50 rounded-xl">
                            <Eye className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">{t('format')}</p>
                            <p className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1 capitalize">{share.format}</p>
                            {share.syntaxLanguage && (
                                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">{share.syntaxLanguage}</p>
                            )}
                        </div>
                        <div className="p-3 bg-purple-200/50 dark:bg-purple-800/50 rounded-xl">
                            <FileText className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-700 dark:text-green-300">{t('expiresAt')}</p>
                            <p className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">
                                {share.expiresAt ? new Date(share.expiresAt).toLocaleDateString() : t('neverExpires')}
                            </p>
                        </div>
                        <div className="p-3 bg-green-200/50 dark:bg-green-800/50 rounded-xl">
                            <Clock className="w-6 h-6 text-green-700 dark:text-green-300" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Traffic Overview Chart */}
            <Card className="border-none shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm overflow-hidden rounded-[32px] mb-8">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">{t('overallTraffic')}</CardTitle>
                            <p className="text-sm text-muted-foreground">{t('overallTrafficDesc')}</p>
                        </div>
                        <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                            {t('last7Days')}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="h-[300px] w-full">
                        <ViewsChart data={chartData} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Traffic by Country */}
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
                                {topLocations.length > 0 ? topLocations.map((loc, i) => (
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
                                )) : (
                                    <p className="text-center text-muted-foreground py-10 italic">{t('noDataYet')}</p>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Recent Views */}
                <Card className="border-border/50 rounded-[32px] overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg">
                            <Share2 className="w-5 h-5 text-primary" />
                            {t('recentViews')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[220px] pr-4">
                            <div className="space-y-4">
                                {recentViews.length > 0 ? recentViews.map((view, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="font-medium">
                                                {view.country || t('unknown') || 'Unknown'}
                                            </span>
                                        </div>
                                        <span className="text-muted-foreground">
                                            {new Date(view.accessedAt || 0).toLocaleString()}
                                        </span>
                                    </div>
                                )) : (
                                    <p className="text-center text-muted-foreground py-10 italic">{t('noDataYet')}</p>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* QR Code Viewer */}
            <QRCodeViewer
                shortKey={shortKey}
                type="text"
                isOpen={showQrPopover}
                onClose={() => setShowQrPopover(false)}
            />
        </div>
    );
}

function getFlagEmoji(countryCode: string) {
    if (!countryCode || countryCode === '??') return '🏳️';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}
