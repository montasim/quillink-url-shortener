'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { sizePresets, errorCorrectionLevels, type QRCodeOptions } from '@/lib/qrCodeTypes';
import { Palette, Ruler, Shield } from 'lucide-react';

interface QRControlsProps {
    options: QRCodeOptions;
    onOptionsChange: (options: QRCodeOptions) => void;
    disabled?: boolean;
}

const QRControls = ({ options, onOptionsChange, disabled }: QRControlsProps) => {
    const t = useTranslations('home.qr.generator');

    const handleSizeChange = (value: string) => {
        onOptionsChange({ ...options, size: parseInt(value) });
    };

    const handleErrorCorrectionChange = (value: string) => {
        onOptionsChange({ ...options, errorCorrectionLevel: value as 'L' | 'M' | 'Q' | 'H' });
    };

    const handleForegroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onOptionsChange({ ...options, foregroundColor: e.target.value });
    };

    const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onOptionsChange({ ...options, backgroundColor: e.target.value });
    };

    const presetColors = [
        { dark: '#000000', light: '#ffffff', label: 'Classic' },
        { dark: '#1e40af', light: '#ffffff', label: 'Blue' },
        { dark: '#dc2626', light: '#ffffff', label: 'Red' },
        { dark: '#16a34a', light: '#ffffff', label: 'Green' },
        { dark: '#9333ea', light: '#ffffff', label: 'Purple' },
        { dark: '#ea580c', light: '#ffffff', label: 'Orange' },
        { dark: '#000000', light: '#fef3c7', label: 'Warm' },
        { dark: '#1e3a8a', light: '#dbeafe', label: 'Cool' },
    ];

    return (
        <div className="space-y-4">
            {/* Size Selection */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    <Label className="text-sm font-bold">{t('size')}</Label>
                </div>
                <Select
                    value={options.size.toString()}
                    onValueChange={handleSizeChange}
                    disabled={disabled}
                >
                    <SelectTrigger className="h-10">
                        <SelectValue placeholder={t('selectSize')} />
                    </SelectTrigger>
                    <SelectContent>
                        {sizePresets.map((preset) => (
                            <SelectItem key={preset.value} value={preset.value.toString()}>
                                {preset.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Error Correction Level */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <Label className="text-sm font-bold">{t('errorCorrection')}</Label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {errorCorrectionLevels.map((level) => (
                        <Button
                            key={level.value}
                            type="button"
                            variant={options.errorCorrectionLevel === level.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleErrorCorrectionChange(level.value)}
                            disabled={disabled}
                            className="h-10 px-2"
                            title={level.description}
                        >
                            <span className="font-bold text-sm">{level.value}</span>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-primary" />
                    <Label className="text-sm font-bold">{t('colors')}</Label>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium">{t('foregroundColor')}</Label>
                        <div className="flex gap-1.5">
                            <input
                                type="color"
                                value={options.foregroundColor}
                                onChange={handleForegroundColorChange}
                                disabled={disabled}
                                className="w-10 h-9 rounded-md border border-border cursor-pointer"
                            />
                            <input
                                type="text"
                                value={options.foregroundColor}
                                onChange={handleForegroundColorChange}
                                disabled={disabled}
                                className="flex-1 h-9 px-2 rounded-md border border-border bg-background text-xs font-mono"
                                placeholder="#000000"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium">{t('backgroundColor')}</Label>
                        <div className="flex gap-1.5">
                            <input
                                type="color"
                                value={options.backgroundColor}
                                onChange={handleBackgroundColorChange}
                                disabled={disabled}
                                className="w-10 h-9 rounded-md border border-border cursor-pointer"
                            />
                            <input
                                type="text"
                                value={options.backgroundColor}
                                onChange={handleBackgroundColorChange}
                                disabled={disabled}
                                className="flex-1 h-9 px-2 rounded-md border border-border bg-background text-xs font-mono"
                                placeholder="#ffffff"
                            />
                        </div>
                    </div>
                </div>

                {/* Preset Colors */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">{t('presetColors')}</Label>
                    <div className="flex flex-wrap gap-1.5">
                        {presetColors.map((preset, index) => (
                            <Button
                                key={index}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    onOptionsChange({
                                        ...options,
                                        foregroundColor: preset.dark,
                                        backgroundColor: preset.light,
                                    });
                                }}
                                disabled={disabled}
                                className="h-8 px-2 gap-1.5"
                                title={preset.label}
                            >
                                <div className="flex gap-0.5">
                                    <div
                                        className="w-3.5 h-3.5 rounded border"
                                        style={{ backgroundColor: preset.dark }}
                                    />
                                    <div
                                        className="w-3.5 h-3.5 rounded border"
                                        style={{ backgroundColor: preset.light }}
                                    />
                                </div>
                                <span className="text-xs font-medium">{preset.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRControls;
