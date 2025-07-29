'use client';

import Turnstile from 'react-cloudflare-turnstile';
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';

interface Props {
    onVerify: (token: string) => void;
}

const TurnstileField = ({ onVerify }: Props) => {
    return (
        <FormItem>
            <FormLabel>Verify</FormLabel>
            <FormControl>
                <div className="w-full">
                    <Turnstile
                        turnstileSiteKey={
                            process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY! || ''
                        }
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
