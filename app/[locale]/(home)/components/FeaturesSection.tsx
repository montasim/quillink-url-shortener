'use client';

import React from 'react';
import { BarChart3, Zap, Shield, Globe, QrCode, Link2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

const FeaturesSection = () => {
    const t = useTranslations('home.features');

    const featuresList = [
        { icon: Link2, key: 'shortening' },
        { icon: BarChart3, key: 'analytics' },
        { icon: QrCode, key: 'qr' },
        { icon: Zap, key: 'fast' },
        { icon: Shield, key: 'secure' },
        { icon: Globe, key: 'domains' },
    ];

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
                        {t('headingPart1')}<span className="text-primary">{t('headingHighlight')}</span>{t('headingPart2')}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground/80 font-medium leading-relaxed">
                        {t('subheading')}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {featuresList.map((feature, index) => {
                        const Icon = feature.icon;
                        const key = feature.key;
                        return (
                            <div
                                key={index}
                                className="group p-10 rounded-[32px] border border-border/60 bg-card/40 backdrop-blur-sm hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 ring-1 ring-border/50"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-7 h-7 text-primary-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                                    {t(`list.${key}.title`)}
                                </h3>
                                <p className="text-muted-foreground/80 font-medium leading-relaxed">
                                    {t(`list.${key}.description`)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// Badge component import
import { Badge } from '@/components/ui/badge';

export default FeaturesSection;
