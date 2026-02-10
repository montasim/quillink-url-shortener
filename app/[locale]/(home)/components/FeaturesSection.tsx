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
        <section className="py-32 px-6 bg-background relative">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm mb-8 backdrop-blur-sm">
                        Features
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 tracking-tight">
                        Explore features for more <span className="text-primary">efficiency</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground/80 font-medium leading-relaxed">
                        Everything you need to create, manage, and track your shortened links in one powerful platform.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group p-10 rounded-[32px] border border-border/60 bg-card/40 backdrop-blur-sm hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 ring-1 ring-border/50"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-7 h-7 text-primary-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground/80 font-medium leading-relaxed">
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
