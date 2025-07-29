import axios from 'axios';
import { toast } from 'sonner';
import contentTypesLite from 'content-types-lite';
import { createData } from '@/lib/axios';
import MESSAGES from '@/constants/messages';

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
            toast.error(errorMessage || MESSAGES.COMMON.UNEXPECTED_ERROR);
        }
    } finally {
        setLoading(false);
    }
};

export async function verifyTurnstileToken(token: string, ip?: string) {
    const secret = process.env.CF_TURNSTILE_SECRET_KEY!;
    const verifyUrl = process.env.CF_TURNSTILE_VERIFY_URL!;
    const response = await axios.post(
        verifyUrl,
        new URLSearchParams({
            secret,
            response: token,
            ...(ip ? { remoteip: ip } : {}),
        }),
        {
            headers: {
                'Content-Type': contentTypesLite.FORM_URLENCODED,
            },
        }
    );

    return response.data.success;
}
