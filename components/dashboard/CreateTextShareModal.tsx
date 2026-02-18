'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { createData, getData } from '@/lib/axios';
import TextEditor from '@/components/textShare/TextEditor';
import FormatSelector from '@/components/textShare/FormatSelector';
import { cn } from '@/lib/utils';

// Form schema (before transformation)
const TextShareFormSchema = z.object({
    title: z.string().trim().max(100, 'Title must be less than 100 characters').optional().or(z.literal('')),
    content: z.string().trim().min(1, 'Content is required'),
    format: z.enum(['plain', 'markdown', 'code']).default('plain'),
    syntaxLanguage: z.string().trim().max(50, 'Syntax language must be less than 50 characters').optional().or(z.literal('')),
    password: z.string().min(4, 'Password must be at least 4 characters').optional().or(z.literal('')),
    expiresAt: z.string().optional().or(z.literal('')),
    viewLimit: z.string().optional().or(z.literal('')),
    customSlug: z.string().trim().max(50, 'Custom slug must be less than 50 characters').regex(/^[a-zA-Z0-9-_]+$/, 'Custom slug must contain only alphanumeric characters, hyphens, and underscores').optional().or(z.literal('')),
    isPublic: z.boolean().default(true),
});

interface CreateTextShareModalProps {
    onRefresh?: () => void;
    triggerLabel?: string;
}

const CreateTextShareModal = ({ onRefresh, triggerLabel }: CreateTextShareModalProps) => {
    const t = useTranslations('textShare.dashboard');
    const createT = useTranslations('textShare.create');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [slugAvailability, setSlugAvailability] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(TextShareFormSchema),
        defaultValues: {
            title: '',
            content: '',
            format: 'plain' as 'plain' | 'markdown' | 'code',
            syntaxLanguage: '',
            password: '',
            expiresAt: '',
            viewLimit: '',
            customSlug: '',
            isPublic: true,
        },
    });

    const customSlug = form.watch('customSlug');

    // Check slug availability with debouncing - wait for user to finish typing
    useEffect(() => {
        const timer = setTimeout(() => {
            if (customSlug && customSlug.trim().length > 0) {
                checkSlugAvailability(customSlug.trim());
            } else {
                setSlugAvailability('idle');
            }
        }, 1000); // 1 second debounce - gives user time to finish typing

        return () => clearTimeout(timer);
    }, [customSlug]);

    const checkSlugAvailability = async (slug: string) => {
        setSlugAvailability('checking');
        try {
            const response = await getData(`${API_ENDPOINT.TEXT_SHARE_CHECK_SLUG}?slug=${encodeURIComponent(slug)}`);
            if (response.success && response.data.available) {
                setSlugAvailability('available');
            } else {
                setSlugAvailability('taken');
            }
        } catch (error) {
            setSlugAvailability('taken');
        }
    };

    const onSubmit = async (data: any) => {
        // Prevent submission if custom slug is taken
        if (data.customSlug && slugAvailability === 'taken') {
            toast.error('This custom link is already taken. Please choose another or remove it.');
            return;
        }

        setLoading(true);
        try {
            const submitData = {
                ...data,
                expiresAt: data.expiresAt || undefined,
                viewLimit: data.viewLimit ? parseInt(data.viewLimit, 10) : undefined,
                customSlug: data.customSlug || undefined,
            };

            const response = await createData(API_ENDPOINT.TEXT_SHARE_CREATE, submitData);

            if (response.success) {
                const shareUrl = `${window.location.origin}/texts/${response.data.shortKey}`;
                await navigator.clipboard.writeText(shareUrl);
                toast.success(createT('success'));
                setOpen(false);
                form.reset();
                if (onRefresh) {
                    onRefresh();
                }
            } else {
                toast.error(response.message || createT('error'));
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || createT('error'));
        } finally {
            setLoading(false);
        }
    };

    const format = form.watch('format') as 'plain' | 'markdown' | 'code';

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">{triggerLabel || t('newShare')}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl rounded-[24px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{createT('title')}</DialogTitle>
                    <DialogDescription>
                        {createT('subtitle')}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        {/* Content Field */}
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <TextEditor
                                            value={field.value}
                                            onChange={field.onChange}
                                            format={format}
                                            placeholder={createT('contentPlaceholder')}
                                            disabled={loading}
                                            className="min-h-[200px] bg-background/50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Format Selector */}
                        <div className="flex items-center justify-between gap-4">
                            <Label className="text-sm font-semibold">{createT('formatLabel')}</Label>
                            <FormatSelector
                                value={format}
                                onChange={(value) => form.setValue('format', value)}
                                disabled={loading}
                            />
                        </div>

                        {/* Syntax Language (for code) */}
                        {format === 'code' && (
                            <FormField
                                control={form.control}
                                name="syntaxLanguage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            >
                                                <option value="">{createT('languageSelect')}</option>
                                                <option value="javascript">JavaScript</option>
                                                <option value="typescript">TypeScript</option>
                                                <option value="python">Python</option>
                                                <option value="java">Java</option>
                                                <option value="cpp">C++</option>
                                                <option value="c">C</option>
                                                <option value="csharp">C#</option>
                                                <option value="go">Go</option>
                                                <option value="rust">Rust</option>
                                                <option value="php">PHP</option>
                                                <option value="ruby">Ruby</option>
                                                <option value="swift">Swift</option>
                                                <option value="kotlin">Kotlin</option>
                                                <option value="scala">Scala</option>
                                                <option value="sql">SQL</option>
                                                <option value="html">HTML</option>
                                                <option value="css">CSS</option>
                                                <option value="scss">SCSS</option>
                                                <option value="bash">Bash/Shell</option>
                                                <option value="json">JSON</option>
                                                <option value="yaml">YAML</option>
                                                <option value="xml">XML</option>
                                                <option value="markdown">Markdown</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={createT('titlePlaceholder')}
                                            disabled={loading}
                                            className="h-11"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Advanced Options Toggle */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="text-sm w-full"
                        >
                            {showAdvanced ? createT('hideAdvanced') : createT('showAdvanced')}
                        </Button>

                        {/* Advanced Options */}
                        {showAdvanced && (
                            <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder={createT('passwordPlaceholder')}
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="customSlug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        placeholder={createT('customSlugPlaceholder')}
                                                        disabled={loading || slugAvailability === 'checking'}
                                                        className={cn(
                                                            'pr-10 h-11',
                                                            slugAvailability === 'available' && 'border-green-500 focus:border-green-600 focus:ring-green-500',
                                                            slugAvailability === 'taken' && 'border-red-500 focus:border-red-600 focus:ring-red-500'
                                                        )}
                                                    />
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                        {slugAvailability === 'checking' && (
                                                            <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                                                        )}
                                                        {slugAvailability === 'available' && (
                                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                        )}
                                                        {slugAvailability === 'taken' && (
                                                            <XCircle className="w-4 h-4 text-red-500" />
                                                        )}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                            {slugAvailability === 'available' && (
                                                <p className="text-xs text-green-600 mt-1">✓ This custom link is available</p>
                                            )}
                                            {slugAvailability === 'taken' && (
                                                <p className="text-xs text-red-600 mt-1">✗ This custom link is already taken</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="expiresAt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="datetime-local"
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="viewLimit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    min="1"
                                                    max="1000"
                                                    placeholder={createT('viewLimitPlaceholder')}
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="rounded-xl"
                                disabled={loading}
                            >
                                {createT('cancel') || 'Cancel'}
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading || !form.formState.isValid}
                                className="rounded-xl px-8 bg-primary hover:bg-primary/90"
                            >
                                {loading ? createT('creating') : createT('createButton')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTextShareModal;
