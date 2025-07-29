import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';

const Testimonial = () => {
    const t = useTranslations('testimonial');
    const testimonials = t.raw('testimonials');

    return (
        <div className="flex justify-center items-center 2xl:mt-40 xl:mt-36 lg:mt-36 md:mt-28 sm:mt-20 mt-16 p-6">
            <div>
                <h2 className="mb-14 text-xl sm:text-2xl md:text-3xl font-bold text-center tracking-tight text-primary">
                    {t('title')}
                </h2>
                <div className="max-w-screen-xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8">
                    {testimonials.map((testimonial: any) => (
                        <div
                            key={testimonial.id}
                            className="mb-8 bg-gradient-to-r from-gray-100 to-gray-300 rounded-xl p-6 break-inside-avoid"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
                                            {testimonial.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-lg font-semibold text-primary">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.designation}
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href="#" target="_blank">
                                        <TwitterLogo className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                            <p className="mt-5 text-[17px] text-secondary">
                                {testimonial.testimonial}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TwitterLogo = (props: ComponentProps<'svg'>) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <title>X</title>
        <path
            fill="currentColor"
            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
        />
    </svg>
);

export default Testimonial;
