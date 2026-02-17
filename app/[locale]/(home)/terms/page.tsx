'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

import { useTranslations } from 'next-intl';

const TermsPage = () => {
    const t = useTranslations('terms');

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-32">
                {/* Header */}
                <div className="text-center mb-16">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6">
                        {t('badge')}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-6 leading-[1.1]">
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[size:200%_auto] bg-clip-text text-transparent animate-[shine_5s_linear_infinite]">{t('titleEmphasis')}</span>{t('titleSuffix')}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {t('lastUpdated')}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.acceptance.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.acceptance.content')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.description.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.description.content')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.responsibilities.title')}</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p className="leading-relaxed">
                                {t('sections.responsibilities.content')}
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                {['0', '1', '2', '3'].map((i) => (
                                    <li key={i}>{t(`sections.responsibilities.infoList.${i}`)}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.expiration.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.expiration.content')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.property.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.property.content')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.liability.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.liability.content')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.termination.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.termination.content')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.contact.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.contact.content')}
                        </p>
                        <div className="mt-4 p-6 rounded-2xl bg-muted/50 border border-border inline-block">
                            <p className="font-semibold text-foreground">{t('sections.contact.email')}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
