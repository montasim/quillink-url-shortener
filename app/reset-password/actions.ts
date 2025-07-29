import { handleAuthAction } from '@/services/auth.service';
import API_ENDPOINT from '@/constants/apiEndPoint';
import ROUTE_ENDPOINT from '@/constants/routeEndPoint';

export const handleResetPassword = async (
    formData: any,
    setLoading: (val: boolean) => void,
    router: any
) => {
    await handleAuthAction({
        apiEndpoint: API_ENDPOINT.RESET_PASSWORD,
        formData,
        setLoading,
        router,
        successRedirectUrl: ROUTE_ENDPOINT.LOGIN,
        successMessage:
            'Password reset successful. Please login to your account.',
    });
};
