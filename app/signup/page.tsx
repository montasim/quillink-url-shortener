'use client';

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
import { SignupSchema } from '@/schemas/schemas';
import { handleSignup } from '@/app/signup/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import configuration from '@/configuration/configuration';
import { handleGoogleLogin } from '@/app/login/actions';
import GoogleLogo from '@/components/googleLogo';

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof SignupSchema>>({
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
                    <p className="mt-4 text-xl font-bold tracking-tight">
                        Sign up for {configuration.app.name} account
                    </p>

                    <Button
                        onClick={handleGoogleLogin}
                        className="mt-8 w-full gap-3"
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
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Name"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                disabled={loading}
                            >
                                {loading
                                    ? 'Signing up...'
                                    : 'Continue with Email'}
                            </Button>
                        </form>
                    </Form>

                    <p className="mt-5 text-sm text-center">
                        Already have an account?
                        <Link
                            href="/login"
                            className="ml-1 underline text-muted-foreground"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
                <div className="bg-muted hidden lg:block rounded-lg" />
            </div>
        </div>
    );
};

export default SignUpPage;
