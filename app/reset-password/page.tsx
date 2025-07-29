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
import { handleResetPassword } from '@/app/reset-password/actions';
import { ResetPasswordSchema } from '@/schemas/schemas';
import { toast } from 'sonner';
import { PasswordField } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import TurnstileField from '@/components/TurnstileField';

const ResetPassword = () => {
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
            toast.error(
                "No 'token' found in the URL query parameters. Redirecting to login."
            );
            router.push('/login');
        }
    }, [searchParams, form, router]);

    const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
        if (!cfToken) {
            form.setError('newPassword', {
                type: 'manual',
                message: "Please verify you're not a robot.",
            });
            return;
        }

        await handleResetPassword({ ...data, cfToken }, setLoading, router);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-xs w-full flex flex-col items-center">
                <Logo />
                <p className="mt-4 text-xl font-bold tracking-tight text-primary">
                    Reset your password
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
                            label="New Password"
                            placeholder="Enter your new password"
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
                            loadingLabel={'Processing'}
                            label={'Reset Password'}
                        />
                    </form>
                </Form>

                <div className="mt-5 space-y-5">
                    <p className="text-sm text-center">
                        Remember password?
                        <Link
                            href="/login"
                            className="ml-1 underline text-muted"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const ResetPasswordPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
        </Suspense>
    );
};

export default ResetPasswordPage;
