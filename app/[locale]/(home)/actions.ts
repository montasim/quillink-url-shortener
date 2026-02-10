import { toast } from 'sonner';
import { format } from 'date-fns';
import { IShortUrl } from '@/types/types';
import { deleteData } from '@/lib/axios';
import { withErrorHandler } from '@/components/withErrorHandler';
import { handleAuthAction } from '@/services/auth.service';
import API_ENDPOINT from '@/constants/apiEndPoint';
import ROUTE_ENDPOINT from '@/constants/routeEndPoint';

export const handleCreate = async (
    formData: any,
    setLoading: (val: boolean) => void,
    router: any,
    t?: (key: string) => string
) => {
    await handleAuthAction({
        apiEndpoint: API_ENDPOINT.URLS,
        formData,
        setLoading,
        router,
        successRedirectUrl: ROUTE_ENDPOINT.DASHBOARD_URLS,
        successMessage: t ? t('creation.success') : 'Short URL created successfully.',
    });
};

export const handleCopy = async (url: string, t?: (key: string) => string) => {
    await navigator.clipboard.writeText(url);
    toast.success(t ? t('copiedToClipboard') : 'Copied to clipboard');
};

export const handleShare = (url: string, platform: string = 'link', t?: (key: string) => string) => {
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
        case 'twitter':
            window.open(
                `https://twitter.com/intent/tweet?url=${encodedUrl}`,
                '_blank'
            );
            break;

        case 'facebook':
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                '_blank'
            );
            break;

        case 'instagram':
            // Instagram does not support direct URL sharing via a link
            alert(
                t ? t('instagramManualShare') : 'Instagram does not support direct web sharing. Please share manually.'
            );
            break;

        case 'github':
            window.open(`https://github.com/search?q=${encodedUrl}`, '_blank');
            break;

        case 'link':
        default:
            navigator.clipboard
                .writeText(url)
                .then(() => alert(t ? t('linkCopiedAlert') : 'Link copied to clipboard!'))
                .catch(() => alert(t ? t('linkCopyFailedAlert') : 'Failed to copy link.'));
            break;
    }
};

export const handleDelete = withErrorHandler(
    async (setUrls, shortKey: string, t?: (key: string) => string) => {
        if (!confirm(t ? t('confirmDeleteAlert') : 'Are you sure you want to delete this short URL?')) return;

        await deleteData(`/api/v1/urls/${shortKey}`);
        setUrls((prev: IShortUrl[]) =>
            prev.filter((url: IShortUrl) => url.shortKey !== shortKey)
        );
        toast.success(t ? t('deletedSuccessfully') : 'Deleted successfully');
    },
    'Failed to delete the short URL'
);

export const generateQrUrl = (shortKey: string) =>
    `/api/v1/urls/qr-code/${shortKey}`;

export const safeFormat = (date?: string, fallback = '-') => {
    try {
        return date ? format(new Date(date), 'PPP') : fallback;
    } catch {
        return fallback;
    }
};
