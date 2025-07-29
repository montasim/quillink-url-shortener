'use client';

import Turnstile from 'react-cloudflare-turnstile';
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { useTranslations } from 'next-intl';

interface Props {
    onVerify: (token: string) => void;
}

const TurnstileField = ({ onVerify }: Props) => {
    const t = useTranslations('common');
    const siteKey = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY;

    if (!siteKey) {
        return;
    }

    return (
        <FormItem>
            <FormLabel>{t('verify')}</FormLabel>
            <FormControl>
                <div className="w-full">
                    <Turnstile
                        turnstileSiteKey={siteKey}
                        callback={onVerify}
                        theme="light"
                    />
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};

export default TurnstileField;
