'use client';

import { useTranslations } from 'next-intl';
import { CircleAlert, GithubIcon, LinkedinIcon, MailIcon, MessageSquare, QrCode, Star, Link2 } from 'lucide-react';
import React from 'react';
import CTASection from '../components/CTASection';
import ContactFeaturesSection from '../components/ContactFeaturesSection';
import configuration from '@/configuration/configuration';

const ContactPage = () => {
    const t = useTranslations('home.contact');

    // Product Features Section
    const productFeatures = [
        {
            icon: Link2,
            titleKey: t('sections.features.urlShortening'),
            descriptionKey: t('sections.features.urlShorteningDesc'),
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
        },
        {
            icon: MessageSquare,
            titleKey: t('sections.features.textSharing'),
            descriptionKey: t('sections.features.textSharingDesc'),
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
        },
        {
            icon: QrCode,
            titleKey: t('sections.features.qrCodes'),
            descriptionKey: t('sections.features.qrCodesDesc'),
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
        },
    ];

    // GitHub Section
    const githubFeatures = [
        {
            icon: Star,
            titleKey: t('sections.github.repo'),
            descriptionKey: t('sections.github.repoDesc'),
            href: configuration.github.repo,
            color: 'from-yellow-500 to-orange-500',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20',
            external: true,
        },
        {
            icon: CircleAlert,
            titleKey: t('sections.github.issues'),
            descriptionKey: t('sections.github.issuesDesc'),
            href: configuration.github.issues,
            color: 'from-red-500 to-red-600',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            external: true,
        },
    ];

    // Contact Methods Section
    const contactFeatures = [
        {
            icon: MailIcon,
            titleKey: t('sections.contactMethods.email'),
            descriptionKey: t('sections.contactMethods.emailDesc'),
            href: `mailto:${configuration.contact.email}`,
            color: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            external: false,
        },
        {
            icon: LinkedinIcon,
            titleKey: t('sections.contactMethods.linkedin'),
            descriptionKey: t('sections.contactMethods.linkedinDesc'),
            href: configuration.social.linkedin,
            color: 'from-sky-600 to-blue-700',
            bg: 'bg-sky-600/10',
            border: 'border-sky-600/20',
            external: true,
        },
        {
            icon: GithubIcon,
            titleKey: t('sections.contactMethods.github'),
            descriptionKey: t('sections.contactMethods.githubDesc'),
            href: configuration.social.github,
            color: 'from-slate-700 to-slate-900',
            bg: 'bg-slate-700/10',
            border: 'border-slate-700/20',
            external: true,
        },
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                        <span className="text-2xl">👋</span>
                        <span className="text-sm font-semibold text-primary">{t('badge')}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                        {t('title')} <span className="text-primary">{t('titleEmphasis')}</span>
                    </h1>

                    <p className="text-xl text-muted-foreground/80 font-medium leading-relaxed max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>
            </section>

            {/* Product Features Section */}
            <ContactFeaturesSection
                features={productFeatures}
                badge={t('sections.features.badge')}
                title={t('sections.features.title')}
                titleEmphasis={t('sections.features.titleEmphasis')}
                subheading={t('sections.features.subheading')}
                translationKey="contact"
                align="left"
            />

            {/* GitHub Section */}
            <ContactFeaturesSection
                features={githubFeatures}
                badge={t('sections.github.badge')}
                title={t('sections.github.title')}
                titleEmphasis={t('sections.github.titleEmphasis')}
                subheading={t('sections.github.subheading')}
                translationKey="contact"
                className="bg-muted/20"
                align="left"
            />

            {/* Contact Methods Section */}
            <ContactFeaturesSection
                features={contactFeatures}
                badge={t('sections.contactMethods.badge')}
                title={t('sections.contactMethods.title')}
                titleEmphasis={t('sections.contactMethods.titleEmphasis')}
                subheading={t('sections.contactMethods.subheading')}
                translationKey="contact"
                align="left"
            />

            {/* FAQ CTA Section */}
            <section className="py-16 px-6">
                <CTASection
                    className="mb-0"
                    icon={MessageSquare}
                    iconRotation
                    title={t('chat.title')}
                    titleEmphasis={t('chat.titleEmphasis')}
                    description={t('chat.description')}
                    primaryButton={{ text: t('chat.viewFaqs'), href: '/#faq' }}
                    secondaryButton={{ text: t('chat.emailSupport'), href: `mailto:${configuration.contact.email}` }}
                />
            </section>
        </div>
    );
};

export default ContactPage;
