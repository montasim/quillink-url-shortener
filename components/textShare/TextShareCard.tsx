'use client';

import { useState } from 'react';
import { Copy, Download, QrCode, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TextShareCardProps {
    shortKey: string;
    title?: string;
    content: string;
    format: 'plain' | 'markdown' | 'code';
    syntaxLanguage?: string;
    viewCount?: number;
    baseUrl: string;
}

export default function TextShareCard({
    shortKey,
    title,
    content,
    format,
    syntaxLanguage,
    viewCount,
    baseUrl,
}: TextShareCardProps) {
    const [showQR, setShowQR] = useState(false);
    const shareUrl = `${baseUrl}/texts/${shortKey}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            toast.success('Copied to clipboard!');
        } catch {
            toast.error('Failed to copy');
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success('Link copied to clipboard!');
        } catch {
            toast.error('Failed to copy link');
        }
    };

    const handleDownload = (extension: 'txt' | 'md') => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${shortKey}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Download started!');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || 'Text Share',
                    text: content.slice(0, 100),
                    url: shareUrl,
                });
            } catch {
                handleCopyLink();
            }
        } else {
            handleCopyLink();
        }
    };

    return (
        <div className="rounded-lg border bg-card">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <div>
                    {title && <h2 className="font-semibold">{title}</h2>}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{format}</span>
                        {syntaxLanguage && (
                            <>
                                <span>•</span>
                                <span className="capitalize">
                                    {syntaxLanguage}
                                </span>
                            </>
                        )}
                        {viewCount !== undefined && (
                            <>
                                <span>•</span>
                                <span>{viewCount} views</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        title="Copy content"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        title="Share link"
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowQR(true)}
                        title="QR Code"
                    >
                        <QrCode className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload('txt')}
                        title="Download"
                    >
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <pre
                    className={cn(
                        'whitespace-pre-wrap break-words font-mono text-sm',
                        format === 'code' && 'bg-muted p-4 rounded-lg overflow-x-auto'
                    )}
                >
                    {content}
                </pre>
            </div>

            {/* QR Code Dialog */}
            <Dialog open={showQR} onOpenChange={setShowQR}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Scan to View</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                        <img
                            src={`/api/v1/texts/${shortKey}/qr`}
                            alt="QR Code"
                            className="w-48 h-48"
                            onError={(e) => {
                                // Fallback: generate QR from URL
                                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
                                (e.target as HTMLImageElement).src = qrUrl;
                            }}
                        />
                    </div>
                    <Button variant="outline" onClick={handleCopyLink}>
                        Copy Link
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
