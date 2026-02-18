'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface QRCodeViewerProps {
    shortKey: string;
    type: 'url' | 'text';
    isOpen: boolean;
    onClose: () => void;
    downloadFileName?: string;
}

export default function QRCodeViewer({
    shortKey,
    type,
    isOpen,
    onClose,
    downloadFileName,
}: QRCodeViewerProps) {
    const t = useTranslations(type === 'url' ? 'dashboard' : 'textShare.dashboard');
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const endpoint = type === 'url'
        ? `/api/v1/urls/qr-code/${shortKey}`
        : `/api/v1/texts/qr-code/${shortKey}`;

    useEffect(() => {
        if (isOpen && !qrCodeUrl) {
            fetchQRCode();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const fetchQRCode = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(endpoint);
            if (res.ok) {
                const blob = await res.blob();
                setQrCodeUrl(URL.createObjectURL(blob));
            } else {
                setQrCodeUrl(null);
                toast.error(t('qrCodeFetchFailed') || 'Failed to fetch QR code');
            }
        } catch {
            setQrCodeUrl(null);
            toast.error(t('qrCodeFetchFailed') || 'Failed to fetch QR code');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!qrCodeUrl) return;
        const link = document.createElement('a');
        link.href = qrCodeUrl;
        link.download = downloadFileName || `${shortKey}-qr.png`;
        link.click();
        toast.success(t('qrCodeDownloaded') || 'QR code downloaded');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* QR Code Modal */}
            <div
                ref={popoverRef}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl p-8 z-50 w-[320px] animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="space-y-6">
                    <div className="text-center space-y-1">
                        <h3 className="font-bold text-xl text-foreground">{t('qrCode') || 'QR Code'}</h3>
                        <p className="text-sm text-muted-foreground">{t('scanToVisit') || 'Scan to visit'}</p>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-sm text-muted-foreground animate-pulse">{t('generating') || 'Generating...'}</p>
                        </div>
                    ) : qrCodeUrl ? (
                        <>
                            <div className="bg-white p-4 rounded-2xl border border-border shadow-inner">
                                <Image
                                    src={qrCodeUrl}
                                    alt={t('qrCodeAlt') || 'QR Code'}
                                    width={240}
                                    height={240}
                                    unoptimized
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    size="sm"
                                    className="w-full h-11 gap-2 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                                    onClick={handleDownload}
                                >
                                    {t('downloadQr') || 'Download QR'}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full h-11 rounded-xl text-muted-foreground hover:text-foreground"
                                    onClick={onClose}
                                >
                                    {t('close') || 'Close'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="w-10 h-10 border-4 border-destructive/20 border-t-destructive rounded-full" />
                            <p className="text-sm text-destructive">{t('qrCodeUnavailable') || 'QR code unavailable'}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
