'use client';

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

import { useTranslations } from 'next-intl';

const FAQSection = () => {
    const t = useTranslations('home.faq');

    const faqKeys = [
        'whatIs', 'howWork', 'isFree', 'canTrack',
        'customDomain', 'howLong', 'limit', 'safe'
    ];

    const half = Math.ceil(faqKeys.length / 2);
    const leftFaqKeys = faqKeys.slice(0, half);
    const rightFaqKeys = faqKeys.slice(half);

    return (
        <section className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6">
                        {t('badge')}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        {t('heading')}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t('subheading')}
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 items-start">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {leftFaqKeys.map((key, index) => (
                            <AccordionItem
                                key={index}
                                value={`left-item-${index}`}
                                className="border border-border last:border-b rounded-2xl px-6 bg-card hover:shadow-md transition-shadow"
                            >
                                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                                    {t(`questions.${key}.q`)}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                    {t(`questions.${key}.a`)}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {rightFaqKeys.map((key, index) => (
                            <AccordionItem
                                key={index}
                                value={`right-item-${index}`}
                                className="border border-border last:border-b rounded-2xl px-6 bg-card hover:shadow-md transition-shadow"
                            >
                                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                                    {t(`questions.${key}.q`)}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                    {t(`questions.${key}.a`)}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Contact CTA */}
                <div className="mt-32 relative overflow-hidden p-12 md:p-20 rounded-[48px] bg-gradient-to-br from-primary/[0.05] to-secondary/[0.05] text-foreground border border-border shadow-2xl shadow-primary/5 group">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-primary/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight">
                            {t('cta.headingPart1')}<span className="text-primary italic">{t('cta.headingHighlight')}</span>{t('cta.headingPart2')}
                        </h3>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl font-medium leading-relaxed">
                            {t('cta.subheading')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Button
                                size="lg"
                                className="h-16 px-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/95 shadow-2xl shadow-primary/20 transition-all font-black text-lg active:scale-95"
                                asChild
                            >
                                <Link href="/contact-us">
                                    {t('cta.getInTouch')}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 px-12 rounded-2xl border-2 border-border bg-background text-foreground hover:bg-muted font-black text-lg transition-all shadow-xl"
                                asChild
                            >
                                <a href="mailto:montasimmamun@gmail.com">
                                    {t('cta.emailSupport')}
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default FAQSection;
