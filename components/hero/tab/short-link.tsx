'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { handleCreate } from '@/app/(home)/actions';
import ActionButton from '../action-button';


export default function ShortLink() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        originalUrl: '',
        expiresAt: '',
        customKey: '',
    });
    const [creating, setCreating] = useState(false);
    return (
        <div>
            <div className="w-full">
                <Label htmlFor="originalUrl">Paste a long URL</Label>{' '}
                <Input
                    id="originalUrl"
                    type="url"
                    placeholder="https://example.com/super-long-link-dot-com"
                    className="mt-2"
                    value={formData.originalUrl}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            originalUrl: e.target.value,
                        })
                    }
                />
            </div>

            <p className="mt-4 text-sm text-left">
                By clicking Shorten URL, you are agree to
                QuilLink&lsquo;s
                <Link
                    href="#"
                    className="ml-1 underline text-muted-foreground"
                >
                    Terms of use
                </Link>
                ,
                <Link
                    href="#"
                    className="ml-1 underline text-muted-foreground"
                >
                    Privacy Policy
                </Link>
                , and
                <Link
                    href="#"
                    className="ml-1 underline text-muted-foreground"
                >
                    Cookie Policy
                </Link>
            </p>

            <ActionButton
                targetText={creating ? 'Creating...' : 'Shorten URL'}
                className="mt-4"
                onClick={() =>
                    handleCreate(
                        formData,
                        setCreating,
                        setFormData,
                        router
                    )
                }
                disabled={creating}
            />
        </div>
    )
}
