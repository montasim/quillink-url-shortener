'use client';

import { forwardRef, Ref } from 'react';
import { cn } from '@/lib/utils';

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
    format: 'plain' | 'markdown' | 'code';
    syntaxLanguage?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const TextEditor = forwardRef(
    (
        {
            value,
            onChange,
            format,
            syntaxLanguage,
            placeholder,
            disabled,
            className,
        }: TextEditorProps,
        ref: Ref<HTMLTextAreaElement>
    ) => {
        return (
            <textarea
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || 'Paste your text here...'}
                disabled={disabled}
                className={cn(
                    'w-full min-h-[400px] p-4 font-mono text-sm rounded-lg border bg-background',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                    'resize-y',
                    disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
            />
        );
    }
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;
