import { toast } from 'sonner';
import axios from 'axios';

export const handleError = (
    error: any,
    fallbackMessage = 'Something went wrong'
) => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || fallbackMessage;

        if (status?.toString().startsWith('5')) {
            toast.error(`${status} - ${message}`);
        } else if (error.request) {
            toast.error('Network error: No response received from server.');
        } else {
            toast.error(`Axios error: ${error.message}`);
        }
    } else {
        toast.error(fallbackMessage);
    }

    console.error('[ERROR]', error);
    return null;
};
