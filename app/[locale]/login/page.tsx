'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { handleGoogleLogin, handleLogin } from '@/lib/actions/auth';
import { LoginSchema } from '@/schemas/schemas';
import { useAuth } from '@/context/AuthContext';
import GoogleLogo from '@/components/googleLogo';
import { PasswordField, TextField } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import TurnstileField from '@/components/TurnstileField';
import LanguageOfferSwitcher from '@/components/LanguageOfferSwitcher';

const LoginPage = () => {
    const t = useTranslations('auth.login');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [cfToken, setCfToken] = useState<string | null>(null);
    const { refreshAuth } = useAuth();

    const form = useForm<z.infer<typeof LoginSchema>>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            cfToken: '',
        },
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        const siteKey = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY;

        // Only require Turnstile token if site key is configured
        if (siteKey && !cfToken) {
            form.setError('email', {
                type: 'manual',
                message: t('turnstileError'),
            });
            return;
        }

        await handleLogin(
            { ...data, cfToken: cfToken || 'dev-bypass' },
            setLoading,
            router,
            refreshAuth
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
                        <Button
                            variant="outline"
                            onClick={handleGoogleLogin}
                            className="w-full h-11 gap-3 cursor-pointer rounded-xl bg-background hover:bg-muted border-border transition-all font-medium text-sm"
                        >
                            <GoogleLogo />
                            {t('continueWithGoogle')}
                        </Button>

                        <div className="my-6 flex items-center gap-4 text-muted-foreground">
                            <Separator className="flex-1" />
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">{t('or')}</span>
                            <Separator className="flex-1" />
                        </div>

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
                                    placeholder="name@company.com"
                                    className="rounded-xl h-10 text-sm"
                                />
                                <PasswordField
                                    control={form.control}
                                    name="password"
                                    label={t('password')}
                                    placeholder="Enter your password"
                                    className="rounded-xl h-10 text-sm"
                                    viewPasswordStrength={false}
                                    viewPasswordMessage={false}
                                />

                                <div className="flex justify-end">
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-semibold text-primary hover:underline hover:underline-offset-4 transition-all"
                                    >
                                        {t('forgotPassword')}
                                    </Link>
                                </div>

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
                                    loadingLabel={t('authenticating')}
                                    label={t('submitButton')}
                                    className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/25 hover:bg-primary/95 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                                />
                            </form>
                        </Form>

                        <p className="mt-6 text-sm text-center text-muted-foreground">
                            {t('noAccount')}
                            <Link
                                href="/signup"
                                className="ml-1 font-bold text-primary hover:underline hover:underline-offset-4 transition-all"
                            >
                                {t('signUpLink')}
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

export default LoginPage;
