'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { contentTypeLabels, type QRContentType } from '@/lib/qrCodeTypes';

interface TypeSelectorProps {
    value: QRContentType;
    onChange: (type: QRContentType) => void;
    disabled?: boolean;
}

const TypeSelector = ({ value, onChange, disabled }: TypeSelectorProps) => {
    const t = useTranslations('qrGenerator');

    const types: QRContentType[] = ['text', 'url', 'note', 'wifi', 'vcard', 'sms', 'email'];
    const basicTypes: QRContentType[] = ['text', 'url', 'note'];
    const advancedTypes: QRContentType[] = ['wifi', 'vcard', 'sms', 'email'];

    return (
        <div className="space-y-6">
            {/* Basic Types */}
            <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('basicTypes')}
                </p>
                <div className="grid grid-cols-3 gap-2">
                    {basicTypes.map((type) => {
                        const config = contentTypeLabels[type];
                        const Icon = config.icon;
                        const isSelected = value === type;

                        return (
                            <Button
                                key={type}
                                type="button"
                                variant={isSelected ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => onChange(type)}
                                disabled={disabled}
                                className="py-2 flex gap-2"
                            >
                                <Icon className="w-6 h-6" />
                                <span className="text-xs font-bold">{config.label}</span>
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Advanced Types */}
            <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('advancedTypes')}
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {advancedTypes.map((type) => {
                        const config = contentTypeLabels[type];
                        const Icon = config.icon;
                        const isSelected = value === type;

                        return (
                            <Button
                                key={type}
                                type="button"
                                variant={isSelected ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => onChange(type)}
                                disabled={disabled}
                                className="py-2 flex gap-2"
                                title={config.description}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-xs font-medium">{config.label}</span>
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TypeSelector;
