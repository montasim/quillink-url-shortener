'use client';

import { Button } from '@/components/ui/button';
import { SunIcon } from 'lucide-react';
import { Logo } from '@/components/logo';
import { NavMenu } from '@/components/navbar/nav-menu';
import { NavigationSheet } from '@/components/navbar/navigation-sheet';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar02Page = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Prevent early render before hydration

    return (
        <div className="bg-muted">
            <nav className="h-16 bg-background border-b">
                <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <Logo />

                        {/* Desktop Menu */}
                        <NavMenu className="hidden md:block" />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="hidden sm:inline-flex cursor-pointer"
                            onClick={() => router.push('/login')}
                        >
                            Sign In
                        </Button>
                        <Button
                            className="cursor-pointer"
                            onClick={() => router.push('/signup')}
                        >
                            Sign Up
                        </Button>

                        {/* Mobile Menu */}
                        <div className="md:hidden">
                            <NavigationSheet />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar02Page;
