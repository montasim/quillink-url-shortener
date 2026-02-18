'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { QrCode, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LiveQRPreview from '@/components/qr/LiveQRPreview';
import FormatSelector from '@/components/qr/FormatSelector';
import ContentInput from '@/components/qr/ContentInput';
import QRControls from '@/components/qr/QRControls';
import QRActions from '@/components/qr/QRActions';
import { defaultQRCodeOptions, type QRContentType, type QRCodeOptions } from '@/lib/qrCodeTypes';
import { contentTypeLabels } from '@/lib/qrCodeTypes';
import { generateQRContent } from '@/lib/qrCodeTypes';

const QRGeneratorHero = () => {
    const t = useTranslations('home.qrHero');
    const qrT = useTranslations('qrGenerator');

    const [contentType, setContentType] = useState<QRContentType>('url');
    const [contentValue, setContentValue] = useState<any>('');
    const [qrOptions, setQrOptions] = useState<QRCodeOptions>(defaultQRCodeOptions);
    const [showCustomization, setShowCustomization] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Generate QR content based on type
    const getQRContent = () => {
        if (!contentValue) return '';
        return generateQRContent(contentType, contentValue);
    };

    const qrContent = getQRContent();

    // Advanced content types
    const advancedTypes: QRContentType[] = ['wifi', 'vcard', 'sms', 'email'];

    return (
        <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-background">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div
                    className="absolute bottom-1/4 -right-12 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse"
                    style={{ animationDelay: '2s' }}
                ></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Badge */}
                <div className="text-center">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm backdrop-blur-sm transition-all">
                        {t('badge')}
                    </Badge>

                    {/* Main Heading */}
                    <h1 className="mt-8 text-4xl md:text-5xl font-extrabold !leading-[1.1] tracking-tight text-foreground">
                        {t('headingPrefix')}
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[size:200%_auto] bg-clip-text text-transparent animate-[shine_5s_linear_infinite]">
                            {t('headingEmphasis')}
                        </span>{' '}
                        {t('headingSuffix')}
                    </h1>

                    {/* Subheading */}
                    <p className="mt-10 text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
                        {t('subheading')}
                    </p>
                </div>

                {/* Two-Column Generator Interface */}
                <div className="mt-14 grid lg:grid-cols-[3fr_2fr] gap-6 items-start">
                    {/* Left Column - Form */}
                    <div>
                        <div className="flex flex-col gap-4 p-4 bg-card/50 backdrop-blur-xl rounded-3xl border border-border/60 shadow-2xl shadow-primary/5 ring-1 ring-border/50">
                            {/* Format Selector Tabs */}
                            <div className="flex items-center justify-between gap-4">
                                <Label className="text-sm font-semibold">
                                    {qrT('formatLabel')}
                                </Label>
                                <FormatSelector
                                    value={contentType}
                                    onChange={setContentType}
                                />
                            </div>

                            {/* Content Input */}
                            <div className="pt-2 border-t border-border/60">
                                <ContentInput
                                    contentType={contentType}
                                    value={contentValue}
                                    onChange={setContentValue}
                                />
                            </div>

                            {/* Advanced Options Toggle */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="text-sm w-fit"
                            >
                                {showAdvanced
                                    ? qrT('hideAdvanced')
                                    : qrT('showAdvanced')}
                            </Button>

                            {/* Advanced Options - Only WiFi, vCard, SMS, Email */}
                            {showAdvanced && (
                                <div className="pt-2 border-t border-border/60">
                                    <div className="grid grid-cols-4 gap-2">
                                        {advancedTypes.map((type) => {
                                            const config =
                                                contentTypeLabels[type];
                                            const Icon = config.icon;
                                            const isSelected =
                                                contentType === type;

                                            return (
                                                <Button
                                                    key={type}
                                                    type="button"
                                                    variant={
                                                        isSelected
                                                            ? 'secondary'
                                                            : 'ghost'
                                                    }
                                                    size="sm"
                                                    onClick={() =>
                                                        setContentType(type)
                                                    }
                                                    className="py-2 flex flex-row items-center gap-2 h-11"
                                                    title={config.description}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    <span className="text-xs font-medium">
                                                        {config.label}
                                                    </span>
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Generate Button */}
                            <Button
                                disabled={!qrContent}
                                className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-10 py-5 rounded-[20px] shadow-2xl shadow-primary/20 transition-all group relative overflow-hidden active:scale-95 mt-2"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <QrCode className="w-5 h-5" />
                                    {qrT('generateButton') ||
                                        'Generate QR Code'}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Button>
                        </div>

                        {/* Agreement Text */}
                        <p className="mt-6 text-sm text-muted-foreground/60 font-medium">
                            {qrT('agreementPrefix')}{' '}
                            <Link
                                href="/terms"
                                className="text-primary hover:underline transition-colors decoration-2 underline-offset-4"
                            >
                                {qrT('terms')}
                            </Link>{' '}
                            {qrT('agreementSuffix')}{' '}
                            <Link
                                href="/privacy"
                                className="text-primary hover:underline transition-colors decoration-2 underline-offset-4"
                            >
                                {qrT('privacy')}
                            </Link>
                        </p>
                    </div>

                    {/* Right Column - Live Preview + Actions */}
                    <div className="lg:sticky lg:top-8 flex flex-col gap-6">
                        {/* Live Preview Card */}
                        <LiveQRPreview
                            content={qrContent}
                            options={qrOptions}
                        />

                        {/* Actions Card */}
                        <div className="p-4 bg-card/50 backdrop-blur-xl rounded-3xl border border-border/60 shadow-2xl shadow-primary/5 ring-1 ring-border/50">
                            <div className="flex flex-col gap-3">
                                {/* Action Buttons (Download, Copy, Share) */}
                                <QRActions
                                    content={qrContent}
                                    options={qrOptions}
                                />

                                {/* Customization Toggle */}
                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        setShowCustomization(!showCustomization)
                                    }
                                    className="w-full py-5 rounded-[20px] font-bold"
                                >
                                    <QrCode className="w-5 h-5" />
                                    {showCustomization
                                        ? qrT('hideCustomization')
                                        : qrT('showCustomization')}
                                </Button>

                                {/* Customization Panel */}
                                {showCustomization && (
                                    <div className="p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/60 animate-in fade-in slide-in-from-top-2">
                                        <QRControls
                                            options={qrOptions}
                                            onOptionsChange={setQrOptions}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
                    {['qrCreated', 'activeUsers', 'uptime', 'support'].map(
                        (statKey) => (
                            <div key={statKey} className="text-center group">
                                <div className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                                    {t(`stats.${statKey}.value`)}
                                </div>
                                <div className="mt-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                                    {t(`stats.${statKey}.label`)}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default QRGeneratorHero;
