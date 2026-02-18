'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

interface LegalPageLayoutProps {
    badge: string;
    titleEmphasis: string;
    titleSuffix: string;
    lastUpdated: string;
    children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
    badge,
    titleEmphasis,
    titleSuffix,
    lastUpdated,
    children,
}) => {
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
                        {badge}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-6 leading-[1.1]">
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[size:200%_auto] bg-clip-text text-transparent animate-[shine_5s_linear_infinite]">
                            {titleEmphasis}
                        </span>
                        {titleSuffix}
                    </h1>
                    <p className="text-lg text-muted-foreground">{lastUpdated}</p>
                </div>

                {/* Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LegalPageLayout;
