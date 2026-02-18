'use client';

import { Calendar, Copy, Link as LinkIcon, QrCode, ExternalLink, BarChart3, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { IShortUrl } from '@/types/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { deleteUrl } from '@/lib/actions/dashboard';
import QRCodeViewer from '@/components/QRCodeViewer';
import Image from 'next/image';
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
    const router = useRouter();
    const [showQrPopover, setShowQrPopover] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${url?.shortKey}`;
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
                    <div
                        className="shrink-0 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/urls/${url.shortKey}`);
                        }}
                    >
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
                        <span className="text-xs font-medium">{t('visit')}</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                        onClick={toggleQrPopover}
                    >
                        <QrCode className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{t('qrCode')}</span>
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
                            {isDeleting ? t('deleting') : t('delete')}
                        </span>
                    </Button>
                </div>
            </div>

            {/* QR Code Viewer */}
            <QRCodeViewer
                shortKey={url?.shortKey || ''}
                type="url"
                isOpen={showQrPopover}
                onClose={() => setShowQrPopover(false)}
                downloadFileName={`${url?.shortKey || 'qr-code'}-qr.png`}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-[400px] rounded-[32px] p-8 border-border/40 shadow-2xl bg-card/95 backdrop-blur-xl">
                    <DialogHeader className="space-y-4">
                        <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-destructive/20 shadow-sm transition-transform duration-500 group-hover:scale-110">
                            <Trash2 className="w-8 h-8 text-destructive" />
                        </div>
                        <div className="space-y-2 text-center">
                            <DialogTitle className="text-2xl font-black tracking-tight text-foreground">{t('areYouSure')}</DialogTitle>
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
                            {t('keepIt')}
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
                            {isDeleting ? t('deleting') : t('deleteLink')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default UrlCard;
