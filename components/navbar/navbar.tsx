'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { NavMenu } from '@/components/navbar/nav-menu';
import { NavigationSheet } from '@/components/navbar/navigation-sheet';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const checkAuth = async (): Promise<boolean> => {
    try {
        console.log("Checking authentication...");
        const res = await fetch('/api/v1/auth/me', {
            method: 'GET',
            credentials: 'include',
        });

        console.log("Auth check response status:", res.status);

        if (res.status === 200) {
            console.log("User is authenticated via /me endpoint.");
            return true;
        }

        if (res.status === 401) {
            console.log("Unauthorized, attempting to refresh token...");
            const refreshRes = await fetch('/api/v1/auth/refresh', {
                method: 'GET',
                credentials: 'include',
            });

            console.log("Refresh token response status:", refreshRes.status);
            if (refreshRes.status === 200) {
                console.log("Token refreshed successfully.");
                return true;
            } else {
                console.log("Failed to refresh token.");
                return false;
            }
        }

        console.log("Authentication failed with status:", res.status);
        return false;
    } catch (err) {
        console.error("Error during authentication check:", err);
        return false;
    }
};

const NavbarPage = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false); // 👈 new

    useEffect(() => {
        setIsMounted(true);

        const verify = async () => {
            const result = await checkAuth();
            console.log("Authentication check result:", result); // Log the final result
            setIsAuthenticated(result);
        };

        verify();
    }, []);

    if (!isMounted || !authChecked) return null; // 👈 wait for auth check

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
