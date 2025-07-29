import { toast } from 'sonner';
import axios from 'axios';
import { useTranslations } from 'next-intl';

export const handleError = (error: any, fallbackMessage?: string) => {
    const t = useTranslations('common');
    const defaultMessage = fallbackMessage || t('somethingWentWrong');

    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || defaultMessage;

        if (status?.toString().startsWith('5')) {
            toast.error(`${status} - ${message}`);
        } else if (error.request) {
            toast.error(t('networkError'));
        } else {
            toast.error(t('axiosError', { message: error.message }));
        }
    } else {
        toast.error(defaultMessage);
    }

    console.error('[ERROR]', error);
    return null;
};
