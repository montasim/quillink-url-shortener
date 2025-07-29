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
import configuration from '@/configuration/configuration';
import { handleGoogleLogin, handleLogin } from '@/lib/actions/auth';
import { LoginSchema } from '@/schemas/schemas';
import { useAuth } from '@/context/AuthContext';
import GoogleLogo from '@/components/googleLogo';
import { PasswordField, TextField } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import TurnstileField from '@/components/TurnstileField';

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
        if (!cfToken) {
            form.setError('email', {
                type: 'manual',
                message: t('turnstileError'),
            });
            return;
        }

        await handleLogin(
            { ...data, cfToken },
            setLoading,
            router,
            refreshAuth
        );
    };

    return (
        <div className="2xl:my-40 xl:my-36 lg:my-36 md:my-28 sm:my-20 my-16 flex items-center justify-center">
            <div className="max-w-xs w-full flex flex-col items-center">
                <Logo />
                <p className="mt-4 text-xl font-bold tracking-tight text-primary">
                    {t('title')}
                </p>

                <Button
                    onClick={handleGoogleLogin}
                    className="mt-8 w-full gap-3 cursor-pointer"
                >
                    <GoogleLogo />
                    {t('continueWithGoogle')}
                </Button>

                <div className="my-7 w-full flex items-center justify-center overflow-hidden">
                    <Separator />
                    <span className="text-sm px-2">{t('or')}</span>
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
                            placeholder={t('email')}
                        />
                        <PasswordField
                            control={form.control}
                            name="password"
                            label={t('password')}
                            placeholder={t('password')}
                            viewPasswordStrength={false}
                            viewPasswordMessage={false}
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
                            loadingLabel={t('authenticating')}
                            label={t('submitButton')}
                        />
                    </form>
                </Form>

                <div className="mt-5 space-y-5">
                    <Link
                        href="/forgot-password"
                        className="text-sm block underline text-muted text-center"
                    >
                        {t('forgotPassword')}
                    </Link>
                    <p className="text-sm text-center">
                        {t('noAccount')}
                        <Link
                            href="/signup"
                            className="ml-1 underline text-muted"
                        >
                            {t('signUpLink')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
