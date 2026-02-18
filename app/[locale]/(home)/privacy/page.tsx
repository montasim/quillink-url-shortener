'use client';

import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';
import { useTranslations } from 'next-intl';

const PrivacyPage = () => {
    const t = useTranslations('home.privacy');

    return (
        <LegalPageLayout
            badge={t('badge')}
            titleEmphasis={`${t('titleEmphasis')} `}
            titleSuffix={t('titleSuffix')}
            lastUpdated={t('lastUpdated')}
        >
            <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t('sections.intro.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {t('sections.intro.content')}
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t('sections.collect.title')}
                </h2>
                <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        {t('sections.collect.content')}
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                        {['0', '1', '2', '3'].map((i) => (
                            <li key={i}>
                                {t(`sections.collect.infoList.${i}`)}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t('sections.use.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {t('sections.use.content')}
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t('sections.analytics.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {t('sections.analytics.content')}
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t('sections.security.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {t('sections.security.content')}
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t('sections.contact.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {t('sections.contact.content')}
                </p>
                <div className="mt-4 p-6 rounded-2xl bg-muted/50 border border-border inline-block">
                    <p className="font-semibold text-foreground">
                        {t('sections.contact.email')}
                    </p>
                </div>
            </section>
        </LegalPageLayout>
    );
};

export default PrivacyPage;
