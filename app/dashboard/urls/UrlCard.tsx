'use client';

import { Calendar, Copy, Link as LinkIcon, QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { IShortUrl } from '@/types/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const UrlCard = ({ url }: { url: IShortUrl }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [showQrPopover, setShowQrPopover] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const shortUrl = `https://qlnk.app/${url?.shortKey}`;
    const fullUrl = url?.originalUrl;
    const date = new Date(url?.createdAt || '').toLocaleDateString();

    const copyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(shortUrl);
        toast.success('Copied to clipboard');
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
                toast.error('QR Code fetch failed.');
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

    return (
        <Card
            className="w-full bg-white border flex flex-col gap-1 px-4 py-3 rounded-md hover:shadow-lg transition-all duration-150 cursor-pointer relative"
            onClick={redirectToDestination}
        >
            <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-3">
                    {/* Icon or favicon */}
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs shrink-0">
                        ⚡
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 font-semibold text-sm">
                            <span className="truncate max-w-[140px]">
                                {shortUrl}
                            </span>
                            <Copy
                                className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary"
                                onClick={copyToClipboard}
                            />
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-2 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{date}</span>
                            <span>•</span>
                            <a
                                href={fullUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="hover:underline max-w-[160px] truncate"
                            >
                                {fullUrl}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 items-center mt-1">
                    <LinkIcon
                        className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            redirectToDestination();
                        }}
                    />
                    <QrCode
                        className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary"
                        onClick={toggleQrPopover}
                    />
                </div>
            </div>

            {/* QR Popover */}
            {showQrPopover && (
                <div
                    ref={popoverRef}
                    className="absolute right-4 top-full mt-2 bg-white border rounded-xl shadow-lg p-4 z-50 flex flex-col items-center w-56 animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    {qrCodeUrl ? (
                        <>
                            <Image
                                src={qrCodeUrl}
                                alt="QR Code"
                                width={160}
                                height={160}
                                unoptimized
                                className="rounded-lg border"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-xs font-medium"
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = qrCodeUrl;
                                    link.download = `${url.shortKey}-qr.png`;
                                    link.click();
                                }}
                            >
                                ⬇ Download QR Code
                            </Button>
                        </>
                    ) : (
                        <p className="text-xs text-muted-foreground">
                            Loading...
                        </p>
                    )}
                </div>
            )}
        </Card>
    );
};

export default UrlCard;
