'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import Link from 'next/link';

const CTASection = () => {
    return (
        <section className="py-24 px-6 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"></div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <Badge className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 rounded-full px-4 py-1.5 border border-primary-foreground/30 font-medium text-sm mb-6">
                    Get Started Today
                </Badge>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                    Get closer to your audience with QuilLink today
                </h2>

                <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-12">
                    Join thousands of businesses and individuals who trust QuilLink to power their link management and analytics.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 h-14 rounded-xl shadow-xl group"
                        asChild
                    >
                        <Link href="/signup">
                            Start for Free
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 h-14 rounded-xl"
                        asChild
                    >
                        <Link href="/contact-us">
                            Contact Sales
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
