'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PasswordModalProps {
    onSubmit: (password: string) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
    error?: string | null;
}

export default function PasswordModal({
    onSubmit,
    onCancel,
    isLoading,
    error,
}: PasswordModalProps) {
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.trim()) {
            await onSubmit(password);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                    <h2 className="text-lg font-semibold">Password Required</h2>
                </div>

                <p className="text-muted-foreground mb-4">
                    This content is password protected. Enter the password to view.
                </p>

                <form onSubmit={handleSubmit}>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        disabled={isLoading}
                        className="mb-4"
                        autoFocus
                    />

                    {error && (
                        <p className="text-sm text-destructive mb-4">{error}</p>
                    )}

                    <div className="flex gap-2">
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isLoading}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            type="submit"
                            disabled={isLoading || !password.trim()}
                            className="flex-1"
                        >
                            {isLoading ? 'Verifying...' : 'View Content'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
