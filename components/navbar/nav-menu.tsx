import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export const NavMenu = (props: NavigationMenuProps) => {
    const t = useTranslations('navigation');

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
                        <Link href="/contact-us">{t('contactUs')}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
