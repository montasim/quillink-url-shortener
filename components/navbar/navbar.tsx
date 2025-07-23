'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { NavMenu } from '@/components/navbar/nav-menu';
import Loading from '@/components/navbar/loading';
import { NavigationSheet } from '@/components/navbar/navigation-sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutDashboardIcon, LogOut } from 'lucide-react';
import { getData } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const router = useRouter();
    const { isAuthenticated, user, loading, refreshAuth } = useAuth();
    const [onTop, setOnTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setOnTop(window.scrollY < window.innerHeight / 2);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10, }}
                animate={{ opacity: 1, y: 0, }}
                // transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="fixed top-0 left-0 w-full z-50">
                <nav className={cn(
                    "h-16 transition-colors duration-200",
                    onTop ? 'shadow-none text-background' : 'bg-background/10 backdrop-blur-2xl shadow-lg text-foreground'
                )}>
                    <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-8">
                            <Logo />
                            <NavMenu className="hidden md:block" />
                        </div>

                        <div className="flex items-center gap-3">
                            {isAuthenticated && user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="h-10 w-10 rounded-full overflow-hidden">
                                            {user?.picture ? (
                                                // Only render when picture is valid
                                                <img
                                                    src={user.picture}
                                                    alt={user.name || 'User Avatar'}
                                                    className="h-10 w-10 object-cover cursor-pointer"
                                                />
                                            ) : user?.name ? (
                                                // Use name fallback
                                                <div className="h-10 w-10 bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg cursor-pointer">
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                            ) : (
                                                // Blank skeleton while waiting
                                                <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full" />
                                            )}
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-48"
                                    >
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push('/dashboard/urls')
                                            }
                                            className="cursor-pointer"
                                        >
                                            <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={async () => {
                                                await getData(
                                                    '/api/v1/auth/logout'
                                                );
                                                await refreshAuth();
                                                router.push('/login');
                                            }}
                                            className="cursor-pointer text-red-600"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        className="hidden sm:inline-flex cursor-pointer text-foreground"
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
            </motion.div>
        </AnimatePresence>
    );
};

export default Navbar;
