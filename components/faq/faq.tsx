'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const Faq = () => {
    const t = useTranslations('faq');
    const faqs = t.raw('faqs');
    const [value, setValue] = useState<string>();

    return (
        <div className="flex items-center justify-center px-6 2xl:my-40 xl:my-36 lg:my-36 md:my-28 sm:my-20 my-16">
            <div className="w-full max-w-screen-lg">
                <h2 className="text-xl sm:text-2xl md:text-3xl !leading-[1.15] font-bold tracking-tight text-center text-primary">
                    {t('title')}
                </h2>

                <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        value={value}
                        onValueChange={setValue}
                    >
                        {faqs
                            .slice(0, 5)
                            .map(({ question, answer }: any, index: number) => (
                                <AccordionItem
                                    key={question}
                                    value={`question-${index}`}
                                >
                                    <AccordionPrimitive.Header className="flex">
                                        <AccordionPrimitive.Trigger
                                            className={cn(
                                                'flex flex-1 items-center justify-between py-4 font-semibold transition-all [&[types-state=open]>svg]:rotate-45',
                                                'text-start text-lg cursor-pointer text-primary'
                                            )}
                                        >
                                            {question}
                                            <PlusIcon className="h-5 w-5 shrink-0 text-primary transition-transform duration-200" />
                                        </AccordionPrimitive.Trigger>
                                    </AccordionPrimitive.Header>
                                    <AccordionContent className="text-secondary">
                                        {answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                    </Accordion>

                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        value={value}
                        onValueChange={setValue}
                    >
                        {faqs
                            .slice(5)
                            .map(({ question, answer }: any, index: number) => (
                                <AccordionItem
                                    key={question}
                                    value={`question-${index + 5}`}
                                >
                                    <AccordionPrimitive.Header className="flex">
                                        <AccordionPrimitive.Trigger
                                            className={cn(
                                                'flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all [&[types-state=open]>svg]:rotate-45',
                                                'text-start text-lg cursor-pointer text-primary'
                                            )}
                                        >
                                            {question}
                                            <PlusIcon className="h-5 w-5 shrink-0 text-primary transition-transform duration-200" />
                                        </AccordionPrimitive.Trigger>
                                    </AccordionPrimitive.Header>
                                    <AccordionContent className="text-secondary">
                                        {answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default Faq;
