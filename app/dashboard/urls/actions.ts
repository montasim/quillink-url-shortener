import { getData } from '@/lib/axios';
import { withErrorHandler } from '@/components/withErrorHandler';

export const fetchUrls = withErrorHandler(
    async (setUrls, setError, setLoading) => {
        const { data } = await getData('/api/v1/urls');
        setUrls(data);
        setLoading(false);
    },
    'Failed to fetch short URLs'
);
