'use client';

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const faqs = [
    {
        question: 'What is a URL shortener?',
        answer: 'A URL shortener is a tool that converts long URLs into shorter, more manageable links. These shortened links redirect to the original URL when clicked, making them easier to share on social media, emails, and other platforms.',
    },
    {
        question: 'How does QuilLink work?',
        answer: 'Simply paste your long URL into our shortener, and QuilLink will generate a short, unique link for you. You can customize the link, track its performance, and even generate QR codes - all from your dashboard.',
    },
    {
        question: 'Is QuilLink free to use?',
        answer: 'Yes! QuilLink offers a free plan with essential features including link shortening, basic analytics, and QR code generation. We also offer premium plans with advanced features like custom domains and detailed analytics.',
    },
    {
        question: 'Can I track my shortened links?',
        answer: 'Absolutely! Every shortened link comes with comprehensive analytics including click counts, geographic data, referrer information, device types, and more. You can access all this data from your dashboard.',
    },
    {
        question: 'Can I use my own custom domain?',
        answer: 'Yes, our premium plans allow you to use your own branded domain for shortened links. This helps build trust and brand recognition with your audience.',
    },
    {
        question: 'How long do shortened links last?',
        answer: 'Shortened links created with QuilLink never expire by default. However, you have the option to set custom expiration dates for your links if needed.',
    },
    {
        question: 'Is there a limit to how many links I can create?',
        answer: 'Free accounts can create up to 100 links per month. Premium plans offer unlimited link creation along with other advanced features.',
    },
    {
        question: 'Are shortened links safe?',
        answer: 'Yes, QuilLink takes security seriously. We scan all URLs for malicious content and provide SSL encryption for all redirects. We also offer link password protection on premium plans.',
    },
];

const FAQSection = () => {
    const half = Math.ceil(faqs.length / 2);
    const leftFaqs = faqs.slice(0, half);
    const rightFaqs = faqs.slice(half);

    return (
        <section className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6">
                        FAQ
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Your questions, answered
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Everything you need to know about QuilLink and how it works.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 items-start">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {leftFaqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`left-item-${index}`}
                                className="border border-border last:border-b rounded-2xl px-6 bg-card hover:shadow-md transition-shadow"
                            >
                                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {rightFaqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`right-item-${index}`}
                                className="border border-border last:border-b rounded-2xl px-6 bg-card hover:shadow-md transition-shadow"
                            >
                                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Contact CTA */}
                <div className="mt-32 relative overflow-hidden p-12 md:p-20 rounded-[48px] bg-gradient-to-br from-primary/[0.05] to-secondary/[0.05] text-foreground border border-border shadow-2xl shadow-primary/5 group">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-primary/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight">
                            Still have <span className="text-primary italic">questions?</span>
                        </h3>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl font-medium leading-relaxed">
                            Can&apos;t find the answer you&apos;re looking for? Join our community or chat with our friendly support team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Button
                                size="lg"
                                className="h-16 px-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/95 shadow-2xl shadow-primary/20 transition-all font-black text-lg active:scale-95"
                                asChild
                            >
                                <Link href="/contact-us">
                                    Get in Touch
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 px-12 rounded-2xl border-2 border-border bg-background text-foreground hover:bg-muted font-black text-lg transition-all shadow-xl"
                                asChild
                            >
                                <a href="mailto:support@quillink.com">
                                    Email Support
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default FAQSection;
