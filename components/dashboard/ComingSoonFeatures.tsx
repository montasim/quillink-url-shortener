'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const ComingSoonFeatures = () => {
    return (
        <div className="relative w-full py-16 md:py-24 overflow-hidden rounded-[32px] border border-border/40 bg-card/30 backdrop-blur-sm">
            {/* Background Aesthetics - Matching Root Page */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>

            <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1.5 mb-8 hover:bg-primary/15 transition-colors cursor-default">
                        <Sparkles className="w-3.5 h-3.5 mr-2" />
                        Next-Gen Monitoring
                    </Badge>

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                        Live Pulse coming soon
                    </h2>
                    <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                        We're engineering an ultra-low latency engine to track your links in real-time. Watch growth happen as it occurs.
                    </p>

                    {/* Mock Analysis Stream Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        {[
                            { label: 'Active Sessions', icon: <Activity className="w-5 h-5" />, color: 'bg-emerald-500/10 text-emerald-500' },
                            { label: 'Live Click Stream', icon: <Zap className="w-5 h-5" />, color: 'bg-amber-500/10 text-amber-500' },
                        ].map((item, i) => (
                            <Card key={i} className="border-border/60 bg-background/50 backdrop-blur-md rounded-[24px] overflow-hidden group hover:border-primary/30 transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                                            {item.icon}
                                        </div>
                                        <span className="font-bold text-foreground">{item.label}</span>
                                    </div>
                                    <div className="space-y-3 opacity-30">
                                        <div className="h-2 w-full bg-muted rounded-full"></div>
                                        <div className="h-2 w-3/4 bg-muted rounded-full"></div>
                                        <div className="h-2 w-1/2 bg-muted rounded-full"></div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center opacity-20">
                                        <div className="h-8 w-20 bg-muted rounded-lg"></div>
                                        <div className="h-4 w-12 bg-muted rounded-full"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 px-5 py-2.5 bg-background/50 border border-border/50 rounded-full text-sm font-semibold text-primary shadow-sm hover:shadow-md transition-all">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Engine in Development
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ComingSoonFeatures;
