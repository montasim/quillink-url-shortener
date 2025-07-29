'use client';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignupSchema } from '@/schemas/schemas';
import { handleSignup } from '@/app/signup/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import configuration from '@/configuration/configuration';
import { handleGoogleLogin } from '@/app/login/actions';
import GoogleLogo from '@/components/googleLogo';
import SubmitButton from '@/components/SubmitButton';
import { PasswordField, TextField } from '@/components/CustomFormField';

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof SignupSchema>>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
        await handleSignup(data, setLoading, router);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full h-full grid lg:grid-cols-2 p-4">
                <div className="max-w-xs m-auto w-full flex flex-col items-center">
                    <Logo />
                    <p className="mt-4 text-xl font-bold tracking-tight text-primary">
                        Sign up for {configuration.app.name} account
                    </p>

                    <Button
                        onClick={handleGoogleLogin}
                        className="mt-8 w-full gap-3 cursor-pointer"
                    >
                        <GoogleLogo />
                        Continue with Google
                    </Button>

                    <div className="my-7 w-full flex items-center justify-center overflow-hidden">
                        <Separator />
                        <span className="text-sm px-2">OR</span>
                        <Separator />
                    </div>

                    <Form {...form}>
                        <form
                            className="w-full space-y-4"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <TextField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Name"
                            />
                            <TextField
                                control={form.control}
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Enter a valid email"
                            />
                            <PasswordField
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="Enter a strong password"
                            />

                            <SubmitButton
                                disabled={!form.formState.isValid || loading}
                                loading={loading}
                                loadingLabel={'Creating your account'}
                                label={'Continue with Email'}
                            />
                        </form>
                    </Form>

                    <p className="mt-5 text-sm text-center">
                        Already have an account?
                        <Link
                            href="/login"
                            className="ml-1 underline text-muted"
                        >
                            Log in
                        </Link>
                    </p>
                </div>

                <div className="bg-gray-50 hidden lg:block rounded-lg" />
            </div>
        </div>
    );
};

export default SignUpPage;
