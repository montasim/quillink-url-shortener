import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const localePrefix = 'as-needed';

export const { Link, redirect, usePathname, useRouter } =
    createNavigation({ locales, defaultLocale, localePrefix });
