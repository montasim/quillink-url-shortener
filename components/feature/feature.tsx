'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { Link, QrCode } from 'lucide-react';
import { Chart } from './chart';

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
                    <Link className='w-5 h-5 rounded-full bg-white text-blue-500 p-1' />
                    <span>Short Links</span>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    className='text-sm w-fit flex items-center gap-2 p-1 pr-2 text-blue-500 ring-1 ring-blue-500 rounded-full'
                >
                    <QrCode className='w-5 h-5 rounded-full bg-blue-500 text-white p-1' />
                    <span>Generate QR Codes</span>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    className='text-sm w-fit flex items-center gap-2 p-1 pr-2 text-blue-500 ring-1 ring-blue-500 rounded-full'
                >
                    <QrCode className='w-5 h-5 rounded-full bg-blue-500 text-white p-1' />
                    <span>Manage your links</span>
                </motion.div>

            </motion.div>
            <div className='grid md:grid-cols-2 gap-5'>
                <div className='flex flex-col justify-center space-y-4'>
                    <h3 className='text-xl sm:text-2xl md:text-4xl'>Campaign Monitoring & <br /> Analysis</h3>
                    <p className="text-[17px] md:text-lg text-muted-foreground">Learn from your links and build better Campaigns</p>
                    <button className="w-fit p-[3px] relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                        <div className="px-8 py-2 bg-background cursor-pointer rounded-[6px] relative group transition duration-200 hover:text-white hover:bg-transparent">
                            Start for free
                        </div>
                    </button>
                </div>
                <div>
                    <Chart/>
                </div>
            </div>
        </div>
    )
}
