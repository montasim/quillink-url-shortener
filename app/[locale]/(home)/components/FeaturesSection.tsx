'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

interface FeatureItem {
    icon: LucideIcon;
    key: string;
    color: string;
    bg: string;
    border: string;
    text: string;
}

interface FeaturesSectionProps {
    features: FeatureItem[];
    translationKey: string;
}

const FeaturesSection = ({ features, translationKey }: FeaturesSectionProps) => {
    // Support both nested (urls.features) and flat (features) structures
    const t = useTranslations(`home.${translationKey}`);

    return (
        <section className="py-32 px-6 bg-background relative">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm mb-8 backdrop-blur-sm">
                        {t('badge')}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 tracking-tight">
                        {t('headingPrefix')}<span className="text-primary">{t('headingEmphasis')}</span>{t('headingSuffix')}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground/80 font-medium leading-relaxed">
                        {t('subheading')}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const key = feature.key;
                        return (
                            <div
                                key={index}
                                className="group p-10 rounded-[32px] border border-border/60 bg-card/40 backdrop-blur-sm hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 ring-1 ring-border/50"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {t(`featureList.${key}.title`)}
                                </h3>
                                <p className="text-muted-foreground/80 leading-relaxed">
                                    {t(`featureList.${key}.description`)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
