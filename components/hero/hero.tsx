'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link as LinkIcon, QrCode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { IShortUrl } from '@/app/data/types';
import { handleCreate } from '@/app/(home)/actions';

const Hero = () => {
    const router = useRouter();
    const [urls, setUrls] = useState<IShortUrl[]>([]);
    const [formData, setFormData] = useState({
        originalUrl: '',
        expiresAt: '',
        customKey: '',
    });
    const [creating, setCreating] = useState(false);

    const tabs = [
        {
            name: 'Short Link',
            icon: <LinkIcon />,
            value: 'short_link',
            content: (
                <>
                    <div className="w-full">
                        <Label htmlFor="originalUrl">Paste a long URL</Label>{' '}
                        <Input
                            id="originalUrl"
                            type="url"
                            placeholder="https://example.com/super-long-link-dot-com"
                            className="mt-2"
                            value={formData.originalUrl}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    originalUrl: e.target.value,
                                })
                            }
                        />
                    </div>

                    <p className="mt-4 text-sm text-left">
                        By clicking Shorten URL, you are agree to QuilLink's
                        <Link
                            href="#"
                            className="ml-1 underline text-muted-foreground"
                        >
                            Terms of use
                        </Link>
                        ,
                        <Link
                            href="#"
                            className="ml-1 underline text-muted-foreground"
                        >
                            Privacy Policy
                        </Link>
                        , and
                        <Link
                            href="#"
                            className="ml-1 underline text-muted-foreground"
                        >
                            Cookie Policy
                        </Link>
                    </p>

                    <Button
                        className="mt-6 w-full"
                        onClick={() =>
                            handleCreate(
                                formData,
                                setCreating,
                                setUrls,
                                setFormData,
                                router
                            )
                        }
                        disabled={creating}
                    >
                        {creating ? 'Creating...' : 'Shorten URL'}
                    </Button>
                </>
            ),
        },
        {
            name: 'QR Code',
            icon: <QrCode />,
            value: 'qr_code',
            content: 'Coming soon!',
        },
    ];

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                className={cn(
                    '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
                    'inset-x-0 h-full skew-y-12'
                )}
            />

            <div className="relative z-10 text-center max-w-2xl">
                <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
                    Just released v1.0.0
                </Badge>
                <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold !leading-[1.2] tracking-tight">
                    Make every connection count
                </h1>
                <p className="mt-4 text-[17px] md:text-lg">
                    Create short links, QR codes, share them anywhere. Track
                    what's working, and what's not. All inside the QuilLink
                    Connection Platform.
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <Tabs defaultValue={tabs[0].value} className="w-full">
                        <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px] rounded-t"
                                >
                                    <code className="flex items-center gap-2 text-[13px]">
                                        {tab.icon} {tab.name}
                                    </code>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {tabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value}>
                                <div className="w-full mt-4">{tab.content}</div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Hero;
