'use client';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export const NavMenu = (props: NavigationMenuProps) => {
    const t = useTranslations('navigation');
    const pathname = usePathname();

    // Determine textShares destination based on current path
    const getTextSharesPath = () => {
        if (pathname?.includes('/urls') || pathname?.includes('/url/')) {
            return '/dashboard/urls';
        }
        return '/dashboard/texts';
    };

    const textSharesPath = getTextSharesPath();

    return (
        <NavigationMenu {...props}>
            <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/">{t('home')}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href={textSharesPath}>{t('textShares')}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/contact-us">{t('contactUs')}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
