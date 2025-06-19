import { toast } from 'sonner';
import { withErrorHandler } from '@/components/withErrorHandler';
import { createData } from '@/lib/axios';

export const handleForgotPassword = withErrorHandler(
    async (formData, setLoading: (val: boolean) => void, router: any) => {
        setLoading(true);

        await createData('/api/v1/auth/forgot-password', formData);

        toast.success(
            'Confirmation email send to your account. Reset your password.'
        );
        router.push('/reset-password');
    },
    'Forgot password failed. Please check your email.'
);
