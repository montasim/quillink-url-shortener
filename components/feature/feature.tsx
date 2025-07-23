'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { Link, QrCode } from 'lucide-react';

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
        <div className='max-w-7xl w-full mx-auto bg-blue-50 rounded-3xl md:rounded-4xl p-6 md:p-8'>
            <motion.div
                className="relative z-10 text-center w-full max-w-2xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h1
                    variants={fadeUp}
                    className="mt-4 text-2xl sm:text-3xl md:text-5xl font-bold !leading-[1.2]"
                >
                    Explore features <br /> for more 🧩 efficiency
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="mt-4 text-[17px] md:text-lg text-muted-foreground"
                >
                    Use QuilLink to save your hours if work.
                </motion.p>
            </motion.div>


            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className='flex gap-3 w-full items-center justify-center my-5'
            >

                <motion.div 
                    variants={fadeUp}
                    className='text-sm w-fit flex items-center gap-2 p-1 pr-2 text-white bg-blue-500 rounded-full'
                >
                    <Link className='w-5 h-5 rounded-full bg-white text-blue-500 p-1'/>
                    <span>Short Links</span>
                </motion.div>

                <motion.div 
                    variants={fadeUp}
                    className='text-sm w-fit flex items-center gap-2 p-1 pr-2 text-blue-500 ring-1 ring-blue-500 rounded-full'
                >
                    <QrCode className='w-5 h-5 rounded-full bg-blue-500 text-white p-1'/>
                    <span>Generate QR Codes</span>
                </motion.div>

                <motion.div 
                    variants={fadeUp}
                    className='text-sm w-fit flex items-center gap-2 p-1 pr-2 text-blue-500 ring-1 ring-blue-500 rounded-full'
                >
                    <QrCode className='w-5 h-5 rounded-full bg-blue-500 text-white p-1'/>
                    <span>Manage your links</span>
                </motion.div>

            </motion.div>
        </div>
    )
}
