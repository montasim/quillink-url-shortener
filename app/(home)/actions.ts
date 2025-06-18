import { toast } from 'sonner';
import { format } from 'date-fns';
import { IShortUrl } from '@/types/types';
import { createData, deleteData, getData } from '@/lib/axios';
import { withErrorHandler } from '@/components/withErrorHandler';

export const handleCreate = withErrorHandler(
    async (formData, setCreating, setFormData, router) => {
        if (!formData.originalUrl) {
            toast.error('Original URL is required.');
            return;
        }

        setCreating(true);
        await createData('/api/v1/urls', {
            originalUrl: formData.originalUrl,
        });

        toast.success('Short URL created!');
        setFormData({ originalUrl: '', expiresAt: '', customKey: '' });
        setCreating(false);
        router.push('/dashboard/urls');
    },
    'Failed to create short URL'
);

export const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard');
};

export const handleShare = (url: string, platform: string = 'link') => {
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
                'Instagram does not support direct web sharing. Please share manually.'
            );
            break;

        case 'github':
            window.open(`https://github.com/search?q=${encodedUrl}`, '_blank');
            break;

        case 'link':
        default:
            navigator.clipboard
                .writeText(url)
                .then(() => alert('Link copied to clipboard!'))
                .catch(() => alert('Failed to copy link.'));
            break;
    }
};

export const handleDelete = withErrorHandler(
    async (setUrls, shortKey: string) => {
        if (!confirm('Are you sure you want to delete this short URL?')) return;

        await deleteData(`/api/v1/urls/${shortKey}`);
        setUrls((prev: IShortUrl[]) =>
            prev.filter((url: IShortUrl) => url.shortKey !== shortKey)
        );
        toast.success('Deleted successfully');
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
