'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { NavMenu } from '@/components/navbar/nav-menu';
import { NavigationSheet } from '@/components/navbar/navigation-sheet';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Assuming checkAuth remains the same as previously defined
export const checkAuth = async (): Promise<boolean> => {
    try {
        const res = await fetch('/api/v1/auth/me', {
            method: 'GET',
            credentials: 'include',
        });

        if (res.status === 200) {
            return true;
        }

        if (res.status === 401) {
            const refreshRes = await fetch('/api/v1/auth/refresh', {
                method: 'GET',
                credentials: 'include',
            });
            return refreshRes.status === 200;
        }
        return false;
    } catch (err) {
        console.error('Error during authentication check:', err);
        return false;
    }
};

const NavbarPage = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const verify = async () => {
            const result = await checkAuth();
            setIsAuthenticated(result);
            setAuthChecked(true); // Indicate that auth check is complete
        };

        verify();
    }, []);

    // --- Loading State ---
    if (!isMounted || !authChecked) {
        // Render a basic skeleton or loading indicator for the navbar
        return (
            <div className="bg-muted">
                <nav className="h-16 bg-background border-b animate-pulse">
                    <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-8">
                            <div className="h-6 w-24 bg-gray-200 rounded"></div>{' '}
                            {/* Skeleton for Logo */}
                            <div className="hidden md:flex gap-4">
                                <div className="h-6 w-20 bg-gray-200 rounded"></div>{' '}
                                {/* Skeleton for NavMenu items */}
                                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-20 bg-gray-200 rounded"></div>{' '}
                            {/* Skeleton for Buttons */}
                            <div className="h-10 w-10 bg-gray-200 rounded-full md:hidden"></div>{' '}
                            {/* Skeleton for Mobile Menu */}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    // --- End Loading State ---

    return (
        <div className="bg-muted">
            <nav className="h-16 bg-background border-b">
                <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <Logo />
                        <NavMenu className="hidden md:block" />
                    </div>

                    <div className="flex items-center gap-3">
                        {!isAuthenticated && (
                            <>
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
                            </>
                        )}
                        <div className="md:hidden">
                            <NavigationSheet />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarPage;
