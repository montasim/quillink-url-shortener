'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import type { QRContentType } from '@/lib/qrCodeTypes';
import { contentTypeLabels } from '@/lib/qrCodeTypes';

interface FormatSelectorProps {
    value: QRContentType;
    onChange: (type: QRContentType) => void;
    disabled?: boolean;
}

export default function FormatSelector({
    value,
    onChange,
    disabled,
}: FormatSelectorProps) {
    const t = useTranslations('home.qr.generator');

    const formats: QRContentType[] = ['text', 'url', 'note'];

    return (
        <div className="inline-flex rounded-lg border bg-muted p-1">
            {formats.map((format) => {
                const config = contentTypeLabels[format];
                const Icon = config.icon;
                const isSelected = value === format;

                return (
                    <button
                        key={format}
                        type="button"
                        disabled={disabled}
                        onClick={() => onChange(format)}
                        className={cn(
                            'px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2',
                            isSelected
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground',
                            disabled && 'opacity-50 cursor-not-allowed'
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        {config.label}
                    </button>
                );
            })}
        </div>
    );
}
