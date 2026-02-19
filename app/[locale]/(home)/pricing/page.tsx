'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Star } from 'lucide-react';
import Link from 'next/link';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import { MessageSquare } from 'lucide-react';

const PricingPage = () => {
    const t = useTranslations('home.pricing');

    const tiers = [
        {
            name: t('tiers.guest.name'),
            price: t('tiers.guest.price'),
            description: t('tiers.guest.description'),
            features: [
                { text: t('tiers.guest.features.urlLimit'), included: true },
                { text: t('tiers.guest.features.textLimit'), included: true },
                { text: t('tiers.guest.features.basicAnalytics'), included: true },
                { text: t('tiers.guest.features.qrCodes'), included: true },
                { text: t('tiers.guest.features.customSlugs'), included: true },
                { text: t('tiers.guest.features.passwordProtection'), included: false },
                { text: t('tiers.guest.features.linkExpiration'), included: false },
                { text: t('tiers.guest.features.apiAccess'), included: false },
                { text: t('tiers.guest.features.prioritySupport'), included: false },
            ],
            cta: t('tiers.guest.cta'),
            popular: false,
        },
        {
            name: t('tiers.registered.name'),
            price: t('tiers.registered.price'),
            description: t('tiers.registered.description'),
            features: [
                { text: t('tiers.registered.features.urlLimit'), included: true },
                { text: t('tiers.registered.features.textLimit'), included: true },
                { text: t('tiers.registered.features.fullAnalytics'), included: true },
                { text: t('tiers.registered.features.qrCodes'), included: true },
                { text: t('tiers.registered.features.customSlugs'), included: true },
                { text: t('tiers.registered.features.passwordProtection'), included: false },
                { text: t('tiers.registered.features.linkExpiration'), included: false },
                { text: t('tiers.registered.features.apiAccess'), included: true },
                { text: t('tiers.registered.features.prioritySupport'), included: false },
            ],
            cta: t('tiers.registered.cta'),
            popular: false,
        },
        {
            name: t('tiers.premium.name'),
            price: t('tiers.premium.price'),
            description: t('tiers.premium.description'),
            features: [
                { text: t('tiers.premium.features.unlimitedUrls'), included: true },
                { text: t('tiers.premium.features.unlimitedTexts'), included: true },
                { text: t('tiers.premium.features.advancedAnalytics'), included: true },
                { text: t('tiers.premium.features.customQrCodes'), included: true },
                { text: t('tiers.premium.features.customSlugs'), included: true },
                { text: t('tiers.premium.features.passwordProtection'), included: true },
                { text: t('tiers.premium.features.linkExpiration'), included: true },
                { text: t('tiers.premium.features.fullApiAccess'), included: true },
                { text: t('tiers.premium.features.prioritySupport'), included: true },
            ],
            cta: t('tiers.premium.cta'),
            popular: true,
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-24 px-6 overflow-hidden bg-background">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm mb-8 backdrop-blur-sm">
                            {t('badge')}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                            {t('title')} <span className="text-primary">{t('titleEmphasis')}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground/80 font-medium leading-relaxed max-w-2xl mx-auto">
                            {t('description')}
                        </p>
                    </div>
                </section>

                {/* Pricing Tiers */}
                <section className="py-20 px-6 bg-background">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            {tiers.map((tier, index) => (
                                <div
                                    key={index}
                                    className={`relative rounded-[32px] border ${
                                        tier.popular
                                            ? 'border-primary/50 bg-primary/5 shadow-2xl shadow-primary/10'
                                            : 'border-border/60 bg-card/40'
                                    } p-8 flex flex-col`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <Badge className="bg-primary text-primary-foreground border-primary px-4 py-1 rounded-full text-sm font-semibold">
                                                <Star className="w-3 h-3 mr-1 inline" />
                                                {t('mostPopular')}
                                            </Badge>
                                        </div>
                                    )}

                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-foreground mb-2">
                                            {tier.name}
                                        </h3>
                                        <div className="text-4xl font-bold text-primary mb-2">
                                            {tier.price}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {tier.description}
                                        </p>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {tier.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                ) : (
                                                    <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                                                )}
                                                <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        className={`w-full h-12 rounded-xl font-semibold ${
                                            tier.popular
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                : 'bg-background border-2 border-border text-foreground hover:bg-muted'
                                        }`}
                                        asChild
                                    >
                                        <Link href={tier.popular ? '/signup' : '/signup'}>
                                            {tier.cta}
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <FAQSection translationKey="pricing.faq" />

                {/* CTA Section */}
                <CTASection
                    translationKey="pricing.cta"
                    icon={MessageSquare}
                    iconRotation
                />
            </main>
        </div>
    );
};

export default PricingPage;
