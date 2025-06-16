'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const RedirectPage = () => {
    const params = useParams();
    const shortKey = params?.shortKey as string;

    useEffect(() => {
        if (!shortKey) return;
        window.location.href = `/api/v1/${shortKey}`;
    }, [shortKey]);

    return (
        <div className="h-screen flex items-center justify-center gap-4">
            <p>Redirecting ...</p>
        </div>
    );
};

export default RedirectPage;
