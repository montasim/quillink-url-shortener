'use client';

import Turnstile from 'react-cloudflare-turnstile';

interface Props {
    onVerify: (token: string) => void;
}

const TurnstileField = ({ onVerify }: Props) => {
    return (
        <Turnstile
            turnstileSiteKey={
                process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY! || ''
            }
            callback={onVerify}
            theme="light"
        />
    );
};

export default TurnstileField;
