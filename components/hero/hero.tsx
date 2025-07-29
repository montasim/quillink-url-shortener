'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link as LinkIcon, QrCode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { handleCreate } from '@/app/(home)/actions';
import TabSection from '@/components/TabSection';
import ComingSoon from '@/components/ComingSoon';

const Hero = () => {
    const router = useRouter();
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

                    <p className="mt-4 text-sm text-left text-secondary">
                        By clicking Shorten URL, you are agree to
                        QuilLink&lsquo;s
                        <Link href="#" className="ml-1 underline">
                            Terms of use
                        </Link>
                        ,
                        <Link href="#" className="ml-1 underline">
                            Privacy Policy
                        </Link>
                        , and
                        <Link href="#" className="ml-1 underline">
                            Cookie Policy
                        </Link>
                    </p>

                    <Button
                        className="mt-6 w-full cursor-pointer bg-gradient-to-r from-gray-100 to-gray-300 text-secondary"
                        onClick={() =>
                            handleCreate(
                                formData,
                                setCreating,
                                setFormData,
                                router
                            )
                        }
                        disabled={creating}
                    >
                        {creating ? 'Creating...' : 'Create short URL'}
                    </Button>
                </>
            ),
        },
        {
            name: 'QR Code',
            icon: <QrCode />,
            value: 'qr_code',
            content: <ComingSoon text="QR code coming soon..." />,
        },
    ];

    return (
        <div className="relative 2xl:mt-40 xl:mt-36 lg:mt-36 md:mt-28 sm:mt-20 mt-16 flex items-center justify-center px-6 overflow-hidden">
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
                <Badge className="bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full py-1 border-none">
                    Just released v1.0.0
                </Badge>
                <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold !leading-[1.2] tracking-tight text-primary">
                    Make every connection count
                </h1>
                <p className="mt-4 text-secondary text-[17px] md:text-lg">
                    Create short links, QR codes, share them anywhere. Track
                    what&lsquo;s working, and what&lsquo;s not. All inside the
                    QuilLink Connection Platform.
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <TabSection
                        defaultValue="short_link"
                        tabs={tabs}
                        listClassName="w-full p-0 bg-background justify-start border-b rounded-none"
                        triggerClassName="rounded-none h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background data-[state=active]:bg-gradient-to-r from-gray-100 to-gray-300 -mb-[2px] rounded-t cursor-pointer text-secondary"
                        contentWrapperClassName="w-full mt-4"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
