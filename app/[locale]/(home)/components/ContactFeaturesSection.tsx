'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface ContactFeature {
    icon: LucideIcon;
    titleKey?: string;
    descriptionKey?: string;
    href?: string;
    color: string;
    bg: string;
    border: string;
    external?: boolean;
}

interface ContactFeaturesSectionProps {
    features: ContactFeature[];
    badge: string;
    title: string;
    titleEmphasis: string;
    subheading: string;
    translationKey?: string;
    className?: string;
    align?: 'center' | 'left';
}

const ContactFeaturesSection = ({
    features,
    badge,
    title,
    titleEmphasis,
    subheading,
    translationKey = 'contact',
    className,
    align = 'left',
}: ContactFeaturesSectionProps) => {
    const isCentered = align === 'center';

    return (
        <section className={`py-20 px-6 bg-background relative ${className || ''}`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className={`${isCentered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} mb-12`}>
                    <Badge className={`bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm mb-6 backdrop-blur-sm ${isCentered ? '' : 'inline-flex'}`}>
                        {badge}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
                        {title}<span className="text-primary">{titleEmphasis}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground/80 font-medium leading-relaxed">
                        {subheading}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        const content = (
                            <div className="group h-full p-10 rounded-[32px] border border-border/60 bg-card/40 backdrop-blur-sm hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 ring-1 ring-border/50">
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                {feature.titleKey && feature.descriptionKey && (
                                    <>
                                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                            {feature.titleKey}
                                        </h3>
                                        <p className="text-muted-foreground/80 leading-relaxed">
                                            {feature.descriptionKey}
                                        </p>
                                    </>
                                )}
                            </div>
                        );

                        if (feature.href) {
                            return (
                                <Link
                                    key={index}
                                    href={feature.href}
                                    target={feature.external ? '_blank' : undefined}
                                    rel={feature.external ? 'noopener noreferrer' : undefined}
                                    className="block"
                                >
                                    {content}
                                </Link>
                            );
                        }

                        return <div key={index}>{content}</div>;
                    })}
                </div>
            </div>
        </section>
    );
};

export default ContactFeaturesSection;
