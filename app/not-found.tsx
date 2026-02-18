'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SimpleNavbar from '@/components/navbar/simple-navbar';
import SimpleFooter from '@/components/footer/simple-footer';
import { ArrowRight, Link2, MessageSquare, QrCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const NotFoundPage = () => {
    const features = [
        {
            title: 'Shorten a URL',
            description: 'Turn long URLs into short, trackable links',
            icon: Link2,
            href: '/en/urls',
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20'
        },
        {
            title: 'Share Text',
            description: 'Share code, notes, and documents securely',
            icon: MessageSquare,
            href: '/en/texts',
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20'
        },
        {
            title: 'Generate QR Code',
            description: 'Create custom QR codes instantly',
            icon: QrCode,
            href: '/en/qr',
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <SimpleNavbar />
            <main className="flex-grow">
                <section className="relative min-h-screen py-24 md:py-32 px-6 overflow-hidden bg-background">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                        <div
                            className="absolute bottom-1/4 -right-12 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse"
                            style={{ animationDelay: '2s' }}
                        ></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6">
                            404 Error
                        </Badge>

                        <div className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Page Not Found
                        </div>

                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                            Sorry, we couldn't find the page you're looking for.
                            But we have plenty that does exist!
                        </p>

                        <Link href="/en" passHref>
                            <Button className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90">
                                Go to Homepage
                            </Button>
                        </Link>

                        <div className="mt-20 w-full">
                            <h2 className="text-2xl font-bold mb-8">
                                Explore Our Features
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {features.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={feature.href}
                                            className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 text-left"
                                        >
                                            <div
                                                className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.borderColor} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <Icon
                                                    className={`w-6 h-6 ${feature.color}`}
                                                />
                                            </div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                            <div className="mt-4 flex items-center text-sm font-semibold text-primary">
                                                Try it
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SimpleFooter />
        </div>
    );
};

export default NotFoundPage;
