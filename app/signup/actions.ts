import { toast } from 'sonner';
import { withErrorHandler } from '@/components/withErrorHandler';
import { createData } from '@/lib/axios';

export const handleSignup = withErrorHandler(
    async (formData, setLoading: (val: boolean) => void, router: any) => {
        setLoading(true);

        const { data } = await createData('/api/v1/auth/signup', formData);

        toast.success('Signup successful');
        router.push('/login');
    },
    'Signup failed. Please check your types.'
);
