'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Progress } from '@/components/ui/progress';
import { CircularProgress } from './CircularProgress';
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface UsageProgressProps {
    current: number;
    limit: number;
    label: string;
    icon?: React.ReactNode;
    variant?: 'linear' | 'circular';
    size?: 'sm' | 'md' | 'lg';
}

export const UsageProgress: React.FC<UsageProgressProps> = ({
    current,
    limit,
    label,
    icon,
    variant = 'linear',
    size = 'md',
}) => {
    const t = useTranslations('dashboard.common');

    // Handle unlimited (-1)
    const isUnlimited = limit === -1;
    const percentage = isUnlimited ? 0 : Math.min((current / limit) * 100, 100);
    const remaining = isUnlimited ? -1 : Math.max(0, limit - current);

    if (variant === 'circular') {
        return (
            <div className="flex items-center gap-4 bg-card/50">
                {icon}
                <CircularProgress
                    current={current}
                    limit={limit}
                    size={size}
                    showLabel={false}
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{label}</span>
                        {isUnlimited ? (
                            <span className="text-xs text-green-500 font-medium">({current} used)</span>
                        ) : (
                            <>
                                {percentage >= 90 && <AlertCircle className="w-3 h-3 text-red-500" />}
                                {percentage >= 70 && percentage < 90 && <TrendingUp className="w-3 h-3 text-yellow-500" />}
                                {percentage < 70 && <CheckCircle className="w-3 h-3 text-green-500" />}
                            </>
                        )}
                    </div>
                    {isUnlimited ? (
                        <p className="text-xs text-green-500">Enjoy unlimited usage!</p>
                    ) : (
                        <>
                            {remaining <= 10 && remaining > 0 && (
                                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                                    {t('remainingUsage') || 'Remaining'}: {remaining}
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }

    // Linear variant (default)
    // Determine color based on usage
    let colorClass = 'bg-green-500';
    let statusIcon = <CheckCircle className="w-4 h-4 text-green-500" />;

    if (!isUnlimited) {
        if (percentage >= 90) {
            colorClass = 'bg-red-500';
            statusIcon = <AlertCircle className="w-4 h-4 text-red-500" />;
        } else if (percentage >= 70) {
            colorClass = 'bg-yellow-500';
            statusIcon = <TrendingUp className="w-4 h-4 text-yellow-500" />;
        }
    }

    return (
        <div className="space-y-3 p-4 rounded-xl border border-border bg-card/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                    {statusIcon}
                    <span className="text-xs text-muted-foreground">
                        {isUnlimited ? (
                            <span className="text-green-500 font-medium">Unlimited</span>
                        ) : (
                            `${current} / ${limit}`
                        )}
                    </span>
                </div>
            </div>

            {!isUnlimited && (
                <>
                    <Progress value={percentage} className="h-2" indicatorClassName={colorClass} />
                    {remaining <= 10 && remaining > 0 && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400">
                            {t('remainingUsage') || 'Remaining'}: {remaining}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default UsageProgress;
