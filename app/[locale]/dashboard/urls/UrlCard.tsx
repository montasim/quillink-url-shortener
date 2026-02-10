'use client';

import { Calendar, Copy, Link as LinkIcon, QrCode, ExternalLink, BarChart3, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { IShortUrl } from '@/types/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { deleteUrl } from '@/lib/actions/dashboard';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const UrlCard = ({ url, onRefresh }: { url: IShortUrl, onRefresh: () => void }) => {
    const t = useTranslations('dashboard');
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [showQrPopover, setShowQrPopover] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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
                            <span className="text-xs font-medium text-foreground">{url.clicks || 0}</span>
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

                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "flex-1 gap-2 h-9 border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all duration-300",
                            isDeleting && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteDialog(true);
                        }}
                        disabled={isDeleting}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </span>
                    </Button>
                </div>
            </div>

            {/* QR Popover with Backdrop */}
            {showQrPopover && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-300"
                        onClick={() => setShowQrPopover(false)}
                    />

                    {/* QR Code Modal */}
                    <div
                        ref={popoverRef}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl p-8 z-50 w-[320px] animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="space-y-6">
                            <div className="text-center space-y-1">
                                <h3 className="font-bold text-xl text-foreground">QR Code</h3>
                                <p className="text-sm text-muted-foreground">Scan to visit your link</p>
                            </div>

                            {qrCodeUrl ? (
                                <>
                                    <div className="bg-white p-4 rounded-2xl border border-border shadow-inner">
                                        <Image
                                            src={qrCodeUrl}
                                            alt={t('qrCodeAlt')}
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
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.href = qrCodeUrl;
                                                link.download = `${url?.shortKey || 'qr-code'}-qr.png`;
                                                link.click();
                                                toast.success('QR Code downloaded');
                                            }}
                                        >
                                            Download QR
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full h-11 rounded-xl text-muted-foreground hover:text-foreground"
                                            onClick={() => setShowQrPopover(false)}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 gap-4">
                                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                    <p className="text-sm text-muted-foreground animate-pulse">Generating...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-[400px] rounded-[32px] p-8 border-border/40 shadow-2xl bg-card/95 backdrop-blur-xl">
                    <DialogHeader className="space-y-4">
                        <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-destructive/20 shadow-sm transition-transform duration-500 group-hover:scale-110">
                            <Trash2 className="w-8 h-8 text-destructive" />
                        </div>
                        <div className="space-y-2 text-center">
                            <DialogTitle className="text-2xl font-black tracking-tight text-foreground">Are you sure?</DialogTitle>
                            <DialogDescription className="text-base text-muted-foreground font-medium leading-relaxed">
                                {t('confirmDelete')}
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                            className="flex-1 h-12 rounded-xl font-bold border-border bg-background hover:bg-muted transition-all duration-300"
                        >
                            Keep it
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                deleteUrl(url?.shortKey || '', setIsDeleting, () => {
                                    setShowDeleteDialog(false);
                                    onRefresh();
                                });
                            }}
                            className="flex-1 h-12 rounded-xl font-bold bg-destructive text-white hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all duration-300 active:scale-95"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Link'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default UrlCard;
