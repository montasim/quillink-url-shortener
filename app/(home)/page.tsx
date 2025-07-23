'use client';

import React from 'react';
import Hero from '@/components/hero/hero';
import Clients from '@/components/clients/clients';
import Testimonial from '@/components/testimonial/testimonial';
import Faq from '@/components/faq/faq';
import { GlobeUI } from '@/components/globe/ui';

export default function HomePage() {
    return (
        <>
            <Hero />

            <Clients />

            <GlobeUI/>

            <Testimonial />

            <Faq />
        </>
    );
}
