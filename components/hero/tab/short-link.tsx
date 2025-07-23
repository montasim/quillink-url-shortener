'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { handleCreate } from '@/app/(home)/actions';
import ActionButton from '../action-button';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon } from 'lucide-react';


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
                    className="ml-1 underline text-blue-600"
                >
                    Terms of use
                </Link>
                ,
                <Link
                    href="#"
                    className="ml-1 underline text-blue-600"
                >
                    Privacy Policy
                </Link>
                , and
                <Link
                    href="#"
                    className="ml-1 underline text-blue-600"
                >
                    Cookie Policy
                </Link>
            </p>

            <Button
                className="mt-4 w-full cursor-pointer bg-gradient-to-r from-purple-300 via-blue-500 to-purple-600"
                onClick={() =>
                    handleCreate(
                        formData,
                        setCreating,
                        setFormData,
                        router
                    )
                }
                disabled={creating}>
                <LinkIcon className="w-4 h-4 mr-2" />
                <span>{creating ? 'Creating...' : 'Shorten URL'}</span>
            </Button>
        </div>
    )
}
