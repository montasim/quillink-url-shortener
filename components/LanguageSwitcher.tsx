'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

export default function LanguageSwitcher({
    showIcon = true,
}: {
    showIcon?: boolean;
}) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const currentLanguage =
        languages.find((lang) => lang.code === locale) || languages[0];

    const handleLanguageChange = (newLocale: string) => {
        // Remove the current locale from the pathname
        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

        // Navigate to the new locale
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {showIcon ? (
                    <Button variant="ghost" size="sm" className="gap-2">
                        <Globe size={16} />
                        <span className="hidden sm:inline">
                            {currentLanguage.name}
                        </span>
                        <span className="sm:hidden">
                            {currentLanguage.flag}
                        </span>
                    </Button>
                ) : (
                    <p className="gap-2 ml-1 cursor-pointer">
                        <span className="hidden sm:inline">
                            {currentLanguage.name}
                        </span>

                        <span className="sm:hidden">
                            {currentLanguage.flag}
                        </span>
                    </p>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`cursor-pointer ${locale === language.code ? 'bg-accent' : ''}`}
                    >
                        <span className="mr-2">{language.flag}</span>
                        {language.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
