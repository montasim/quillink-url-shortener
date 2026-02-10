'use client';

import React from 'react';
import NewHero from './components/NewHero';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import FAQSection from './components/FAQSection';

export default function HomePage() {
    return (
        <>
            <NewHero />
            <FeaturesSection />
            <TestimonialsSection />
            <CTASection />
            <FAQSection />
        </>
    );
}
