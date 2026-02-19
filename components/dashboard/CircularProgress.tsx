'use client';

import React from 'react';
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface CircularProgressProps {
    current: number;
    limit: number;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    current,
    limit,
    label,
    size = 'md',
    showLabel = true,
}) => {
    // Handle unlimited (-1)
    const isUnlimited = limit === -1;
    const percentage = isUnlimited ? 0 : Math.min((current / limit) * 100, 100);

    // Determine color based on usage
    let colorClass = 'text-green-500';
    let bgColorClass = 'text-green-500/20';
    let statusIcon = <CheckCircle className="w-3 h-3 text-green-500" />;

    if (!isUnlimited) {
        if (percentage >= 90) {
            colorClass = 'text-red-500';
            bgColorClass = 'text-red-500/20';
            statusIcon = <AlertCircle className="w-3 h-3 text-red-500" />;
        } else if (percentage >= 70) {
            colorClass = 'text-yellow-500';
            bgColorClass = 'text-yellow-500/20';
            statusIcon = <TrendingUp className="w-3 h-3 text-yellow-500" />;
        }
    }

    // Size configurations
    const sizeConfig = {
        sm: { circle: 60, stroke: 6, text: 'text-sm' },
        md: { circle: 80, stroke: 8, text: 'text-base' },
        lg: { circle: 100, stroke: 10, text: 'text-lg' },
    };

    const config = sizeConfig[size];
    const radius = (config.circle - config.stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative" style={{ width: config.circle, height: config.circle }}>
                {/* Background circle */}
                <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox={`0 0 ${config.circle} ${config.circle}`}
                >
                    <circle
                        cx={config.circle / 2}
                        cy={config.circle / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={config.stroke}
                        className="text-muted/20"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={config.circle / 2}
                        cy={config.circle / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={config.stroke}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className={`${colorClass} transition-all duration-500 ease-out`}
                    />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        {isUnlimited ? (
                            <>
                                <span className={`${config.text} font-bold text-green-500`}>{current}</span>
                                <div className="text-xs text-muted-foreground leading-none mt-0.5">used</div>
                            </>
                        ) : (
                            <>
                                <span className={`${config.text} font-bold text-foreground`}>
                                    {Math.round(percentage)}%
                                </span>
                                {showLabel && (
                                    <div className="text-xs text-muted-foreground leading-none mt-0.5">
                                        {current}/{limit}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Label and status */}
            {label && (
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-foreground">{label}</span>
                    {statusIcon}
                </div>
            )}
        </div>
    );
};

export default CircularProgress;
