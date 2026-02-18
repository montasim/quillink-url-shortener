'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Loader2, QrCode } from 'lucide-react';
import { generateQRCodeDataUrl } from '@/lib/generateQRCodeClient';
import type { QRCodeOptions } from '@/lib/qrCodeTypes';

interface LiveQRPreviewProps {
    content: string;
    options: QRCodeOptions;
    isLoading?: boolean;
}

const LiveQRPreview = ({ content, options, isLoading: parentLoading }: LiveQRPreviewProps) => {
    const t = useTranslations('qrGenerator');
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const isLoading = parentLoading || isGenerating;

    useEffect(() => {
        if (!content) {
            setQrCodeDataUrl(null);
            setError(null);
            return;
        }

        const generateQR = async () => {
            setIsGenerating(true);
            setError(null);

            try {
                // Debounce for long content
                const timeoutId = setTimeout(async () => {
                    try {
                        const dataUrl = await generateQRCodeDataUrl(content, options);
                        setQrCodeDataUrl(dataUrl);
                    } catch (err) {
                        setError(t('generationError') || 'Failed to generate QR code');
                        setQrCodeDataUrl(null);
                    } finally {
                        setIsGenerating(false);
                    }
                }, content.length > 100 ? 300 : 100);

                return () => clearTimeout(timeoutId);
            } catch (err) {
                setError(t('generationError') || 'Failed to generate QR code');
                setIsGenerating(false);
            }
        };

        generateQR();
    }, [content, options]);

    return (
        <div className="relative w-full">
            <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-xl rounded-3xl border border-border/60 shadow-2xl shadow-primary/5 p-4 ring-1 ring-border/50 h-full flex flex-col">
                {/* QR Code Display */}
                <div className="relative aspect-square w-full max-w-[200px] mx-auto flex-shrink-0">
                    {isLoading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/50 rounded-2xl">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <p className="text-xs text-muted-foreground font-medium animate-pulse">
                                {t('generating')}
                            </p>
                        </div>
                    ) : error ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-destructive/10 rounded-2xl border border-destructive/20">
                            <QrCode className="w-8 h-8 text-destructive" />
                            <p className="text-xs text-destructive font-medium text-center px-4">
                                {error}
                            </p>
                        </div>
                    ) : qrCodeDataUrl ? (
                        <div className="relative w-full h-full bg-white rounded-2xl border border-border shadow-inner p-3">
                            <Image
                                src={qrCodeDataUrl}
                                alt={t('qrCodeAlt') || 'QR Code'}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted/30 rounded-2xl border border-border/60">
                            <QrCode className="w-10 h-10 text-muted-foreground/40" />
                            <p className="text-xs text-muted-foreground font-medium">
                                {t('enterContent')}
                            </p>
                        </div>
                    )}
                </div>

                {/* Settings Summary */}
                <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground/60 flex-shrink-0">
                    <span className="font-medium">
                        {options.size}×{options.size}px
                    </span>
                    <span>•</span>
                    <span className="font-medium">
                        {t('errorCorrection')}: {options.errorCorrectionLevel}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LiveQRPreview;
