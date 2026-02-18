'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    FileText,
    Copy,
    Download,
    QrCode,
    Share2,
    Lock,
    Clock,
} from 'lucide-react';
import PasswordModal from '@/components/textShare/PasswordModal';
import ExpiredBanner from '@/components/textShare/ExpiredBanner';
import FormatSelector from '@/components/textShare/FormatSelector';
import TextShareViewSkeleton from '@/components/textShare/TextShareViewSkeleton';
import QRCodeViewer from '@/components/QRCodeViewer';
import API_ENDPOINT from '@/constants/apiEndPoint';
import configuration from '@/configuration/configuration';
import { getData } from '@/lib/axios';
import { cn } from '@/lib/utils';

interface TextShareData {
    shortKey: string;
    title?: string;
    content: string;
    format: 'plain' | 'markdown' | 'code';
    syntaxLanguage?: string;
    viewCount: number;
    requiresPassword: boolean;
    expiresAt?: string;
    viewLimit?: number;
}

export default function ViewTextSharePage() {
    const t = useTranslations('dashboard.texts.view');
    const createT = useTranslations('dashboard.texts.create');
    const params = useParams();
    const shortKey = params.shortKey as string;

    const [data, setData] = useState<TextShareData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const fetchTextShare = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getData(`${API_ENDPOINT.TEXT_SHARE_GET(shortKey)}`);
            if (response.success) {
                setData(response.data);
                // Only show password modal if not already verified
                if (response.data.requiresPassword && !isPasswordVerified) {
                    setShowPassword(true);
                }
            } else {
                setError(response.message || t('errors.serverError'));
            }
        } catch (err: any) {
            const status = err.response?.status;
            if (status === 410) {
                setError('expired');
            } else if (status === 404) {
                setError('notFound');
            } else {
                setError(err.response?.data?.message || t('errors.serverError'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const verifyPassword = async (password: string) => {
        setIsVerifying(true);
        setPasswordError(null);

        try {
            const response = await fetch(`/api/v1/texts/${shortKey}/verify-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const result = await response.json();

            if (result.success) {
                // Mark as verified and hide modal
                setIsPasswordVerified(true);
                setShowPassword(false);
                // No need to re-fetch - we already have the data
            } else {
                setPasswordError(result.message || t('invalidPassword'));
            }
        } catch {
            setPasswordError(t('invalidPassword'));
        } finally {
            setIsVerifying(false);
        }
    };

    const handleCopy = async () => {
        if (!data) return;
        try {
            await navigator.clipboard.writeText(data.content);
            toast.success(t('copySuccess'));
        } catch {
            toast.error(t('copyError'));
        }
    };

    const handleCopyLink = async () => {
        const shareUrl = `${window.location.origin}/texts/${shortKey}`;
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success('Link copied to clipboard!');
        } catch {
            toast.error('Failed to copy link');
        }
    };

    const handleDownload = (extension: 'txt' | 'md') => {
        if (!data) return;
        const blob = new Blob([data.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.title || shortKey}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Download started!');
    };

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/texts/${shortKey}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: data?.title || 'Text Share',
                    text: data?.content.slice(0, 100),
                    url: shareUrl,
                });
            } catch {
                handleCopyLink();
            }
        } else {
            handleCopyLink();
        }
    };

    useEffect(() => {
        fetchTextShare();
    }, [shortKey]);

    if (isLoading) {
        return <TextShareViewSkeleton />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {error === 'expired' ? (
                    <ExpiredBanner message={t('expired')} />
                ) : error === 'notFound' ? (
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <h2 className="text-xl font-semibold mb-2">
                            {t('errors.notFound')}
                        </h2>
                        <p className="text-muted-foreground">
                            This text share may have been deleted or never existed.
                        </p>
                    </div>
                ) : (
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <h2 className="text-xl font-semibold mb-2">Error</h2>
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                )}
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className={cn(
                "relative z-10 max-w-5xl mx-auto px-6 py-24 transition-all duration-300",
                showPassword && "blur-lg pointer-events-none select-none"
            )}>
                {/* Badge */}
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm backdrop-blur-sm transition-all mb-8">
                    <FileText className="w-3.5 h-3.5 mr-2" />
                    View Only
                </Badge>

                <p className="text-lg text-muted-foreground/80 max-w-3xl mb-8">
                    Shared via {configuration.app.name} Text Share
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="gap-2"
                    >
                        <Copy className="h-4 w-4" />
                        Copy
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="gap-2"
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowQR(true)}
                        className="gap-2"
                    >
                        <QrCode className="h-4 w-4" />
                        QR Code
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload('txt')}
                        className="gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                </div>

                {/* Content Area */}
                <div className="flex flex-col gap-4 p-4 bg-card/50 backdrop-blur-xl rounded-3xl border border-border/60 shadow-2xl shadow-primary/5 ring-1 ring-border/50">
                    {/* Title Input (read-only) */}
                    <Input
                        value={data.title || data.shortKey}
                        readOnly
                        disabled
                        placeholder="Title"
                        className="h-11 bg-muted/50 border-0"
                    />

                    {/* Content Textarea (read-only) */}
                    <textarea
                        value={data.content}
                        readOnly
                        disabled
                        className={cn(
                            'w-full min-h-[300px] p-4 bg-background/50 border border-border rounded-xl resize-y font-mono text-sm',
                            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                            data.format === 'code' && 'bg-muted'
                        )}
                    />

                    {/* Format & Language (disabled) */}
                    <div className="flex items-center justify-between gap-4 pt-2 border-t">
                        <Label className="text-sm font-semibold">Format</Label>
                        <FormatSelector
                            value={data.format}
                            onChange={() => {}}
                            disabled
                        />
                    </div>

                    {data.format === 'code' && data.syntaxLanguage && (
                        <div className="flex items-center justify-between gap-4 pt-2 border-t">
                            <Label className="text-sm font-semibold">
                                Language
                            </Label>
                            <select
                                value={data.syntaxLanguage}
                                disabled
                                className="w-full max-w-xs h-11 px-4 rounded-xl border border-border bg-muted text-sm"
                            >
                                <option value={data.syntaxLanguage}>
                                    {data.syntaxLanguage}
                                </option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{data.viewCount || 0} views</span>
                    </div>
                    {data.expiresAt && (
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                                Expires:{' '}
                                {new Date(data.expiresAt).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* QR Code Viewer */}
            <QRCodeViewer
                shortKey={shortKey}
                type="text"
                isOpen={showQR}
                onClose={() => setShowQR(false)}
            />

            {/* Password Modal */}
            {showPassword && (
                <PasswordModal
                    onSubmit={verifyPassword}
                    isLoading={isVerifying}
                    error={passwordError}
                />
            )}
        </div>
    );
}
