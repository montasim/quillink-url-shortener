'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShortenUrlSchema } from '@/schemas/schemas';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TextField } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import { Plus, Link as LinkIcon } from 'lucide-react';
import { handleCreate } from '@/lib/actions/home';
import { useRouter } from 'next/navigation';

interface CreateLinkModalProps {
    onSuccess?: () => void;
    triggerLabel?: string;
}

const CreateLinkModal = ({ onSuccess, triggerLabel = 'Create Link' }: CreateLinkModalProps) => {
    const t = useTranslations('dashboard');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof ShortenUrlSchema>>({
        resolver: zodResolver(ShortenUrlSchema),
        defaultValues: {
            originalUrl: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof ShortenUrlSchema>) => {
        await handleCreate(data, setLoading, router);
        setOpen(false);
        form.reset();
        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">{triggerLabel}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-[24px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create new link</DialogTitle>
                    <DialogDescription>
                        Enter your long URL to create a short, shareable link.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                        <TextField
                            control={form.control}
                            name="originalUrl"
                            label="Destination URL"
                            placeholder="https://example.com/very-long-url"
                            className="rounded-xl h-11"
                        />
                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="rounded-xl"
                            >
                                Cancel
                            </Button>
                            <SubmitButton
                                disabled={!form.formState.isValid || loading}
                                loading={loading}
                                label="Create Link"
                                loadingLabel="Creating..."
                                className="rounded-xl px-8"
                            />
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLinkModal;
