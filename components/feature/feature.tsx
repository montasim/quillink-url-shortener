'use client'
import React from 'react'
import { motion } from 'framer-motion';

export default function Feature() {

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <div className='max-w-7xl w-full mx-auto min-h-dvh bg-blue-50 rounded-3xl md:rounded-4xl p-6 md:p-8'>
            <motion.div
                className="relative z-10 text-center w-full max-w-2xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h1
                    variants={fadeUp}
                    className="mt-4 text-3xl sm:text-4xl md:text-6xl font-bold !leading-[1.2]"
                >
                    Explore features <br /> for more efficiency
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="mt-4 text-[17px] md:text-lg text-muted-foreground"
                >
                    Use QuilLink to save your hours if work.
                </motion.p>
            </motion.div>
        </div>
    )
}
