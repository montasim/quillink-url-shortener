'use client';

import React from 'react';
import { Link2, BarChart3, QrCode, Zap, Shield, Globe, Star } from 'lucide-react';
import UrlShortnerHero from '@/app/[locale]/(home)/urls/components/UrlShortnerHero';
import FeaturesSection from '@/app/[locale]/(home)/components/FeaturesSection';
import TestimonialsSection from '@/app/[locale]/(home)/components/TestimonialsSection';
import CTASection from '@/app/[locale]/(home)/components/CTASection';
import FAQSection from '@/app/[locale]/(home)/components/FAQSection';

// URL Shortener Features
const urlShortenerFeatures = [
    {
        icon: Link2,
        key: 'shortening',
        color: 'from-blue-500 to-cyan-500',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-200 dark:border-blue-800/50',
        text: 'text-blue-700 dark:text-blue-300'
    },
    {
        icon: BarChart3,
        key: 'analytics',
        color: 'from-purple-500 to-pink-500',
        bg: 'bg-purple-50 dark:bg-purple-950/30',
        border: 'border-purple-200 dark:border-purple-800/50',
        text: 'text-purple-700 dark:text-purple-300'
    },
    {
        icon: QrCode,
        key: 'qr',
        color: 'from-orange-500 to-red-500',
        bg: 'bg-orange-50 dark:bg-orange-950/30',
        border: 'border-orange-200 dark:border-orange-800/50',
        text: 'text-orange-700 dark:text-orange-300'
    },
    {
        icon: Zap,
        key: 'fast',
        color: 'from-yellow-500 to-amber-500',
        bg: 'bg-yellow-50 dark:bg-yellow-950/30',
        border: 'border-yellow-200 dark:border-yellow-800/50',
        text: 'text-yellow-700 dark:text-yellow-300'
    },
    {
        icon: Shield,
        key: 'secure',
        color: 'from-green-500 to-emerald-500',
        bg: 'bg-green-50 dark:bg-green-950/30',
        border: 'border-green-200 dark:border-green-800/50',
        text: 'text-green-700 dark:text-green-300'
    },
    {
        icon: Globe,
        key: 'domains',
        color: 'from-indigo-500 to-violet-500',
        bg: 'bg-indigo-50 dark:bg-indigo-950/30',
        border: 'border-indigo-200 dark:border-indigo-800/50',
        text: 'text-indigo-700 dark:text-indigo-300'
    },
];

// URL Shortener Testimonials
const urlShortenerTestimonials = [
    { key: 'sarah', image: '👩‍💼', rating: 5 },
    { key: 'michael', image: '👨‍💻', rating: 5 },
    { key: 'emily', image: '👩‍🎨', rating: 5 },
    { key: 'david', image: '👨‍💼', rating: 5 },
    { key: 'lisa', image: '👩', rating: 5 },
    { key: 'james', image: '👨', rating: 5 },
];

export default function HomePage() {
    return (
        <>
            <UrlShortnerHero />
            <FeaturesSection features={urlShortenerFeatures} translationKey="urls.features" />
            <TestimonialsSection testimonials={urlShortenerTestimonials} translationKey="urls.testimonials" />
            <CTASection translationKey="urls.cta" />
            <FAQSection translationKey="urls.faq" />
            <CTASection translationKey="urls.faq" />
        </>
    );
}
