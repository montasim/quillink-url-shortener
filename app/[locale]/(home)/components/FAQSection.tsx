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

interface FAQSectionProps {
    translationKey?: string;
}

const FAQSection = ({ translationKey = 'urls.faq' }: FAQSectionProps) => {
    // Support both nested (urls.faq) and flat (faq) structures
    const t = useTranslations(`home.${translationKey}`);

    // Different FAQ keys for URL shortener vs text sharing vs QR generator
    // Support both old and new nested translation key structures
    const isTextShareFaq = translationKey === 'textShareFaq' || translationKey === 'texts.faq';
    const isQrFaq = translationKey === 'qrFaq' || translationKey === 'qr.faq';
    const isUrlsFaq = translationKey === 'urls.faq';

    const faqKeys = isTextShareFaq
        ? ['whatIs', 'howWork', 'isFree', 'passwordProtect', 'expiration', 'howLong', 'limit', 'secure']
        : isQrFaq
        ? ['whatIs', 'howWork', 'isFree', 'safe', 'expire', 'scan', 'formats', 'errorCorrection']
        : isUrlsFaq
        ? ['whatIs', 'howWork', 'isFree', 'canTrack', 'customDomain', 'howLong', 'limit', 'safe']
        : ['whatIs', 'howWork', 'isFree', 'canTrack', 'customDomain', 'howLong', 'limit', 'safe'];

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
                                    {t(`questions.${key}.question`)}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                    {t(`questions.${key}.answer`)}
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
                                    {t(`questions.${key}.question`)}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                    {t(`questions.${key}.answer`)}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
