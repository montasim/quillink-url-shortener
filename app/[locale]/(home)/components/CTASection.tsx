'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Users, Target, LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

interface ButtonConfig {
    text: string;
    href: string;
}

interface CTASectionProps {
    translationKey?: string;
    // Props for custom content mode
    icon?: LucideIcon;
    iconRotation?: boolean;
    title?: string;
    titleEmphasis?: string;
    description?: string;
    primaryButton?: ButtonConfig;
    secondaryButton?: ButtonConfig;
    className?: string;
}

const CTASection = ({
    translationKey = 'cta',
    icon: Icon,
    iconRotation = false,
    title,
    titleEmphasis,
    description,
    primaryButton,
    secondaryButton,
    className,
}: CTASectionProps) => {
    const hasCustomContent = !!(title || primaryButton);

    // Check if this is a FAQ CTA (nested structure) or main CTA (flat structure)
    // Handle both old and new nested translation key structures
    const isFaqCta = translationKey.endsWith('.faq') || translationKey.endsWith('faq') || translationKey === 'faq' || translationKey === 'textShareFaq' || translationKey === 'urls.faq';
    const t = useTranslations(`home.${translationKey}${isFaqCta ? '.cta' : ''}`);

    return (
        <div className={`relative overflow-hidden p-12 md:p-20 rounded-[48px] bg-gradient-to-br from-primary/[0.05] to-secondary/[0.05] text-foreground border border-border shadow-2xl shadow-primary/5 max-w-5xl mx-auto group ${className || 'my-32'}`}>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 text-center">
                {hasCustomContent && Icon && (
                    <div className={`w-20 h-20 bg-primary/10 backdrop-blur-xl rounded-[28px] flex items-center justify-center mx-auto mb-10 border border-primary/20 shadow-2xl transition-all duration-500 ${iconRotation ? 'group-hover:scale-110 group-hover:rotate-6' : ''}`}>
                        <Icon className="w-10 h-10 text-primary" />
                    </div>
                )}

                {hasCustomContent ? (
                    <>
                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8 tracking-tight">
                            {title}<span className="text-primary italic">{titleEmphasis}</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            {primaryButton && (
                                <Link
                                    href={primaryButton.href}
                                    className="inline-flex items-center justify-center rounded-2xl text-xl font-black transition-all bg-primary text-primary-foreground hover:bg-primary/95 h-16 px-12 shadow-2xl active:scale-95"
                                >
                                    {primaryButton.text}
                                </Link>
                            )}
                            {secondaryButton && (
                                <Link
                                    href={secondaryButton.href}
                                    className="inline-flex items-center justify-center rounded-2xl text-xl font-black transition-all bg-background border-2 border-border text-foreground hover:bg-muted h-16 px-12 shadow-xl active:scale-95"
                                >
                                    {secondaryButton.text}
                                </Link>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-bold text-sm mb-8 tracking-wider uppercase">
                            {t('badge')}
                        </Badge>

                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
                            {t('headingPrefix')}<span className="text-primary italic">{t('headingEmphasis')}</span>{t('headingSuffix')}
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
                                <Link href="/contact-us">
                                    {t('getInTouch')}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-background border-2 border-border text-foreground hover:bg-muted font-bold px-12 h-16 rounded-2xl transition-all text-lg"
                                asChild
                            >
                                <a href="mailto:montasimmamun@gmail.com">
                                    {t('emailSupport')}
                                </a>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CTASection;
