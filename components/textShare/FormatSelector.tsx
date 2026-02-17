'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface FormatSelectorProps {
    value: 'plain' | 'markdown' | 'code';
    onChange: (format: 'plain' | 'markdown' | 'code') => void;
    disabled?: boolean;
}

export default function FormatSelector({
    value,
    onChange,
    disabled,
}: FormatSelectorProps) {
    const t = useTranslations('textShare.create');

    const formats = [
        { value: 'plain' as const, label: t('formatPlain') },
        { value: 'markdown' as const, label: t('formatMarkdown') },
        { value: 'code' as const, label: t('formatCode') },
    ];

    return (
        <div className="inline-flex rounded-lg border bg-muted p-1">
            {formats.map((format) => (
                <button
                    key={format.value}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(format.value)}
                    className={cn(
                        'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                        value === format.value
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    {format.label}
                </button>
            ))}
        </div>
    );
}
