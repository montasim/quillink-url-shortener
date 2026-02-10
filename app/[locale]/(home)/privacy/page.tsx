'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-32">
                {/* Header */}
                <div className="text-center mb-16">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6">
                        Legal
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-6 leading-[1.1]">
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[size:200%_auto] bg-clip-text text-transparent animate-[shine_5s_linear_infinite]">Privacy</span> Policy
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Last updated: February 10, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            At QuilLink, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our URL shortening service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                We collect information that you provide directly to us when you create an account, shorten a URL, or contact us for support. This may include:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Account information (name, email address, password)</li>
                                <li>URLs you shorten and their original destinations</li>
                                <li>Usage data and analytics for your shortened links</li>
                                <li>Device and browser information</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect QuilLink and our users. This includes using data to track link performance, prevent spam and abuse, and personalize your experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Analytics</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            When someone clicks on a QuilLink URL, we collect certain information about the click, such as the IP address (anonymized), geographic location, referrer, and device type. This information is used to provide analytics to the creator of the link and to help us improve our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have questions or comments about this Privacy Policy, please contact us at:
                        </p>
                        <div className="mt-4 p-6 rounded-2xl bg-muted/50 border border-border inline-block">
                            <p className="font-semibold text-foreground">Email: privacy@quillink.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
