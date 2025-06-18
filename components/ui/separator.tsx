'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

function Separator({
    className,
    orientation = 'horizontal',
    decorative = true,
    ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
    return (
        <SeparatorPrimitive.Root
            data-slot="separator"
            decorative={decorative}
            orientation={orientation}
            className={cn(
                'bg-border shrink-0 types-[orientation=horizontal]:h-px types-[orientation=horizontal]:w-full types-[orientation=vertical]:h-full types-[orientation=vertical]:w-px',
                className
            )}
            {...props}
        />
    );
}

export { Separator };
