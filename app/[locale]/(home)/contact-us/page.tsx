'use client';

import { useTranslations } from 'next-intl';
import { GithubIcon, LinkedinIcon, MailIcon, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const ContactPage = () => {
    const t = useTranslations('contact');

    const contactMethods = [
        {
            icon: MailIcon,
            title: t('email'),
            value: 'montasimmamun@gmail.com',
            href: 'mailto:montasimmamun@gmail.com',
            label: t('emailLabel'),
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10'
        },
        {
            icon: LinkedinIcon,
            title: t('linkedin'),
            value: 'LinkedIn Profile',
            href: 'https://linkedin.com/in/montasimmamun',
            label: t('linkedinLabel'),
            color: 'text-sky-600',
            bgColor: 'bg-sky-600/10'
        },
        {
            icon: GithubIcon,
            title: t('github'),
            value: 'GitHub Profile',
            href: 'https://github.com/montasim',
            label: t('githubLabel'),
            color: 'text-slate-900 dark:text-slate-100',
            bgColor: 'bg-slate-900/10 dark:bg-slate-100/10'
        },
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 font-medium text-sm mb-6">
                        {t('badge')}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
                        {t('subtitle')}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <a
                                key={index}
                                href={method.href}
                                target={method.href.startsWith('http') ? '_blank' : undefined}
                                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="group p-8 rounded-3xl border border-border bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col items-center text-center"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${method.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-7 h-7 ${method.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {method.title}
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    {method.label}
                                </p>
                                <div className="mt-auto font-semibold text-primary group-hover:underline">
                                    {method.value}
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 relative overflow-hidden p-12 md:p-20 rounded-[48px] bg-gradient-to-br from-primary/[0.05] to-secondary/[0.05] text-foreground border border-border shadow-2xl shadow-primary/5 max-w-5xl mx-auto group">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 text-center">
                        <div className="w-20 h-20 bg-primary/10 backdrop-blur-xl rounded-[28px] flex items-center justify-center mx-auto mb-10 border border-primary/20 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <MessageSquare className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8 tracking-tight">
                            {t('chat.title')}<span className="text-primary italic">{t('chat.titleEmphasis')}</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                            {t('chat.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                href="/#faq"
                                className="inline-flex items-center justify-center rounded-2xl text-xl font-black transition-all bg-primary text-primary-foreground hover:bg-primary/95 h-16 px-12 shadow-2xl active:scale-95"
                            >
                                {t('chat.viewFaqs')}
                            </Link>
                            <Link
                                href="mailto:montasimmamun@gmail.com"
                                className="inline-flex items-center justify-center rounded-2xl text-xl font-black transition-all bg-background border-2 border-border text-foreground hover:bg-muted h-16 px-12 shadow-xl active:scale-95"
                            >
                                {t('chat.emailSupport')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

