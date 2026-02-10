'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

const TermsPage = () => {
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
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Last updated: February 10, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing or using QuilLink's services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use any services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            QuilLink provides a URL shortening service that allows users to create shorter versions of long URLs. We also provide analytics, QR code generation, and other related services. We reserve the right to modify or discontinue any part of the service at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. User Responsibilities</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p className="leading-relaxed">
                                You are responsible for all activity that occurs under your account. You agree not to use QuilLink for:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Spamming or sending unsolicited communications</li>
                                <li>Distributing malware, viruses, or other harmful code</li>
                                <li>Creating links to illegal or prohibited content</li>
                                <li>Any activity that violates local, state, or international laws</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">4. Link Content & Expiration</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            QuilLink does not claim ownership of the content of the URLs shortened. We reserve the right to disable any link that violates our terms or is deemed inappropriate. Free accounts may have their links subject to certain limits or expiration policies as defined in our pricing guide.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            The QuilLink name, logo, and all related designs and software are the intellectual property of QuilLink and its licensors. You may not use our branding without prior written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            QuilLink provides its services "as is" without any warranty. We are not liable for any damages resulting from the use or inability to use our services, including but not limited to lost profits, data loss, or service interruptions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">7. Termination</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for behavior that we believe violates these Terms of Service or is harmful to other users or our business interests.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Questions about the Terms of Service should be sent to us at:
                        </p>
                        <div className="mt-4 p-6 rounded-2xl bg-muted/50 border border-border inline-block">
                            <p className="font-semibold text-foreground">Email: legal@quillink.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
