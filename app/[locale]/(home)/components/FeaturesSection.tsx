'use client';

import React from 'react';
import { BarChart3, Zap, Shield, Globe, QrCode, Link2 } from 'lucide-react';

const features = [
    {
        icon: Link2,
        title: 'Easy Link Shortening',
        description: 'Transform long URLs into short, memorable links in just one click. Simple, fast, and efficient.',
    },
    {
        icon: BarChart3,
        title: 'Advanced Analytics',
        description: 'Track clicks, geographic data, referrers, and more with our comprehensive analytics dashboard.',
    },
    {
        icon: QrCode,
        title: 'QR Code Generation',
        description: 'Automatically generate QR codes for your shortened links. Perfect for print and mobile.',
    },
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Our global CDN ensures your links redirect instantly, anywhere in the world.',
    },
    {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security with 99.9% uptime guarantee. Your links are always available.',
    },
    {
        icon: Globe,
        title: 'Custom Domains',
        description: 'Use your own branded domain for shortened links to build trust and recognition.',
    },
];

const FeaturesSection = () => {
    return (
        <section className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6">
                        Features
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Explore features for more efficiency
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Everything you need to create, manage, and track your shortened links in one powerful platform.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl border border-border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
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
