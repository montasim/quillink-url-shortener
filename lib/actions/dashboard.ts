import { handleFetchAction } from '@/services/url.service';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { toast } from 'sonner';

export const fetchUrls = async (
    setData: any,
    setLoading: (val: boolean) => void,
    t?: (key: string) => string
) => {
    await handleFetchAction({
        apiEndpoint: API_ENDPOINT.URLS,
        setLoading,
        setData,
        successMessage: t ? t('listing.success') : '',
    });
};

export const deleteUrl = async (
    shortKey: string,
    setLoading: (val: boolean) => void,
    onSuccess: () => void,
    t?: (key: string) => string
) => {
    setLoading(true);
    try {
        const res = await fetch(`${API_ENDPOINT.URLS}/${shortKey}`, {
            method: 'DELETE',
        });
        const result = await res.json();

        if (res.ok) {
            toast.success(result.message || (t ? t('url.deletion.success') : 'Link deleted successfully'));
            onSuccess();
        } else {
            toast.error(result.message || (t ? t('url.deletion.notFound') : 'Failed to delete link'));
        }
    } catch (error) {
        console.error('Error deleting link:', error);
        toast.error(t ? t('common.unexpectedError') : 'An unexpected error occurred');
    } finally {
        setLoading(false);
    }
};
