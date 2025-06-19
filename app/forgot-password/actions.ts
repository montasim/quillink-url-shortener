import { toast } from 'sonner';
import { withErrorHandler } from '@/components/withErrorHandler';
import { createData, startProactiveRefresh } from '@/lib/axios';

export const handleForgotPassword = withErrorHandler(
    async (formData, setLoading: (val: boolean) => void, router: any) => {
        setLoading(true);

        await createData('/api/v1/auth/forgot-password', formData);

        startProactiveRefresh();

        toast.success(
            'Confirmation email send to your account. Reset your password.'
        );
        router.push('/dashboard/reset-password');
    },
    'Forgot password failed. Please check your email.'
);
