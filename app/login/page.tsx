'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import configuration from '@/configuration/configuration';
import { handleGoogleLogin, handleLogin } from '@/app/login/actions';
import { LoginSchema } from '@/schemas/schemas';
import { useAuth } from '@/context/AuthContext';
import GoogleLogo from '@/components/googleLogo';
import CustomFormField from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { refreshAuth } = useAuth();

    const form = useForm<z.infer<typeof LoginSchema>>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        await handleLogin(data, setLoading, router, refreshAuth);
    };

    return (
        <div className="2xl:my-40 xl:my-36 lg:my-36 md:my-28 sm:my-20 my-16 flex items-center justify-center">
            <div className="max-w-xs w-full flex flex-col items-center">
                <Logo />
                <p className="mt-4 text-xl font-bold tracking-tight text-primary">
                    Log in to {configuration.app.name} account
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
                        <CustomFormField
                            control={form.control}
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter a valid email"
                        />
                        <CustomFormField
                            control={form.control}
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Password"
                        />

                        <SubmitButton
                            disabled={!form.formState.isValid || loading}
                            loading={loading}
                            loadingLabel={'Authenticating'}
                            label={'Continue with Email'}
                        />
                    </form>
                </Form>

                <div className="mt-5 space-y-5">
                    <Link
                        href="/forgot-password"
                        className="text-sm block underline text-muted text-center"
                    >
                        Forgot your password?
                    </Link>
                    <p className="text-sm text-center">
                        Don&apos;t have an account?
                        <Link
                            href="/signup"
                            className="ml-1 underline text-muted"
                        >
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
