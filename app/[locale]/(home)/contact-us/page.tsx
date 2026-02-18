'use client';

import { useTranslations } from 'next-intl';
import { GithubIcon, LinkedinIcon, MailIcon, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import CTASection from '../components/CTASection';
import configuration from '@/configuration/configuration';

const ContactPage = () => {
    const t = useTranslations('home.contact');

    const contactMethods = [
        {
            icon: MailIcon,
            title: t('email'),
            value: configuration.contact.email,
            href: `mailto:${configuration.contact.email}`,
            label: t('emailLabel'),
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10'
        },
        {
            icon: LinkedinIcon,
            title: t('linkedin'),
            value: 'LinkedIn Profile',
            href: configuration.social.linkedin,
            label: t('linkedinLabel'),
            color: 'text-sky-600',
            bgColor: 'bg-sky-600/10'
        },
        {
            icon: GithubIcon,
            title: t('github'),
            value: 'GitHub Profile',
            href: configuration.social.github,
            label: t('githubLabel'),
            color: 'text-slate-900 dark:text-slate-100',
            bgColor: 'bg-slate-900/10 dark:bg-slate-100/10'
        },
    ];

    const features = [
        {
            name: t('features.urlShortening'),
            description: 'Shorten URLs, track clicks, view analytics'
        },
        {
            name: t('features.textSharing'),
            description: 'Share code, notes, documents securely'
        },
        {
            name: t('features.qrCodes'),
            description: 'Generate custom QR codes instantly'
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
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm mb-8 backdrop-blur-sm">
                        {t('badge')}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
                        {t('title')} <span className="text-primary">{t('titleEmphasis')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground/80 font-medium leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                {/* Features Summary */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors duration-300"
                        >
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {feature.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
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
                                <h3 className="text-xl font-semibold text-foreground mb-2">
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
                <CTASection
                    className="mt-32 mb-0"
                    icon={MessageSquare}
                    iconRotation
                    title={t('chat.title')}
                    titleEmphasis={t('chat.titleEmphasis')}
                    description={t('chat.description')}
                    primaryButton={{ text: t('chat.viewFaqs'), href: '/#faq' }}
                    secondaryButton={{ text: t('chat.emailSupport'), href: `mailto:${configuration.contact.email}` }}
                />
            </div>
        </div>
    );
};

export default ContactPage;

