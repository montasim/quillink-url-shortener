'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

interface TestimonialItem {
    key: string;
    image: string;
    rating: number;
}

interface TestimonialsSectionProps {
    testimonials: TestimonialItem[];
    translationKey: string;
}

const TestimonialsSection = ({ testimonials, translationKey }: TestimonialsSectionProps) => {
    // Support both nested (urls.testimonials) and flat (testimonials) structures
    const t = useTranslations(`home.${translationKey}`);

    return (
        <section className="py-24 px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6 backdrop-blur-sm">
                        {t('badge')}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
                        {t('heading')}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground/80 font-medium leading-relaxed">
                        {t('subheading')}
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="group p-10 rounded-[32px] border border-border/60 bg-card/40 backdrop-blur-sm hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 ring-1 ring-border/50"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-foreground/80 mb-8 leading-relaxed text-base">
                                {t(`testimonialList.${item.key}.quote`)}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">{item.image}</span>
                                <div>
                                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {t(`testimonialList.${item.key}.name`)}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {t(`testimonialList.${item.key}.role`)}
                                    </p>
                                    <p className="text-xs text-muted-foreground/60">
                                        {t(`testimonialList.${item.key}.company`)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
