'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Logo } from '@/components/logo';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { handleForgotPassword } from '@/app/forgot-password/actions';
import { ForgotPasswordSchema } from '@/schemas/schemas';
import { TextField } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import TurnstileField from '@/components/TurnstileField';

const ForgotPasswordPage = () => {
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
        if (!cfToken) {
            form.setError('email', {
                type: 'manual',
                message: "Please verify you're not a robot.",
            });
            return;
        }

        await handleForgotPassword({ ...data, cfToken }, setLoading, router);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-xs w-full flex flex-col items-center">
                <Logo />
                <p className="mt-4 text-xl font-bold tracking-tight">
                    Forgot your password
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
                            label="Email"
                            type="email"
                            placeholder="Enter a valid email"
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
                            label={'Send Verification Email'}
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

export default ForgotPasswordPage;
