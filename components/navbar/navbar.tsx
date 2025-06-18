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

const Navbar = () => {
    const router = useRouter();
    const { isAuthenticated, user, loading, refreshAuth } = useAuth();

    console.log(user);

    if (loading) return <Loading />;

    return (
        <div className="bg-muted">
            <nav className="h-16 bg-background border-b">
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

export default Navbar;
