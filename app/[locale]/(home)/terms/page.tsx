'use client';

import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';
import { useTranslations } from 'next-intl';

const TermsPage = () => {
    const t = useTranslations('home.terms');

    return (
        <LegalPageLayout
            badge={t('badge')}
            titleEmphasis={t('titleEmphasis')}
            titleSuffix={t('titleSuffix')}
            lastUpdated={t('lastUpdated')}
        >
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
                </LegalPageLayout>
    );
};

export default TermsPage;
