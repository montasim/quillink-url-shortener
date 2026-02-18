'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Link as LinkIcon, Eye, Calendar, Clock, Copy, ExternalLink, Globe, Share2, TrendingUp, QrCode, Activity, Zap, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import ViewsChart from '@/components/ViewsChart';
import QRCodeViewer from '@/components/QRCodeViewer';
import { toast } from 'sonner';
import { fetchUrlDetails } from '@/app/[locale]/dashboard/urls/actions';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { motion } from 'motion/react';

interface ClickLog {
    id: string;
    shortUrlId: string;
    ipAddress?: string;
    country?: string;
    countryCode?: string;
    userAgent?: string;
    browser?: string;
    os?: string;
    device?: string;
    referer?: string;
    createdAt?: string;
}

interface ShortUrl {
    id: string;
    shortKey: string;
    originalUrl: string;
    clicks: number;
    createdAt: string;
    expiresAt?: string;
    customSlug?: string;
    clickLogs?: ClickLog[];
}

export default function UrlSummaryPage() {
    const t = useTranslations('dashboard.urls');
    const params = useParams();
    const router = useRouter();
    const shortKey = params.shortKey as string;

    const [url, setUrl] = useState<ShortUrl | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showQrPopover, setShowQrPopover] = useState(false);

    const fetchUrlData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fetchUrlDetails(shortKey);
            if (result.success && result.data) {
                setUrl(result.data);
            } else {
                setError(result.error || t('errors.serverError'));
            }
        } catch (err: any) {
            setError(err.message || t('errors.serverError'));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUrlData();
    }, [shortKey]);

    // Chart data (last 7 days)
    const chartData = useMemo(() => {
        if (!url?.clickLogs) return [];

        const last7Days = eachDayOfInterval({
            start: subDays(new Date(), 6),
            end: new Date(),
        });

        return last7Days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            let dailyClicks = 0;
            let dailyUniqueVisitors = new Set();

            (url.clickLogs || []).forEach(log => {
                const logDate = log.createdAt ? format(new Date(log.createdAt), 'yyyy-MM-dd') : '';
                if (logDate === dateStr) {
                    dailyClicks++;
                    if (log.ipAddress) dailyUniqueVisitors.add(log.ipAddress);
                }
            });

            return {
                date: format(day, 'MMM dd'),
                visits: dailyClicks,
                visitors: dailyUniqueVisitors.size
            };
        });
    }, [url?.clickLogs]);

    // Top locations
    const topLocations = useMemo(() => {
        if (!url?.clickLogs) return [];

        const locations: Record<string, { country: string; code: string; count: number }> = {};
        let totalCount = 0;

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

        return Object.values(locations)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(loc => ({
                country: loc.country,
                flag: getFlagEmoji(loc.code),
                views: loc.count,
                percentage: totalCount > 0 ? `${Math.round((loc.count / totalCount) * 100)}%` : '0%'
            }));
    }, [url?.clickLogs]);

    // Recent clicks
    const recentClicks = useMemo(() => {
        if (!url?.clickLogs) return [];

        return (url.clickLogs || [])
            .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
            .slice(0, 10);
    }, [url?.clickLogs]);

    const handleCopyShortLink = async () => {
        if (!url) return;
        const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortKey}`;
        try {
            await navigator.clipboard.writeText(shortUrl);
            toast.success(t('copiedToClipboard') || 'Link copied!');
        } catch {
            toast.error('Failed to copy link');
        }
    };

    const handleVisit = () => {
        if (!url) return;
        window.open(url.originalUrl, '_blank', 'noopener,noreferrer');
    };

    const getDomain = (urlString: string) => {
        try {
            const urlObj = new URL(urlString);
            return urlObj.hostname.replace('www.', '');
        } catch {
            return 'Invalid URL';
        }
    };

    // Check if there's no analytics data
    const hasNoData = chartData.length === 0 && topLocations.length === 0 && recentClicks.length === 0;

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

                {/* Location & Recent Clicks Skeleton */}
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

    if (error || !url) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/dashboard/urls')}
                    className="mb-4 gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('back') || 'Back'}
                </Button>
                <Card className="p-8 text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        {error || t('errors.notFound')}
                    </h2>
                    <Button onClick={() => router.push('/dashboard/urls')}>
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
                    onClick={() => router.push('/dashboard/urls')}
                    className="mb-4 gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('back') || 'Back'}
                </Button>

                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{url.shortKey}</h1>
                            {url.customSlug && (
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                                    <LinkIcon className="w-3 h-3 mr-1" />
                                    {t('customSlug') || 'Custom URL'}
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {t('createdAt') || 'Created'}: {new Date(url.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                        <p className="text-muted-foreground flex items-center gap-2 mt-1">
                            <ExternalLink className="w-4 h-4" />
                            {getDomain(url.originalUrl)}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopyShortLink} className="gap-2">
                            <Copy className="w-4 h-4" />
                            {t('copyShortLink') || 'Copy Link'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleVisit} className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            {t('visitUrl') || 'Visit'}
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
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('totalClicks')}</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">{url.clicks || 0}</p>
                        </div>
                        <div className="p-3 bg-blue-200/50 dark:bg-blue-800/50 rounded-xl">
                            <Eye className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">{t('originalDomain')}</p>
                            <p className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1 truncate max-w-[150px]">
                                {getDomain(url.originalUrl)}
                            </p>
                        </div>
                        <div className="p-3 bg-purple-200/50 dark:bg-purple-800/50 rounded-xl">
                            <LinkIcon className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-700 dark:text-green-300">{t('expiresAt')}</p>
                            <p className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">
                                {url.expiresAt ? new Date(url.expiresAt).toLocaleDateString() : t('neverExpires') || 'Never'}
                            </p>
                        </div>
                        <div className="p-3 bg-green-200/50 dark:bg-green-800/50 rounded-xl">
                            <Clock className="w-6 h-6 text-green-700 dark:text-green-300" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Traffic Overview */}
            {hasNoData ? (
                <div className="relative w-full py-16 md:py-24 overflow-hidden rounded-[32px] border border-border/40 bg-card/30 backdrop-blur-sm mb-8">
                    {/* Background Aesthetics */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>

                    <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1.5 mb-8 hover:bg-primary/15 transition-colors cursor-default">
                                <Sparkles className="w-3.5 h-3.5 mr-2" />
                                Analytics Data
                            </Badge>

                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                                No analytics data yet
                            </h2>
                            <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                                Start sharing your short link to see detailed analytics. Clicks, locations, and visitor data will appear here as people interact with your link.
                            </p>

                            {/* Mock Analysis Stream Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                {[
                                    { label: 'Click Tracking', icon: <Activity className="w-5 h-5" />, color: 'bg-emerald-500/10 text-emerald-500' },
                                    { label: 'Location Data', icon: <Globe className="w-5 h-5" />, color: 'bg-blue-500/10 text-blue-500' },
                                ].map((item, i) => (
                                    <Card key={i} className="border-border/60 bg-background/50 backdrop-blur-md rounded-[24px] overflow-hidden group hover:border-primary/30 transition-all duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4 mb-5">
                                                <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                                                    {item.icon}
                                                </div>
                                                <span className="font-bold text-foreground">{item.label}</span>
                                            </div>
                                            <div className="space-y-3 opacity-30">
                                                <div className="h-2 w-full bg-muted rounded-full"></div>
                                                <div className="h-2 w-3/4 bg-muted rounded-full"></div>
                                                <div className="h-2 w-1/2 bg-muted rounded-full"></div>
                                            </div>
                                            <div className="mt-6 flex justify-between items-center opacity-20">
                                                <div className="h-8 w-20 bg-muted rounded-lg"></div>
                                                <div className="h-4 w-12 bg-muted rounded-full"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="mt-16 flex flex-col items-center gap-4">
                                <div className="flex items-center gap-3 px-5 py-2.5 bg-background/50 border border-border/50 rounded-full text-sm font-semibold text-primary shadow-sm">
                                    <Loader2 className="w-4 h-4" />
                                    Waiting for first clicks
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <>
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
                                    {t('trafficByLocation')}
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

                        {/* Recent Clicks */}
                        <Card className="border-border/50 rounded-[32px] overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <Share2 className="w-5 h-5 text-primary" />
                                    {t('recentClicks') || 'Recent Clicks'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[220px] pr-4">
                                    <div className="space-y-4">
                                        {recentClicks.length > 0 ? recentClicks.map((click, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                    <span className="font-medium">
                                                        {click.country || t('unknown') || 'Unknown'}
                                                    </span>
                                                </div>
                                                <span className="text-muted-foreground">
                                                    {new Date(click.createdAt || 0).toLocaleString()}
                                                </span>
                                            </div>
                                        )) : (
                                            <p className="text-center text-muted-foreground py-10 italic">{t('noClickLogs') || 'No clicks recorded yet'}</p>
                                        )}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}

            {/* QR Code Viewer */}
            <QRCodeViewer
                shortKey={shortKey}
                type="url"
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
