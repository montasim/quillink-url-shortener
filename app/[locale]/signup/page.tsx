'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignupSchema } from '@/schemas/schemas';
import { handleSignup } from '@/lib/actions/signup';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { handleGoogleLogin } from '@/lib/actions/auth';
import GoogleLogo from '@/components/googleLogo';
import SubmitButton from '@/components/SubmitButton';
import { PasswordField, TextField } from '@/components/CustomFormField';
import TurnstileField from '@/components/TurnstileField';
import LanguageOfferSwitcher from '@/components/LanguageOfferSwitcher';
import { motion, AnimatePresence } from 'motion/react';



const SignUpPage = () => {
    const t = useTranslations('auth.signup');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [cfToken, setCfToken] = useState<string | null>(null);

    const form = useForm<z.infer<typeof SignupSchema>>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            cfToken: '',
        },
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
        const siteKey = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY;

        if (siteKey && !cfToken) {
            form.setError('email', {
                type: 'manual',
                message: t('turnstileError'),
            });
            return;
        }

        await handleSignup(
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
                                    name="name"
                                    label={t('name')}
                                    placeholder={t('namePlaceholder')}
                                    className="rounded-xl h-10 text-sm"
                                />
                                <TextField
                                    control={form.control}
                                    name="email"
                                    label={t('email')}
                                    type="email"
                                    placeholder={t('emailPlaceholder')}
                                    className="rounded-xl h-10 text-sm"
                                />
                                <PasswordField
                                    control={form.control}
                                    name="password"
                                    label={t('password')}
                                    placeholder={t('passwordPlaceholder')}
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
                                        !form.formState.isValid ||
                                        loading ||
                                        !cfToken
                                    }
                                    loading={loading}
                                    loadingLabel="Creating account..."
                                    label={t('submitButton')}
                                    className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/25 hover:bg-primary/95 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                                />
                            </form>
                        </Form>

                        <p className="mt-6 text-sm text-center text-muted-foreground">
                            {t('haveAccount')}{' '}
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

export default SignUpPage;
