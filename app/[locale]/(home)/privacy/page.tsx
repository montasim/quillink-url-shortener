'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

import { useTranslations } from 'next-intl';

const PrivacyPage = () => {
    const t = useTranslations('privacy');

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
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.intro.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.intro.content')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.collect.title')}</h2>
                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                {t('sections.collect.content')}
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                {['0', '1', '2', '3'].map((i) => (
                                    <li key={i}>{t(`sections.collect.infoList.${i}`)}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.use.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.use.content')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.analytics.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.analytics.content')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{t('sections.security.title')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('sections.security.content')}
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

export default PrivacyPage;
