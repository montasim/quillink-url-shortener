import { handleFetchAction } from '@/services/url.service';
import API_ENDPOINT from '@/constants/apiEndPoint';

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
