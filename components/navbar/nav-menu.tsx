'use client';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Link2Icon, FileTextIcon } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';

export const NavMenu = (props: NavigationMenuProps) => {
    const t = useTranslations('layout.navigation');
    const router = useRouter();

    return (
        <NavigationMenu {...props}>
            <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/urls">{t('urlShortner')}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/texts">{t('textShares')}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/qr">{t('qrCode')}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-auto p-0 font-medium text-muted-foreground hover:text-primary gap-1"
                            >
                                {t('dashboard')}
                                <ChevronDown className="w-3 h-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="w-56 rounded-2xl p-2 border-border/60 shadow-2xl shadow-primary/5 backdrop-blur-xl"
                        >
                            <DropdownMenuItem
                                onClick={() => router.push('/dashboard/urls')}
                                className="cursor-pointer rounded-xl h-11 font-medium"
                            >
                                <Link2Icon className="w-4 h-4 mr-2 text-primary" />
                                {t('dashboardLinks')}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => router.push('/dashboard/texts')}
                                className="cursor-pointer rounded-xl h-11 font-medium"
                            >
                                <FileTextIcon className="w-4 h-4 mr-2 text-primary" />
                                {t('dashboardTexts')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/pricing">{t('pricing')}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
