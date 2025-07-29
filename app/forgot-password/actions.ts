import { handleAuthAction } from '@/services/auth.service';
import API_ENDPOINT from '@/constants/apiEndPoint';
import ROUTE_ENDPOINT from '@/constants/routeEndPoint';

export const handleForgotPassword = async (
    formData: any,
    setLoading: (val: boolean) => void,
    router: any
) => {
    await handleAuthAction({
        apiEndpoint: API_ENDPOINT.FORGOT_PASSWORD,
        formData,
        setLoading,
        router,
        successRedirectUrl: ROUTE_ENDPOINT.RESET_PASSWORD,
        successMessage: 'Password reset link sent to your email!',
    });
};
