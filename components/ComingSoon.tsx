import { Flame } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

const ComingSoon = ({ text }: { text?: string }) => {
    const t = useTranslations('common');
    return (
        <div className="w-full py-10 text-center text-muted-foreground">
            <Flame className="mx-auto w-16 h-16 text-muted" />
            <p className="mt-2">{text || t('comingSoon')}</p>
        </div>
    );
};

export default ComingSoon;
