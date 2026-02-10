'use client';

import { Calendar, Copy, Link as LinkIcon, QrCode, ExternalLink, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { IShortUrl } from '@/types/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const UrlCard = ({ url }: { url: IShortUrl }) => {
    const t = useTranslations('dashboard');
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [showQrPopover, setShowQrPopover] = useState(false);
    const [copied, setCopied] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const shortUrl = `https://qlnk.app/${url?.shortKey}`;
    const fullUrl = url?.originalUrl;
    const date = new Date(url?.createdAt || '').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const copyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        toast.success(t('copiedToClipboard'));
        setTimeout(() => setCopied(false), 2000);
    };

    const redirectToDestination = () => {
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    const toggleQrPopover = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!showQrPopover) {
            const res = await fetch(`/api/v1/urls/qr-code/${url?.shortKey}`);
            if (res.ok) {
                const blob = await res.blob();
                setQrCodeUrl(URL.createObjectURL(blob));
            } else {
                setQrCodeUrl(null);
                toast.error(t('qrCodeFetchFailed'));
            }
        }
        setShowQrPopover(!showQrPopover);
    };

    // Click outside to close QR popover
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
            ) {
                setShowQrPopover(false);
            }
        };
        if (showQrPopover) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showQrPopover]);

    // Extract domain from URL
    const getDomain = (urlString: string) => {
        try {
            const urlObj = new URL(urlString);
            return urlObj.hostname.replace('www.', '');
        } catch {
            return 'Invalid URL';
        }
    };

    return (
        <Card
            className="group relative overflow-hidden bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
            {/* Gradient Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative p-5 space-y-4">
                {/* Header Section */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Icon */}
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center ring-1 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                            <LinkIcon className="w-6 h-6 text-primary" />
                        </div>

                        {/* URL Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                    {url?.shortKey}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "h-7 w-7 p-0 hover:bg-primary/10",
                                        copied && "bg-green-500/10"
                                    )}
                                    onClick={copyToClipboard}
                                >
                                    <Copy className={cn(
                                        "w-3.5 h-3.5 transition-colors",
                                        copied ? "text-green-600" : "text-muted-foreground hover:text-primary"
                                    )} />
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>{date}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Badge */}
                    <div className="shrink-0 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
                        <div className="flex items-center gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground">0</span>
                        </div>
                    </div>
                </div>

                {/* Destination URL */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/30">
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-muted-foreground hover:text-primary truncate transition-colors"
                        title={fullUrl}
                    >
                        {getDomain(fullUrl || '')}
                    </a>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                        onClick={(e) => {
                            e.stopPropagation();
                            redirectToDestination();
                        }}
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Visit</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                        onClick={toggleQrPopover}
                    >
                        <QrCode className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">QR Code</span>
                    </Button>
                </div>
            </div>

            {/* QR Popover with Backdrop */}
            {showQrPopover && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                        onClick={() => setShowQrPopover(false)}
                    />

                    {/* QR Code Modal */}
                    <div
                        ref={popoverRef}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-2xl shadow-2xl p-6 z-50 w-[280px] animate-in zoom-in-95 fade-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="space-y-4">
                            <div className="text-center">
                                <h3 className="font-semibold text-lg mb-1">QR Code</h3>
                                <p className="text-xs text-muted-foreground">Scan to visit link</p>
                            </div>

                            {qrCodeUrl ? (
                                <>
                                    <div className="bg-white p-4 rounded-xl border border-border">
                                        <Image
                                            src={qrCodeUrl}
                                            alt={t('qrCodeAlt')}
                                            width={200}
                                            height={200}
                                            unoptimized
                                            className="w-full h-auto"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 h-9"
                                            onClick={() => setShowQrPopover(false)}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 h-9 gap-2"
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.href = qrCodeUrl;
                                                link.download = `${url?.shortKey || 'qr-code'}-qr.png`;
                                                link.click();
                                                toast.success('QR Code downloaded');
                                            }}
                                        >
                                            Download
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center py-12">
                                    <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
};

export default UrlCard;
