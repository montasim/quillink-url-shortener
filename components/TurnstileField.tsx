'use client';

import Turnstile from 'react-cloudflare-turnstile';
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import configuration from '@/configuration/configuration';

interface Props {
    onVerify: (token: string) => void;
}

const TurnstileField = ({ onVerify }: Props) => {
    const t = useTranslations('common');
    const siteKey = configuration.turnstile.siteKey;

    return (
        <FormItem>
            <FormLabel>{t('verify')}</FormLabel>
            <FormControl>
                <div className="w-full">
                    <Turnstile
                        turnstileSiteKey={siteKey}
                        callback={onVerify}
                        size={'flexible'}
                        theme="light"
                        retry="auto"
                        refreshExpired="auto"
                    />
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};

export default TurnstileField;
