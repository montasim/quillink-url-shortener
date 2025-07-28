'use client';

import { useEffect, useState } from 'react';
import { IShortUrl } from '@/types/types';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import RenderUrlRow from '@/app/(home)/components/UrlRow';
import { fetchUrls } from '@/app/dashboard/urls/actions';

const UrlDashboard = () => {
    const [urls, setUrls] = useState<IShortUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        fetchUrls(setUrls, setError, setLoading);
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto 2xl:my-20 xl:my-16 lg:my-14 md:my-8 sm:my-6 my-4 px-4 xl:px-0">
            <h2 className="2xl:text-2xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg font-bold 2xl:mb-6 xl:mb-6 lg:mb-5 md:mb-4 sm:mb-4 mb-3 text-primary">
                Your Short URLs
            </h2>
            {loading ? (
                <p className="text-muted">Loading short URLs...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : urls.length === 0 ? (
                <div className="text-center text-muted py-10">
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
                <Table className="w-full text-primary">
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
