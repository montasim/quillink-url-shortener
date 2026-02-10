'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link as LinkIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { handleCreate } from '@/lib/actions/home';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ShortenUrlSchema } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

const NewHero = () => {
    const router = useRouter();
    const [creating, setCreating] = useState(false);
    const [url, setUrl] = useState('');

    const form = useForm<z.infer<typeof ShortenUrlSchema>>({
        mode: 'onChange',
        defaultValues: {
            originalUrl: '',
        },
        resolver: zodResolver(ShortenUrlSchema),
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        await handleCreate({ originalUrl: url }, setCreating, router);
    };

    return (
        <section className="relative py-20 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-background to-muted/30">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Badge */}
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm">
                    ✨ Free URL Shortener
                </Badge>

                {/* Main Heading */}
                <h1 className="mt-8 text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold !leading-[1.05] tracking-tight text-foreground">
                    Make every connection count
                </h1>

                {/* Subheading */}
                <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Create short, memorable links in seconds. Track clicks, analyze performance, and share anywhere with QuilLink's powerful URL shortener.
                </p>

                {/* URL Input Form */}
                <form onSubmit={onSubmit} className="mt-12 max-w-2xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl border border-border shadow-xl shadow-black/5">
                        <div className="flex-1 flex items-center gap-3 px-4 py-1">
                            <LinkIcon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            <Input
                                type="url"
                                placeholder="Enter your long URL here..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-12 px-0 bg-transparent"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={!url || creating}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14 rounded-xl shadow-lg shadow-primary/25 transition-all group"
                        >
                            {creating ? 'Creating...' : 'Shorten URL'}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                        By shortening a URL, you agree to our{' '}
                        <Link href="/terms" className="underline hover:text-foreground transition-colors">
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="underline hover:text-foreground transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </form>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-foreground">10M+</div>
                        <div className="mt-2 text-sm text-muted-foreground">Links Created</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-foreground">500K+</div>
                        <div className="mt-2 text-sm text-muted-foreground">Active Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-foreground">99.9%</div>
                        <div className="mt-2 text-sm text-muted-foreground">Uptime</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-foreground">24/7</div>
                        <div className="mt-2 text-sm text-muted-foreground">Support</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewHero;
