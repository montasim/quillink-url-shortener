'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Logo } from '@/components/logo';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { handleResetPassword } from '@/lib/actions/resetPassword';
import { ResetPasswordSchema } from '@/schemas/schemas';
import { toast } from 'sonner';
import { PasswordField } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import TurnstileField from '@/components/TurnstileField';
import { useTranslations } from 'next-intl';

const ResetPassword = () => {
    const t = useTranslations('auth.resetPassword');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [cfToken, setCfToken] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        mode: 'onChange',
        defaultValues: {
            token: '',
            newPassword: '',
            cfToken: '',
        },
        resolver: zodResolver(ResetPasswordSchema),
    });

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            form.setValue('token', token);
        } else {
            toast.error(t('noTokenError'));
            router.push('/login');
        }
    }, [searchParams, form, router, t]);

    const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
        const siteKey = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY;

        // Only require Turnstile token if site key is configured
        if (siteKey && !cfToken) {
            form.setError('newPassword', {
                type: 'manual',
                message: t('turnstileError'),
            });
            return;
        }

        await handleResetPassword(
            { ...data, cfToken: cfToken || 'dev-bypass' },
            setLoading,
            router
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-xs w-full flex flex-col items-center">
                <Logo />
                <p className="mt-4 text-xl font-bold tracking-tight text-primary">
                    {t('title')}
                </p>

                <div className="my-4 w-full flex items-center justify-center overflow-hidden">
                    <Separator />
                    <Separator />
                </div>

                <Form {...form}>
                    <form
                        className="w-full space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <PasswordField
                            control={form.control}
                            name="newPassword"
                            label={t('password')}
                            placeholder={t('password')}
                        />

                        <TurnstileField
                            onVerify={(token) => {
                                setCfToken(token);
                                form.setValue('cfToken', token);
                            }}
                        />

                        <SubmitButton
                            disabled={
                                !form.formState.isValid || loading || !cfToken
                            }
                            loading={loading}
                            loadingLabel={t('processing')}
                            label={t('submitButton')}
                        />
                    </form>
                </Form>

                <div className="mt-5 space-y-5">
                    <p className="text-sm text-center">
                        {t('rememberPassword')}
                        <Link
                            href="/login"
                            className="ml-1 underline text-muted"
                        >
                            {t('loginLink')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const ResetPasswordPage = () => {
    const t = useTranslations('auth.resetPassword');
    return (
        <Suspense fallback={<div>{t('loading')}</div>}>
            <ResetPassword />
        </Suspense>
    );
};

export default ResetPasswordPage;
