'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, Copy, Share2, ChevronDown, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { downloadQRCode, copyQRCodeToClipboard, shareQRCode } from '@/lib/generateQRCodeClient';
import type { QRCodeOptions } from '@/lib/qrCodeTypes';

interface QRActionsProps {
    content: string;
    options: QRCodeOptions;
    disabled?: boolean;
}

const QRActions = ({ content, options, disabled }: QRActionsProps) => {
    const t = useTranslations('qrGenerator');
    const [isDownloading, setIsDownloading] = useState(false);
    const [isCopying, setIsCopying] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleDownload = async (format: 'png' | 'svg') => {
        if (!content) {
            toast.error(t('noContent'));
            return;
        }

        setIsDownloading(true);
        try {
            const filename = `qr-code-${Date.now()}`;
            await downloadQRCode(content, options, filename, format);
            toast.success(t('downloadSuccess', { format: format.toUpperCase() }));
        } catch (error) {
            toast.error(t('downloadError'));
        } finally {
            setIsDownloading(false);
        }
    };

    const handleCopy = async () => {
        if (!content) {
            toast.error(t('noContent'));
            return;
        }

        setIsCopying(true);
        try {
            const success = await copyQRCodeToClipboard(content, options);
            if (success) {
                setCopied(true);
                toast.success(t('copySuccess'));
                setTimeout(() => setCopied(false), 2000);
            } else {
                toast.error(t('copyError'));
            }
        } catch (error) {
            toast.error(t('copyError'));
        } finally {
            setIsCopying(false);
        }
    };

    const handleShare = async () => {
        if (!content) {
            toast.error(t('noContent'));
            return;
        }

        setIsSharing(true);
        try {
            const success = await shareQRCode(content, options, t('shareTitle'), t('shareText'));
            if (!success) {
                toast.error(t('shareError'));
            }
        } catch (error) {
            toast.error(t('shareError'));
        } finally {
            setIsSharing(false);
        }
    };

    const hasContent = !!content;

    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Download Button with Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="px-6 gap-2 rounded-xl font-bold shadow-lg shadow-primary/20"
                        disabled={disabled || !hasContent || isDownloading || isCopying || isSharing}
                    >
                        {isDownloading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Download className="w-5 h-5" />
                        )}
                        <span>{t('download')}</span>
                        <ChevronDown className="w-4 h-4 opacity-70" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDownload('png')} disabled={disabled || !hasContent}>
                        <span className="font-medium">PNG {t('imageFormat')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload('svg')} disabled={disabled || !hasContent}>
                        <span className="font-medium">SVG {t('vectorFormat')}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Copy to Clipboard */}
            <Button
                variant="outline"
                className="px-6 gap-2 rounded-xl font-bold"
                onClick={handleCopy}
                disabled={disabled || !hasContent || isDownloading || isCopying || isSharing}
            >
                {isCopying ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                ) : (
                    <Copy className="w-5 h-5" />
                )}
                <span>{copied ? t('copied') : t('copy')}</span>
            </Button>

            {/* Share Button */}
            <Button
                variant="secondary"
                className="px-6 gap-2 rounded-xl font-bold"
                onClick={handleShare}
                disabled={disabled || !hasContent || isDownloading || isCopying || isSharing}
            >
                {isSharing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Share2 className="w-5 h-5" />
                )}
                <span>{t('share')}</span>
            </Button>
        </div>
    );
};

export default QRActions;
