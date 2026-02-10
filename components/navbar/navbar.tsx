'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { NavMenu } from '@/components/navbar/nav-menu';
import Loading from '@/components/navbar/loading';
import { NavigationSheet } from '@/components/navbar/navigation-sheet';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutDashboardIcon, LogOut } from 'lucide-react';
import { getData } from '@/lib/axios';

const Navbar = () => {
    const t = useTranslations('navigation');
    const router = useRouter();
    const { isAuthenticated, user, loading, refreshAuth } = useAuth();

    if (loading) return <Loading />;

    return (
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
            <nav className="h-16 px-4 xl:px-0">
                <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-8">
                        <Logo />
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        {isAuthenticated && user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer">
                                        {user?.picture ? (
                                            <img
                                                src={user.picture}
                                                alt={user.name || 'User Avatar'}
                                                className="h-10 w-10 object-cover"
                                            />
                                        ) : user?.name ? (
                                            <div className="h-10 w-10 bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        ) : (
                                            <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
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
                                        {t('dashboard')}
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
                                        {t('logout')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    className="hidden sm:inline-flex cursor-pointer font-medium"
                                    onClick={() =>
                                        router.push('/dashboard/urls')
                                    }
                                >
                                    {t('dashboard')}
                                </Button>
                                <Button
                                    className="bg-primary hover:bg-primary/90 cursor-pointer font-semibold shadow-lg shadow-primary/25"
                                    onClick={() => router.push('/signup')}
                                >
                                    {t('signup')}
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
