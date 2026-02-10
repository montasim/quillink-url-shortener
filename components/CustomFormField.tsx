'use client';

import React, { useState, useMemo } from 'react';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import zxcvbn from 'zxcvbn';
import { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface PasswordFieldProps {
    control: Control<any>;
    name: string;
    label: string;
    placeholder?: string;
    viewPasswordStrength?: boolean;
    viewPasswordMessage?: boolean;
    className?: string;
}

export const PasswordField = ({
    control,
    name,
    label,
    placeholder,
    viewPasswordStrength = true,
    viewPasswordMessage = true,
    className,
}: PasswordFieldProps) => {
    const t = useTranslations('common');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] =
        useState<zxcvbn.ZXCVBNResult | null>(null);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handlePasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (val: string) => void
    ) => {
        const val = e.target.value;
        onChange(val);
        setPasswordStrength(val ? zxcvbn(val) : null);
    };

    const strengthInfo = useMemo(() => {
        const score = passwordStrength?.score;
        const map = [
            { text: t('veryWeak'), color: 'bg-red-500' },
            { text: t('weak'), color: 'bg-orange-500' },
            { text: t('fair'), color: 'bg-yellow-500' },
            { text: t('good'), color: 'bg-lime-500' },
            { text: t('strong'), color: 'bg-green-500' },
        ];
        return score !== undefined
            ? map[score]
            : { text: '', color: 'bg-gray-200' };
    }, [passwordStrength?.score, t]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder={placeholder || label}
                                className={cn('pr-10 w-full', className)}
                                {...field}
                                onChange={(e) =>
                                    handlePasswordChange(e, field.onChange)
                                }
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={togglePasswordVisibility}
                                aria-label={
                                    showPassword
                                        ? t('hidePassword')
                                        : t('showPassword')
                                }
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    </FormControl>

                    {field.value &&
                        passwordStrength &&
                        viewPasswordStrength && (
                            <div className="mt-2 space-y-1">
                                <div className="h-2 rounded-full bg-gray-200">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${strengthInfo.color}`}
                                        style={{
                                            width: `${((passwordStrength.score + 1) / 5) * 100}%`,
                                        }}
                                    />
                                </div>
                                <p className="text-sm font-medium text-gray-700">
                                    {strengthInfo.text}
                                </p>
                                {passwordStrength.feedback.suggestions.length >
                                    0 && (
                                        <ul className="list-disc list-inside text-sm text-gray-600">
                                            {passwordStrength.feedback.suggestions.map(
                                                (sug, i) => (
                                                    <li key={i}>{sug}</li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                {passwordStrength.feedback.warning && (
                                    <p className="text-sm text-red-500">
                                        {passwordStrength.feedback.warning}
                                    </p>
                                )}
                            </div>
                        )}

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

interface TextFieldProps {
    control: Control<any>;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    className?: string;
}

export const TextField = ({
    control,
    name,
    label,
    type = 'text',
    placeholder,
    className,
}: TextFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder={placeholder || label}
                            className={className}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
