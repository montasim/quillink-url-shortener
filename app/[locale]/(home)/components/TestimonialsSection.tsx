'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Marketing Director',
        company: 'TechCorp Inc.',
        image: '👩‍💼',
        rating: 5,
        text: 'QuilLink has transformed how we manage our marketing campaigns. The analytics are incredibly detailed and the interface is so intuitive. Highly recommend!',
    },
    {
        name: 'Michael Chen',
        role: 'Social Media Manager',
        company: 'Creative Studio',
        image: '👨‍💻',
        rating: 5,
        text: 'The best URL shortener I\'ve used. Custom domains, QR codes, and detailed analytics all in one place. It\'s a game-changer for our social media strategy.',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Content Creator',
        company: 'Independent',
        image: '👩‍🎨',
        rating: 5,
        text: 'As a content creator, tracking link performance is crucial. QuilLink makes it so easy to see what\'s working and what\'s not. Love the clean dashboard!',
    },
    {
        name: 'David Kim',
        role: 'E-commerce Owner',
        company: 'ShopNow',
        image: '👨‍💼',
        rating: 5,
        text: 'We use QuilLink for all our product links. The reliability is outstanding and the custom domain feature helps build trust with our customers.',
    },
    {
        name: 'Lisa Anderson',
        role: 'Digital Marketer',
        company: 'Growth Agency',
        image: '👩',
        rating: 5,
        text: 'The analytics dashboard gives us insights we never had before. We can now optimize our campaigns in real-time. Absolutely worth it!',
    },
    {
        name: 'James Wilson',
        role: 'Startup Founder',
        company: 'InnovateLab',
        image: '👨',
        rating: 5,
        text: 'QuilLink is an essential tool for our startup. It\'s affordable, powerful, and the support team is incredibly responsive. Can\'t imagine working without it.',
    },
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6">
                        Testimonials
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Hundreds of people already trust us
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        See what our customers have to say about their experience with QuilLink.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                                    {testimonial.image}
                                </div>
                                <div>
                                    <div className="font-semibold text-foreground">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {testimonial.role} at {testimonial.company}
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
