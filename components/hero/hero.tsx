'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link as LinkIcon, QrCode as QrCodeIcon } from 'lucide-react';
import ShortLink from './tab/short-link';
import QrCode from './tab/qr-code';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const Hero = () => {
    const tabs = [
        {
            name: 'Short Link',
            icon: <LinkIcon />,
            value: 'short_link',
            content: <ShortLink />,
        },
        {
            name: 'QR Code',
            icon: <QrCodeIcon />,
            value: 'qr_code',
            content: <QrCode />,
        },
    ];

    return (
        <div className="relative min-h-screen flex justify-center px-6 overflow-hidden">
            <AnimatePresence>
                <motion.img
                    src="/image/Hero.png"
                    alt="hero"
                    initial={{ scale: 1.3, scaleX: 1.3, opacity: 0 }}
                    animate={{ scale: 1, scaleX: 1, opacity: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1], // a natural "easeOutBack" effect
                    }}
                    className={cn(
                        'absolute top-0 left-0 object-cover w-full h-full',
                        'will-change-transform'
                    )}
                />

                <motion.div
                    className="relative z-10 text-center max-w-2xl translate-y-2/12"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={fadeUp}>
                        <Badge
                            className={cn(
                                'rounded-full px-2',
                                'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
                                'text-xs font-semibold tracking-wide uppercase'
                            )}
                        >
                            Just released v1.0.0
                        </Badge>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="mt-4 text-background text-2xl sm:text-3xl md:text-4xl font-bold !leading-[1.2]"
                    >
                        Make every connection count
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="mt-4 text-[17px] md:text-lg text-muted"
                    >
                        Create short links, QR codes, share them anywhere. Track
                        what&apos;s working, and what&apos;s not. All inside the
                        <strong> QuilLink Connection Platform.</strong>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.4, delay: 0.4, ease: 'easeInOut' }}
                        className="mt-8 flex items-center justify-center gap-4 will-change-transform"
                    >
                        <Tabs defaultValue={tabs[0].value} className="w-full space-y-0 gap-0">
                            <TabsList className="w-full p-0 bg-background/80 backdrop-blur-sm rounded-t-xl rounded-b-none overflow-hidden justify-start">
                                {tabs.map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={cn(
                                            "bg-transparent text-muted-foreground text-sm transition-colors duration-300",
                                            "data-[state=active]:bg-blue-500 data-[state=active]:text-white",
                                            "p-0 border-none"
                                        )}
                                    >
                                        <code className="flex items-center gap-2 text-[13px]">
                                            {tab.icon} {tab.name}
                                        </code>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {tabs.map((tab) => (
                                <TabsContent key={tab.value} value={tab.value} className="mt-0">
                                    <motion.div
                                        key={tab.value}
                                        initial={{ opacity: 0.4, filter: 'blur(8px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="w-full p-6 bg-background/80 backdrop-blur-sm rounded-b-xl shadow-md transition-transform duration-300 transform will-change-transform"
                                    >
                                        {tab.content}
                                    </motion.div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
            <div className="absolute w-full bottom-0 inset-x-0 h-10 md:h-20 lg:h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        </div>
    );
};

export default Hero;
