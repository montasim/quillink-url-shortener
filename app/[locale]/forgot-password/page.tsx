'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/logo';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { handleForgotPassword } from '@/lib/actions/forgotPassword';
import { ForgotPasswordSchema } from '@/schemas/schemas';
import { TextField } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import TurnstileField from '@/components/TurnstileField';
import LanguageOfferSwitcher from '@/components/LanguageOfferSwitcher';

const ForgotPasswordPage = () => {
    const t = useTranslations('auth.forgotPassword');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [cfToken, setCfToken] = useState<string | null>(null);

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            cfToken: '',
        },
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
        const siteKey = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY;

        // Only require Turnstile token if site key is configured
        if (siteKey && !cfToken) {
            form.setError('email', {
                type: 'manual',
                message: t('turnstileError'),
            });
            return;
        }

        await handleForgotPassword(
            { ...data, cfToken: cfToken || 'dev-bypass' },
            setLoading,
            router
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-xs w-full flex flex-col items-center">
                <Logo />
                <p className="mt-4 text-xl font-bold tracking-tight">
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
                        <TextField
                            control={form.control}
                            name="email"
                            label={t('email')}
                            type="email"
                            placeholder={t('emailPlaceholder')}
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

                <LanguageOfferSwitcher />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
