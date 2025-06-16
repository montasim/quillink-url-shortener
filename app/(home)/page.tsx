'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IShortUrl } from '@/app/data/types';
import { fetchUrls, handleCreate } from '@/app/(home)/actions';
import RenderUrlRow from '@/app/(home)/components/UrlRow';

export default function HomePage() {
    const [urls, setUrls] = useState<IShortUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        originalUrl: '',
        expiresAt: '',
        customKey: '',
    });
    const [creating, setCreating] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        fetchUrls(setUrls, setError, setLoading);
    }, []);

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">🔗 Shrnkr</h1>

            <div className="border p-6 rounded-xl bg-muted/50 space-y-4">
                <h2 className="text-2xl font-semibold">Create a Short URL</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="originalUrl">Original URL</Label>
                        <Input
                            id="originalUrl"
                            type="url"
                            placeholder="https://example.com"
                            value={formData.originalUrl}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    originalUrl: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={() =>
                                handleCreate(
                                    formData,
                                    setCreating,
                                    setUrls,
                                    setFormData
                                )
                            }
                            disabled={creating}
                        >
                            {creating ? 'Creating...' : 'Create'}
                        </Button>
                    </div>
                </div>
            </div>

            {loading ? (
                <p className="text-muted-foreground">Loading short URLs...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : urls.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">
                    <img
                        src="/empty.svg"
                        alt="Empty"
                        className="mx-auto h-32"
                    />
                    <p className="mt-4">
                        No short URLs yet. Start by creating one!
                    </p>
                </div>
            ) : (
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Created At</TableHead>
                            <TableHead>Original URL</TableHead>
                            <TableHead>Short URL</TableHead>
                            <TableHead>Clicks</TableHead>
                            <TableHead className="text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {urls.map((url) => (
                            <RenderUrlRow
                                key={url.id}
                                url={url}
                                expandedId={expandedId}
                                setExpandedId={setExpandedId}
                                setUrls={setUrls}
                            />
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
