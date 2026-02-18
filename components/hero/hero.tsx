'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link as LinkIcon, QrCode } from 'lucide-react';
import Link from 'next/link';
import { handleCreate } from '@/lib/actions/home';
import TabSection from '@/components/TabSection';
import ComingSoon from '@/components/ComingSoon';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { ShortenUrlSchema } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from '@/components/SubmitButton';
import { TextField } from '@/components/CustomFormField';
import { useTranslations } from 'next-intl';

const Hero = () => {
    const router = useRouter();
    const [creating, setCreating] = useState(false);
    const t = useTranslations('home.urls.hero');
    const urlT = useTranslations('dashboard.urls.messages');

    const form = useForm<z.infer<typeof ShortenUrlSchema>>({
        mode: 'onChange',
        defaultValues: {
            originalUrl: '',
        },
        resolver: zodResolver(ShortenUrlSchema),
    });

    const onSubmit = async (data: z.infer<typeof ShortenUrlSchema>) => {
        await handleCreate(data, setCreating, router, urlT);
    };

    const tabs = [
        {
            name: t('shortLink'),
            icon: <LinkIcon />,
            value: 'short_link',
            content: (
                <Form {...form}>
                    <form
                        className="w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <TextField
                            control={form.control}
                            name="originalUrl"
                            label={t('pasteUrl')}
                            type="text"
                            placeholder={t('pasteUrl')}
                        />

                        <p className="mt-4 text-sm text-left text-secondary">
                            {t('termsAgreement')}
                            <Link href="#" className="ml-1 underline">
                                {t('termsOfUse')}
                            </Link>
                            ,
                            <Link href="#" className="ml-1 underline">
                                {t('privacyPolicy')}
                            </Link>
                            , and
                            <Link href="#" className="ml-1 underline">
                                {t('cookiePolicy')}
                            </Link>
                        </p>

                        <SubmitButton
                            disabled={!form.formState.isValid || creating}
                            loading={creating}
                            loadingLabel={t('creating')}
                            label={t('createShortUrl')}
                            className={
                                'mt-6 w-full cursor-pointer bg-gradient-to-r from-gray-100 to-gray-300 text-secondary'
                            }
                        />
                    </form>
                </Form>
            ),
        },
        {
            name: t('qrCode'),
            icon: <QrCode />,
            value: 'qr_code',
            content: <ComingSoon text={t('qrCodeComingSoon')} />,
        },
    ];

    return (
        <div className="relative 2xl:mt-40 xl:mt-36 lg:mt-36 md:mt-28 sm:mt-20 mt-16 flex items-center justify-center px-6 overflow-hidden">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                className={cn(
                    '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
                    'inset-x-0 h-full skew-y-12'
                )}
            />

            <div className="relative z-10 text-center w-full">
                <Badge className="bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full py-1 border-none">
                    {t('badge')}
                </Badge>
                <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold !leading-[1.2] tracking-tight text-primary">
                    {t('title')}
                </h1>
                <p className="mt-4 text-secondary text-[17px] md:text-lg w-3xl mx-auto">
                    {t('description')}
                </p>
                <div className="mt-8 flex items-center justify-center gap-4 w-full">
                    <TabSection
                        defaultValue="short_link"
                        tabs={tabs}
                        listClassName="w-full p-0 bg-background justify-start border-b rounded-none"
                        triggerClassName="rounded-none h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background data-[state=active]:bg-gradient-to-r from-gray-100 to-gray-300 -mb-[2px] rounded-t cursor-pointer text-secondary"
                        contentWrapperClassName="w-full mt-4"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
