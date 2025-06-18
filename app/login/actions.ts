import { toast } from 'sonner';
import { withErrorHandler } from '@/components/withErrorHandler';
import { createData } from '@/lib/axios';

export const handleLogin = withErrorHandler(
    async (
        formData,
        setLoading: (val: boolean) => void,
        router: any,
        refreshAuth
    ) => {
        setLoading(true);

        const { data } = await createData('/api/v1/auth/login', formData);

        await refreshAuth(); // 🧠 make sure auth context is updated

        toast.success(`Login successful. Welcome ${data.name}`);
        router.push('/dashboard/urls'); // or wherever your post-login page is
    },
    'Login failed. Please check your credentials.'
);

export const handleGoogleLogin = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };

    const qs = new URLSearchParams(options);
    window.location.href = `${rootUrl}?${qs.toString()}`;
};
