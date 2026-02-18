'use client';

import { Calendar, Copy, FileText, ExternalLink, BarChart3, Trash2, Lock, Clock, QrCode, Link as LinkIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import QRCodeViewer from '@/components/QRCodeViewer';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface TextShare {
    id: string;
    shortKey: string;
    title?: string;
    content: string;
    format: string;
    viewCount: number;
    createdAt: string;
    expiresAt?: string;
    requiresPassword?: boolean;
    customSlug?: string;
}

interface TextShareCardProps {
    share: TextShare;
    onRefresh: () => void;
}

const TextShareCard = ({ share, onRefresh }: TextShareCardProps) => {
    const t = useTranslations('dashboard.texts');
    const router = useRouter();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showQrPopover, setShowQrPopover] = useState(false);

    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/texts/${share?.shortKey}`;
    const date = new Date(share?.createdAt || '').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const isExpired = share.expiresAt && new Date(share.expiresAt) < new Date();
    const hasPassword = share.requiresPassword;

    const copyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success(t('linkCopiedAlert'));
        setTimeout(() => setCopied(false), 2000);
    };

    const redirectToShare = () => {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/v1/texts/${share.shortKey}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                toast.success(t('deleteSuccess'));
                onRefresh();
            } else {
                toast.error(result.message || t('deleteError'));
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || t('deleteError'));
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    };

    const getContentPreview = () => {
        const preview = share.content.slice(0, 80);
        return share.content.length > 80 ? preview + '...' : preview;
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
                            <FileText className="w-6 h-6 text-primary" />
                        </div>

                        {/* Share Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                    {share?.title || share?.shortKey}
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
                            router.push(`/dashboard/texts/${share.shortKey}`);
                        }}
                    >
                        <div className="flex items-center gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground">{share.viewCount || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Content Preview */}
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/30">
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground truncate flex-1">
                        {getContentPreview()}
                    </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted/50 border border-border/50 capitalize">
                        {share.format}
                    </span>
                    {share.customSlug && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" />
                            Custom URL
                        </span>
                    )}
                    {hasPassword && (
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Protected
                        </span>
                    )}
                    {isExpired && (
                        <span className="text-xs px-2 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Expired
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                        onClick={(e) => {
                            e.stopPropagation();
                            redirectToShare();
                        }}
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">View</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowQrPopover(true);
                        }}
                    >
                        <QrCode className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{t('qrCode') || 'QR Code'}</span>
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

            {/* QR Code Viewer */}
            <QRCodeViewer
                shortKey={share?.shortKey || ''}
                type="text"
                isOpen={showQrPopover}
                onClose={() => setShowQrPopover(false)}
                downloadFileName={`${share?.shortKey || 'qr-code'}-qr.png`}
            />

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
                                This action cannot be undone. The text share will be permanently deleted.
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
                            onClick={handleDelete}
                            className="flex-1 h-12 rounded-xl font-bold bg-destructive text-white hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all duration-300 active:scale-95"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default TextShareCard;
