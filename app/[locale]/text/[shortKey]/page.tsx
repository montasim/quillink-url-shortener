'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import TextShareCard from '@/components/textShare/TextShareCard';
import PasswordModal from '@/components/textShare/PasswordModal';
import ExpiredBanner from '@/components/textShare/ExpiredBanner';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { getData } from '@/lib/axios';

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
    const t = useTranslations('textShare.view');
    const params = useParams();
    const shortKey = params.shortKey as string;

    const [data, setData] = useState<TextShareData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const fetchTextShare = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getData(`${API_ENDPOINT.TEXT_SHARE_GET(shortKey)}`);
            if (response.success) {
                setData(response.data);
                if (response.data.requiresPassword) {
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
            const response = await fetch(`/api/v1/text/${shortKey}/verify-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const result = await response.json();

            if (result.success) {
                setShowPassword(false);
                fetchTextShare();
            } else {
                setPasswordError(result.message || t('invalidPassword'));
            }
        } catch {
            setPasswordError(t('invalidPassword'));
        } finally {
            setIsVerifying(false);
        }
    };

    useEffect(() => {
        fetchTextShare();
    }, [shortKey]);

    if (isLoading) {
        return (
            <div className="container mx-auto max-w-4xl py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-muted-foreground">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto max-w-4xl py-8">
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
        <div className="container mx-auto max-w-4xl py-8">
            {data.requiresPassword && (
                <PasswordModal
                    onSubmit={verifyPassword}
                    isLoading={isVerifying}
                    error={passwordError}
                />
            )}

            <TextShareCard
                shortKey={data.shortKey}
                title={data.title}
                content={data.content}
                format={data.format}
                syntaxLanguage={data.syntaxLanguage}
                viewCount={data.viewCount}
                baseUrl={process.env.NEXT_PUBLIC_BASE_URL || ''}
            />
        </div>
    );
}
