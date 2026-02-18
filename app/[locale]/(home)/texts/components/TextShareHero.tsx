'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Zap, Lock, Clock, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Link from 'next/link';
import FormatSelector from '@/components/textShare/FormatSelector';
import TextEditor from '@/components/textShare/TextEditor';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { createData } from '@/lib/axios';

const TextShareHero = () => {
    const t = useTranslations('home.textShareHero');
    const createT = useTranslations('textShare.create');
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        format: 'plain' as 'plain' | 'markdown' | 'code',
        syntaxLanguage: '',
        password: '',
        expiresAt: '',
        viewLimit: '',
        customSlug: '',
        isPublic: true,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.content) {
            toast.error(createT('contentRequired'));
            return;
        }

        setIsLoading(true);

        try {
            const response = await createData(API_ENDPOINT.TEXT_SHARE_CREATE, {
                ...formData,
                expiresAt: formData.expiresAt || undefined,
                viewLimit: formData.viewLimit ? parseInt(formData.viewLimit) : undefined,
                customSlug: formData.customSlug || undefined,
            });

            if (response.success) {
                const shareUrl = `${window.location.origin}/texts/${response.data.shortKey}`;
                await navigator.clipboard.writeText(shareUrl);
                toast.success(createT('success'));
                router.push(`/texts/${response.data.shortKey}`);
            } else {
                toast.error(response.message || createT('error'));
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || createT('error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-background">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Badge */}
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm backdrop-blur-sm transition-all">
                    {t('badge')}
                </Badge>

                {/* Main Heading */}
                <h1 className="mt-8 text-4xl md:text-5xl font-extrabold !leading-[1.1] tracking-tight text-foreground">
                    {t('headingPrefix')}<span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[size:200%_auto] bg-clip-text text-transparent animate-[shine_5s_linear_infinite]">{t('headingEmphasis')}</span> {t('headingSuffix')}
                </h1>

                {/* Subheading */}
                <p className="mt-10 text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
                    {t('subheading')}
                </p>

                {/* Create Form */}
                <form onSubmit={handleSubmit} className="mt-14 max-w-3xl mx-auto">
                    <div className="flex flex-col gap-4 p-4 bg-card/50 backdrop-blur-xl rounded-3xl border border-border/60 shadow-2xl shadow-primary/5 ring-1 ring-border/50">
                        {/* Content Input */}
                        <div className="space-y-2">
                            <TextEditor
                                value={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                                format={formData.format}
                                placeholder={createT('contentPlaceholder')}
                                disabled={isLoading}
                                className="min-h-[200px] bg-background/50"
                            />
                        </div>

                        {/* Format Selector */}
                        <div className="flex items-center justify-between gap-4">
                            <Label className="text-sm font-semibold">{createT('formatLabel')}</Label>
                            <FormatSelector
                                value={formData.format}
                                onChange={(format) => setFormData({ ...formData, format })}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Syntax Language (for code) */}
                        {formData.format === 'code' && (
                            <div className="space-y-2">
                                <Label htmlFor="syntaxLanguage" className="text-sm font-semibold">{createT('languageLabel')}</Label>
                                <select
                                    id="syntaxLanguage"
                                    value={formData.syntaxLanguage}
                                    onChange={(e) => setFormData({ ...formData, syntaxLanguage: e.target.value })}
                                    disabled={isLoading}
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
                            </div>
                        )}

                        {/* Title */}
                        <div className="space-y-2">
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder={createT('titlePlaceholder')}
                                disabled={isLoading}
                                className="h-11"
                            />
                        </div>

                        {/* Advanced Options Toggle */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="text-sm"
                        >
                            {showAdvanced ? createT('hideAdvanced') : createT('showAdvanced')}
                        </Button>

                        {/* Advanced Options */}
                        {showAdvanced && (
                            <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
                                <Input
                                    type="password"
                                    placeholder={createT('passwordPlaceholder')}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    disabled={isLoading}
                                />
                                <Input
                                    placeholder={createT('customSlugPlaceholder')}
                                    value={formData.customSlug}
                                    onChange={(e) => setFormData({ ...formData, customSlug: e.target.value })}
                                    disabled={isLoading}
                                />
                                <Input
                                    type="datetime-local"
                                    value={formData.expiresAt}
                                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                                    disabled={isLoading}
                                />
                                <Input
                                    type="number"
                                    min="1"
                                    max="1000"
                                    placeholder={createT('viewLimitPlaceholder')}
                                    value={formData.viewLimit}
                                    onChange={(e) => setFormData({ ...formData, viewLimit: e.target.value })}
                                    disabled={isLoading}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={!formData.content || isLoading}
                            className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-10 h-14 rounded-2xl shadow-2xl shadow-primary/20 transition-all group relative overflow-hidden active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isLoading ? createT('creating') : createT('createButton')}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </Button>
                    </div>

                    {/* Agreement Text */}
                    <p className="mt-6 text-sm text-muted-foreground/60 font-medium">
                        {createT('agreementPrefix')}{' '}
                        <Link href="/terms" className="text-primary hover:underline transition-colors decoration-2 underline-offset-4">
                            {createT('terms')}
                        </Link>
                        {' '}{createT('agreementSuffix')}{' '}
                        <Link href="/privacy" className="text-primary hover:underline transition-colors decoration-2 underline-offset-4">
                            {createT('privacy')}
                        </Link>
                    </p>
                </form>

                {/* Stats */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
                    {['linksCreated', 'activeUsers', 'uptime', 'support'].map((statKey) => (
                        <div key={statKey} className="text-center group">
                            <div className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                                {t(`stats.${statKey}.value`)}
                            </div>
                            <div className="mt-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                                {t(`stats.${statKey}.label`)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TextShareHero;
