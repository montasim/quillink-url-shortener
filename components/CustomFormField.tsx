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
import { Control } from 'react-hook-form';
import zxcvbn from 'zxcvbn';

interface CustomFormFieldProps {
    control: Control<any>;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}

const CustomFormField = ({
    control,
    name,
    label,
    type = 'text',
    placeholder,
}: CustomFormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] =
        useState<zxcvbn.ZXCVBNResult | null>(null);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handlePasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (value: string) => void
    ) => {
        const password = e.target.value;
        onChange(password); // Update react-hook-form value
        if (type === 'password' && password.length > 0) {
            setPasswordStrength(zxcvbn(password));
        } else {
            setPasswordStrength(null);
        }
    };

    const getStrengthInfo = (score: number | undefined) => {
        if (score === undefined || score === 0) {
            return { text: 'Very Weak', color: 'bg-red-500' };
        } else if (score === 1) {
            return { text: 'Weak', color: 'bg-orange-500' };
        } else if (score === 2) {
            return { text: 'Fair', color: 'bg-yellow-500' };
        } else if (score === 3) {
            return { text: 'Good', color: 'bg-lime-500' };
        } else if (score === 4) {
            return { text: 'Strong', color: 'bg-green-500' };
        }
        return { text: '', color: 'bg-gray-200' }; // Default for no score
    };

    const strengthInfo = useMemo(() => {
        return getStrengthInfo(passwordStrength?.score);
    }, [passwordStrength?.score]);

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
                                type={
                                    type === 'password' && showPassword
                                        ? 'text'
                                        : type
                                }
                                placeholder={placeholder || label}
                                className="pr-10 w-full" // Add padding for the icon
                                {...field}
                                onChange={(e) =>
                                    handlePasswordChange(e, field.onChange)
                                } // Intercept change for strength check
                            />
                            {type === 'password' && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={togglePasswordVisibility}
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            )}
                        </div>
                    </FormControl>
                    {type === 'password' && field.value && passwordStrength && (
                        <div className="mt-2 space-y-1">
                            <div className="h-2 rounded-full bg-gray-200">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${strengthInfo.color}`}
                                    style={{
                                        width: `${((passwordStrength.score + 1) / 5) * 100}%`,
                                    }}
                                ></div>
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                                {strengthInfo.text}
                            </p>
                            {passwordStrength.feedback.suggestions &&
                                passwordStrength.feedback.suggestions.length >
                                    0 && (
                                    <ul className="list-disc list-inside text-sm text-gray-600">
                                        {passwordStrength.feedback.suggestions.map(
                                            (suggestion, index) => (
                                                <li key={index}>
                                                    {suggestion}
                                                </li>
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

export default CustomFormField;
