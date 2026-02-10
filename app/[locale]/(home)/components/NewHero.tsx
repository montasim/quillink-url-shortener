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
        <section className="relative py-24 md:py-40 px-6 overflow-hidden bg-background">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Badge */}
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm backdrop-blur-sm transition-all">
                    ✨ Free URL Shortener
                </Badge>

                {/* Main Heading */}
                <h1 className="mt-8 text-4xl md:text-5xl font-extrabold !leading-[1.1] tracking-tight text-foreground">
                    Make every <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[size:200%_auto] bg-clip-text text-transparent animate-[shine_5s_linear_infinite]">connection</span> count
                </h1>

                {/* Subheading */}
                <p className="mt-10 text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
                    Create short, memorable links in seconds. Track clicks, analyze performance, and share anywhere with QuilLink&apos;s powerful URL shortener.
                </p>

                {/* URL Input Form */}
                <form onSubmit={onSubmit} className="mt-14 max-w-3xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4 p-3 bg-card/50 backdrop-blur-xl rounded-3xl border border-border/60 shadow-2xl shadow-primary/5 ring-1 ring-border/50">
                        <div className="flex-1 flex items-center gap-4 px-5 py-2">
                            <LinkIcon className="w-6 h-6 text-primary flex-shrink-0" />
                            <Input
                                type="url"
                                placeholder="Enter your long URL here..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg h-12 px-0 bg-transparent font-medium placeholder:text-muted-foreground/50"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={!url || creating}
                            className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-10 h-16 rounded-[20px] shadow-2xl shadow-primary/20 transition-all group relative overflow-hidden active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {creating ? 'Creating...' : 'Shorten URL'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </Button>
                    </div>
                    <p className="mt-6 text-sm text-muted-foreground/60 font-medium">
                        By shortening a URL, you agree to our{' '}
                        <Link href="/terms" className="text-primary hover:underline transition-colors decoration-2 underline-offset-4">
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-primary hover:underline transition-colors decoration-2 underline-offset-4">
                            Privacy Policy
                        </Link>
                    </p>
                </form>

                {/* Stats */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
                    {[
                        { label: 'Links Created', value: '10M+' },
                        { label: 'Active Users', value: '500K+' },
                        { label: 'Uptime', value: '99.9%' },
                        { label: 'Support', value: '24/7' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                                {stat.value}
                            </div>
                            <div className="mt-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewHero;
