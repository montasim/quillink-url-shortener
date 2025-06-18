'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { NavMenu } from '@/components/navbar/nav-menu';
import Loading from '@/components/navbar/loading';
import { NavigationSheet } from '@/components/navbar/navigation-sheet';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '@/components/navbar/actions';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutDashboardIcon, LogOut, User } from 'lucide-react';
import { IUserProfile } from '@/types/types';
import { getData } from '@/lib/axios';

const NavbarPage = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const verify = async () => {
            const { authenticated, user } = await checkAuth();
            setIsAuthenticated(authenticated);
            setUserProfile(user || null);
            setAuthChecked(true);
        };

        verify();
    }, []);

    if (!isMounted || !authChecked) {
        return <Loading />;
    }

    return (
        <div className="bg-muted">
            <nav className="h-16 bg-background border-b">
                <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <Logo />
                        <NavMenu className="hidden md:block" />
                    </div>

                    <div className="flex items-center gap-3">
                        {isAuthenticated && userProfile ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    {userProfile.picture ? (
                                        <img
                                            src={userProfile.picture}
                                            alt={
                                                userProfile.name ||
                                                'User Avatar'
                                            }
                                            className="h-10 w-10 rounded-full object-cover cursor-pointer"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg cursor-pointer">
                                            {userProfile.name
                                                ? userProfile.name
                                                      .charAt(0)
                                                      .toUpperCase()
                                                : 'U'}
                                        </div>
                                    )}
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
                                            // Call logout logic (API + clear cookies or redirect)
                                            await getData(
                                                '/api/v1/auth/logout'
                                            );
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
                            // If not authenticated, show Sign In/Sign Up buttons
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
