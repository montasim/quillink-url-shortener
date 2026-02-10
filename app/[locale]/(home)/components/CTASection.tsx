'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

const CTASection = () => {
    const t = useTranslations('home.cta');

    return (
        <section className="py-32 px-6 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[48px] bg-gradient-to-br from-primary/[0.05] to-secondary/[0.05] p-12 md:p-24 overflow-hidden border border-border shadow-2xl shadow-primary/5">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="max-w-3xl mx-auto text-center relative z-10">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-bold text-sm mb-8 tracking-wider uppercase">
                            {t('badge')}
                        </Badge>

                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
                            {t('headingPart1')}<span className="text-primary italic">{t('headingHighlight')}</span>{t('headingPart2')}
                        </h2>

                        <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-12 leading-relaxed">
                            {t('subheading')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/95 font-black px-12 h-16 rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group text-lg"
                                asChild
                            >
                                <Link href="/signup">
                                    {t('startButton')}
                                    <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-background border-2 border-border text-foreground hover:bg-muted font-bold px-12 h-16 rounded-2xl transition-all text-lg"
                                asChild
                            >
                                <Link href="/contact-us">
                                    {t('contactButton')}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
