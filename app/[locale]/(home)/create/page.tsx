'use client';

import React from 'react';
import { FileText, Lock, Clock, BarChart3, Zap, Shield, Star } from 'lucide-react';
import TextShareHero from '@/app/[locale]/(home)/create/components/TextShareHero';
import FeaturesSection from '@/app/[locale]/(home)/components/FeaturesSection';
import TestimonialsSection from '@/app/[locale]/(home)/components/TestimonialsSection';
import CTASection from '@/app/[locale]/(home)/components/CTASection';
import FAQSection from '@/app/[locale]/(home)/components/FAQSection';

// Text Share Features
const textShareFeatures = [
    {
        icon: FileText,
        key: 'instant',
        color: 'from-blue-500 to-cyan-500',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-200 dark:border-blue-800/50',
        text: 'text-blue-700 dark:text-blue-300'
    },
    {
        icon: Lock,
        key: 'password',
        color: 'from-purple-500 to-pink-500',
        bg: 'bg-purple-50 dark:bg-purple-950/30',
        border: 'border-purple-200 dark:border-purple-800/50',
        text: 'text-purple-700 dark:text-purple-300'
    },
    {
        icon: Clock,
        key: 'expire',
        color: 'from-orange-500 to-red-500',
        bg: 'bg-orange-50 dark:bg-orange-950/30',
        border: 'border-orange-200 dark:border-orange-800/50',
        text: 'text-orange-700 dark:text-orange-300'
    },
    {
        icon: BarChart3,
        key: 'analytics',
        color: 'from-green-500 to-emerald-500',
        bg: 'bg-green-50 dark:bg-green-950/30',
        border: 'border-green-200 dark:border-green-800/50',
        text: 'text-green-700 dark:text-green-300'
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
        color: 'from-indigo-500 to-violet-500',
        bg: 'bg-indigo-50 dark:bg-indigo-950/30',
        border: 'border-indigo-200 dark:border-indigo-800/50',
        text: 'text-indigo-700 dark:text-indigo-300'
    },
];

// Text Share Testimonials
const textShareTestimonials = [
    { key: 'alex', image: '👨‍💻', rating: 5 },
    { key: 'priya', image: '👩‍🔧', rating: 5 },
    { key: 'marcus', image: '👨‍💼', rating: 5 },
    { key: 'sophie', image: '👩‍💻', rating: 5 },
    { key: 'daniel', image: '👨‍🎓', rating: 5 },
    { key: 'rachel', image: '👩‍🎨', rating: 5 },
];

export default function CreateTextSharePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Create Form */}
            <TextShareHero />

            {/* Features Section */}
            <FeaturesSection features={textShareFeatures} translationKey="textShareFeatures" />

            {/* Testimonials Section */}
            <TestimonialsSection testimonials={textShareTestimonials} translationKey="textShareTestimonials" />

            {/* Additional Sections */}
            <CTASection />
            <FAQSection />
        </div>
    );
}
