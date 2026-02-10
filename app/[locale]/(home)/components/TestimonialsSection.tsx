'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import { useTranslations } from 'next-intl';

const TestimonialsSection = () => {
    const t = useTranslations('home.testimonials');

    const testimonialsList = [
        { key: 'sarah', image: '👩‍💼', rating: 5 },
        { key: 'michael', image: '👨‍💻', rating: 5 },
        { key: 'emily', image: '👩‍🎨', rating: 5 },
        { key: 'david', image: '👨‍💼', rating: 5 },
        { key: 'lisa', image: '👩', rating: 5 },
        { key: 'james', image: '👨', rating: 5 },
    ];

    return (
        <section className="py-24 px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6">
                        {t('badge')}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        {t('heading')}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t('subheading')}
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonialsList.map((item, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                "{t(`list.${item.key}.text`)}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                                    {item.image}
                                </div>
                                <div>
                                    <div className="font-semibold text-foreground">
                                        {t(`list.${item.key}.name`)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {t(`list.${item.key}.role`)} at {t(`list.${item.key}.company`)}
                                    </div>
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
