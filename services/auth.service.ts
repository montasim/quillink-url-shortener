import { createData } from '@/lib/axios';
import { toast } from 'sonner';

interface AuthActionParams {
    apiEndpoint: string;
    formData: any;
    setLoading: (val: boolean) => void;
    router: any;
    successRedirectUrl?: string;
    successMessage?: string;
    errorMessage?: string;
}

export const handleAuthAction = async ({
    apiEndpoint,
    formData,
    setLoading,
    router,
    successRedirectUrl,
    successMessage,
    errorMessage,
}: AuthActionParams) => {
    setLoading(true);

    try {
        const { success, message } = await createData(apiEndpoint, formData);

        if (success) {
            toast.success(successMessage || message);
            if (successRedirectUrl) {
                router.push(successRedirectUrl);
            }
        } else {
            toast.error(errorMessage || message);
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            toast.error(error.response.data.message);
        } else {
            toast.error(
                errorMessage ||
                    'An unexpected error occurred. Please try again.'
            );
        }
    } finally {
        setLoading(false);
    }
};
