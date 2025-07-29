'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const ViewsChart = dynamic(() => import('@/components/ViewsChart'), {
    ssr: false,
});

export default function DashboardPage() {
    const t = useTranslations('dashboard');

    return (
        <div className="space-y-6 max-w-screen-xl mx-auto 2xl:my-20 xl:my-16 lg:my-14 md:my-8 sm:my-6 my-4 px-4 xl:px-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{t('sink')}</h1>
                    <p className="text-sm text-muted-foreground">
                        {t('title')} / {t('sink')}
                    </p>
                </div>
                <div className="flex gap-4">
                    <Badge variant="outline">{t('last7Days')}</Badge>
                    <Badge variant="secondary">{t('filterLinks')}</Badge>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: t('visits'), value: '1,549' },
                    { label: t('visitors'), value: '842' },
                    { label: t('referrers'), value: '32' },
                ].map(({ label, value }) => (
                    <Card key={label}>
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">
                                {label}
                            </p>
                            <h2 className="text-2xl font-bold">{value}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Views Chart */}
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">{t('views')}</h2>
                    <ViewsChart />
                </CardContent>
            </Card>

            {/* Location Map + Country List */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <Card className="xl:col-span-2">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-medium mb-4">
                            {t('locations')}
                        </h2>
                        <div className="h-60 bg-muted flex items-center justify-center rounded-md">
                            {/* Placeholder for Map */}
                            <p className="text-muted-foreground">
                                {t('worldMapHere')}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <Tabs defaultValue="country" className="w-full">
                            <TabsList className="grid grid-cols-3">
                                <TabsTrigger value="country">
                                    {t('country')}
                                </TabsTrigger>
                                <TabsTrigger value="region">
                                    {t('region')}
                                </TabsTrigger>
                                <TabsTrigger value="city">
                                    {t('city')}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="country">
                                <ScrollArea className="h-56 mt-4">
                                    {[
                                        { name: 'United States', count: 743 },
                                        { name: 'China', count: 149 },
                                        { name: 'Japan', count: 141 },
                                        { name: 'France', count: 90 },
                                        { name: 'Germany', count: 80 },
                                    ].map((item) => (
                                        <div
                                            key={item.name}
                                            className="flex justify-between py-1"
                                        >
                                            <span>{item.name}</span>
                                            <span className="text-muted-foreground">
                                                {item.count}
                                            </span>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Referer, Language, Device */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[t('referrer'), t('language'), t('device')].map((title) => (
                    <Card key={title}>
                        <CardContent className="p-6">
                            <Tabs defaultValue="main">
                                <TabsList className="grid grid-cols-2">
                                    <TabsTrigger value="main">
                                        {title}
                                    </TabsTrigger>
                                    <TabsTrigger value="details">
                                        {t('details')}
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="main"
                                    className="mt-4 space-y-2"
                                >
                                    {[
                                        'None',
                                        't.co',
                                        'qq.com',
                                        'link.cool',
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between"
                                        >
                                            <span>{item}</span>
                                            <span className="text-muted-foreground">
                                                {Math.floor(
                                                    Math.random() * 100
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* OS/Browser Section Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <Tabs defaultValue="os">
                            <TabsList className="grid grid-cols-3">
                                <TabsTrigger value="os">{t('os')}</TabsTrigger>
                                <TabsTrigger value="browser">
                                    {t('browser')}
                                </TabsTrigger>
                                <TabsTrigger value="type">
                                    {t('type')}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="os"
                                className="mt-4 text-muted-foreground text-sm"
                            >
                                <p>{t('noDataAvailable')}</p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-8">
                {t('footerText')}
            </p>
        </div>
    );
}
