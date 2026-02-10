'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';

const SimpleNavbar = () => {
    return (
        <div className="sticky top-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-border/40">
            <nav className="h-20 px-4 xl:px-0">
                <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-10">
                        <Logo />
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="outline" className="h-11 px-6 rounded-xl font-bold text-base">
                                Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default SimpleNavbar;