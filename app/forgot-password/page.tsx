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
import { handleForgotPassword } from '@/app/forgot-password/actions';
import { ForgotPasswordSchema } from '@/schemas/schemas';

const ForgotPasswordPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
        await handleForgotPassword(data, setLoading, router);
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
                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Send Email'}
                        </Button>
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
