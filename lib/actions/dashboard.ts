import { handleFetchAction } from '@/services/url.service';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { toast } from 'sonner';

export const fetchUrls = async (
    setData: any,
    setLoading: (val: boolean) => void
) => {
    await handleFetchAction({
        apiEndpoint: API_ENDPOINT.URLS,
        setLoading,
        setData,
        successMessage: '',
    });
};

export const deleteUrl = async (
    shortKey: string,
    setLoading: (val: boolean) => void,
    onSuccess: () => void
) => {
    setLoading(true);
    try {
        const res = await fetch(`${API_ENDPOINT.URLS}/${shortKey}`, {
            method: 'DELETE',
        });
        const result = await res.json();

        if (res.ok) {
            toast.success(result.message || 'Link deleted successfully');
            onSuccess();
        } else {
            toast.error(result.message || 'Failed to delete link');
        }
    } catch (error) {
        console.error('Error deleting link:', error);
        toast.error('An unexpected error occurred');
    } finally {
        setLoading(false);
    }
};
