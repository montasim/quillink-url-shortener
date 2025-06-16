'use client';

import { useEffect, useState } from 'react';
import { IShortUrl } from '@/app/data/types';
import { fetchUrls } from '@/app/(home)/actions';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import RenderUrlRow from '@/app/(home)/components/UrlRow';

const UrlDashboard = () => {
    const [urls, setUrls] = useState<IShortUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        fetchUrls(setUrls, setError, setLoading);
    }, []);

    return (
        <div className="w-full container mx-auto py-10">
            <h2 className="text-2xl font-bold mb-6">Your Short URLs</h2>
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
                                key={url.shortKey}
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
};

export default UrlDashboard;
