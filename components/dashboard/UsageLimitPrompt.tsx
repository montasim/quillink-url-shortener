'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UsageLimitPromptProps {
    /** Type of prompt: 'limit-reached' (red) or 'low-limit' (orange) */
    variant: 'limit-reached' | 'low-limit';
    /** Whether the user is authenticated */
    isAuthenticated: boolean;
    /** Translation function */
    t: (key: string) => string;
    /** Optional: limit value for limit-reached variant */
    limit?: number;
    /** Optional: remaining count for low-limit variant */
    remaining?: number;
}

const UsageLimitPrompt: React.FC<UsageLimitPromptProps> = ({
    variant,
    isAuthenticated,
    t,
    limit,
    remaining,
}) => {
    const isLimitReached = variant === 'limit-reached';

    // Styling based on variant
    const styles = isLimitReached
        ? {
              wrapper: 'border border-red-500/20 bg-gradient-to-br from-red-500/5 to-orange-500/5',
              iconWrapper: 'bg-red-500/10',
              icon: 'text-red-500',
          }
        : {
              wrapper: 'border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-yellow-500/5',
              iconWrapper: 'bg-orange-500/10',
              icon: 'text-orange-500',
          };

    // Content based on variant
    const title = isLimitReached ? t('limitTitle') : t('lowLimitTitle');
    const message = isLimitReached
        ? t('limitMessage', { limit: limit || 0 })
        : t('lowLimitMessage', { remaining: remaining || 0 });
    const promptMessage = isLimitReached
        ? isAuthenticated
            ? t('upgradeMessage.upgrade')
            : t('upgradeMessage.signup')
        : isAuthenticated
          ? t('lowLimitPrompt.upgrade')
          : t('lowLimitPrompt.signup');

    // Button click handler
    const getButtonClickHandler = () => {
        if (!isAuthenticated) {
            return '/signup';
        }
        return isLimitReached ? '/pricing' : '/pricing';
    };

    return (
        <div className={`mb-6 p-6 rounded-2xl ${styles.wrapper}`}>
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl ${styles.iconWrapper}`}>
                    <AlertCircle className={`w-6 h-6 ${styles.icon}`} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        {message}
                        <>{promptMessage}</>
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {!isAuthenticated ? (
                            <>
                                <Button
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                    onClick={() => (window.location.href = '/signup')}
                                >
                                    {t('signUpFree')}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => (window.location.href = '/login')}
                                >
                                    {t('login')}
                                </Button>
                            </>
                        ) : (
                            <Button
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                onClick={() => (window.location.href = getButtonClickHandler())}
                            >
                                {t('upgradeMessage.upgrade')}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsageLimitPrompt;
