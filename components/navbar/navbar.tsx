'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from '@/i18n/navigation';
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
    const t = useTranslations('layout.navigation');
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, user, loading, refreshAuth } = useAuth();

    // Determine dashboard destination based on current path
    const getDashboardPath = () => {
        if (pathname?.includes('/texts')) {
            return '/dashboard/texts';
        }
        return '/dashboard/urls';
    };

    const dashboardPath = getDashboardPath();

    if (loading) return <Loading />;

    return (
        <div className="sticky top-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-border/40">
            <nav className="h-20 px-4 xl:px-0">
                <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-10">
                        <Logo />
                        <div className="hidden md:block">
                            <NavMenu />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        {isAuthenticated && user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer shadow-lg shadow-primary/5 p-0.5 bg-gradient-to-tr from-primary to-secondary">
                                        <div className="h-full w-full rounded-full overflow-hidden bg-card">
                                            {user?.picture ? (
                                                <img
                                                    src={user.picture}
                                                    alt={user.name || 'User Avatar'}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : user?.name ? (
                                                <div className="h-full w-full flex items-center justify-center text-primary font-black text-lg italic">
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                            ) : (
                                                <div className="h-full w-full bg-muted animate-pulse rounded-full" />
                                            )}
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 rounded-2xl p-2 border-border/60 shadow-2xl shadow-primary/5 backdrop-blur-xl"
                                >
                                    <DropdownMenuItem
                                        onClick={() =>
                                            router.push(dashboardPath)
                                        }
                                        className="cursor-pointer rounded-xl h-11 font-medium"
                                    >
                                        <LayoutDashboardIcon className="w-4 h-4 mr-2 text-primary" />
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
                                        className="cursor-pointer text-red-500 rounded-xl h-11 font-medium focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        {t('logout')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    className="hidden sm:inline-flex cursor-pointer font-bold text-muted-foreground hover:text-primary transition-colors h-11 rounded-xl"
                                    onClick={() =>
                                        router.push(dashboardPath)
                                    }
                                >
                                    {t('dashboard')}
                                </Button>
                                <Button
                                    className="bg-primary hover:bg-primary/95 text-primary-foreground cursor-pointer font-black h-11 rounded-xl shadow-xl shadow-primary/20 px-6 active:scale-95 transition-all text-sm"
                                    onClick={() => router.push('/signup')}
                                >
                                    {t('signup')}
                                </Button>
                            </div>
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
