'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';

const ViewsChart = dynamic(() => import('@/components/ViewsChart'), {
    ssr: false,
});

export default function DashboardPage() {
    return (
        <div className="space-y-6 max-w-screen-xl mx-auto 2xl:my-20 xl:my-16 lg:my-14 md:my-8 sm:my-6 my-4 px-4 xl:px-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Sink</h1>
                    <p className="text-sm text-muted-foreground">
                        Dashboard / Sink
                    </p>
                </div>
                <div className="flex gap-4">
                    <Badge variant="outline">Last 7 Days</Badge>
                    <Badge variant="secondary">Filter Links</Badge>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Visits', value: '1,549' },
                    { label: 'Visitors', value: '842' },
                    { label: 'Referrers', value: '32' },
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
                    <h2 className="text-lg font-medium mb-4">Views</h2>
                    <ViewsChart />
                </CardContent>
            </Card>

            {/* Location Map + Country List */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <Card className="xl:col-span-2">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-medium mb-4">Locations</h2>
                        <div className="h-60 bg-muted flex items-center justify-center rounded-md">
                            {/* Placeholder for Map */}
                            <p className="text-muted-foreground">
                                World Map Here
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <Tabs defaultValue="country" className="w-full">
                            <TabsList className="grid grid-cols-3">
                                <TabsTrigger value="country">
                                    Country
                                </TabsTrigger>
                                <TabsTrigger value="region">Region</TabsTrigger>
                                <TabsTrigger value="city">City</TabsTrigger>
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
                {['Referrer', 'Language', 'Device'].map((title) => (
                    <Card key={title}>
                        <CardContent className="p-6">
                            <Tabs defaultValue="main">
                                <TabsList className="grid grid-cols-2">
                                    <TabsTrigger value="main">
                                        {title}
                                    </TabsTrigger>
                                    <TabsTrigger value="details">
                                        Details
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
                                <TabsTrigger value="os">OS</TabsTrigger>
                                <TabsTrigger value="browser">
                                    Browser
                                </TabsTrigger>
                                <TabsTrigger value="type">Type</TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="os"
                                className="mt-4 text-muted-foreground text-sm"
                            >
                                <p>No data available.</p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-8">
                Sink © 2025 Products of HTML_ZONE
            </p>
        </div>
    );
}
