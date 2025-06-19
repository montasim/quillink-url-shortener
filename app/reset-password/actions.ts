import { toast } from 'sonner';
import { withErrorHandler } from '@/components/withErrorHandler';
import { createData } from '@/lib/axios';

export const handleResetPassword = withErrorHandler(
    async (formData, setLoading: (val: boolean) => void, router: any) => {
        setLoading(true);

        await createData('/api/v1/auth/reset-password', formData);

        toast.success(
            'Password reset successful. Please login to your account.'
        );
        router.push('/login');
    },
    'Reset password failed. Please try again later.'
);
