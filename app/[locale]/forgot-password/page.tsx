'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/logo';
import { Form } from '@/components/ui/form';
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
import configuration from '@/configuration/configuration';

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
        const siteKey = configuration.turnstile.siteKey;

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
        <div className="h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="relative z-10 w-full max-w-md mx-auto">
                <div className="flex flex-col justify-center py-4">
                    <div className="mb-6 flex flex-col items-center">
                        <Logo />
                        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground text-center">
                            {t('title')}
                        </h1>
                    </div>

                    <div className="bg-card border border-border/60 rounded-[32px] p-8 shadow-2xl shadow-primary/5 ring-1 ring-border/50">
                        <p className="text-sm text-center text-muted-foreground mb-8">
                            {t('subtitle')}
                        </p>

                        <Form {...form}>
                            <form
                                className="space-y-4"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <TextField
                                    control={form.control}
                                    name="email"
                                    label={t('email')}
                                    type="email"
                                    placeholder={t('emailPlaceholder')}
                                    className="rounded-xl h-10 text-sm"
                                />

                                <div className="py-1">
                                    <TurnstileField
                                        onVerify={(token) => {
                                            setCfToken(token);
                                            form.setValue('cfToken', token);
                                        }}
                                    />
                                </div>

                                <SubmitButton
                                    disabled={
                                        !form.formState.isValid || loading || !cfToken
                                    }
                                    loading={loading}
                                    loadingLabel={t('processing')}
                                    label={t('submitButton')}
                                    className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/25 hover:bg-primary/95 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                                />
                            </form>
                        </Form>

                        <p className="mt-6 text-sm text-center text-muted-foreground">
                            {t('rememberPassword')}{' '}
                            <Link
                                href="/login"
                                className="ml-1 font-bold text-primary hover:underline hover:underline-offset-4 transition-all"
                            >
                                {t('loginLink')}
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6">
                        <LanguageOfferSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
