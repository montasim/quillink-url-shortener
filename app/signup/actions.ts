import { toast } from 'sonner';
import axios from 'axios';
import { withErrorHandler } from '@/components/withErrorHandler';

export const handleSignup = withErrorHandler(
    async (formData, setLoading: (val: boolean) => void, router: any) => {
        setLoading(true);

        const { data } = await axios.post('/api/v1/auth/signup', formData);

        toast.success('Signup successful');
        router.push('/login');
    },
    'Signup failed. Please check your data.'
);
