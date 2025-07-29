import { handleAuthAction } from '@/services/auth.service';
import API_ENDPOINT from '@/constants/apiEndPoint';
import ROUTE_ENDPOINT from '@/constants/routeEndPoint';

export const handleSignup = async (
    formData: any,
    setLoading: (val: boolean) => void,
    router: any
) => {
    await handleAuthAction({
        apiEndpoint: API_ENDPOINT.SIGNUP,
        formData,
        setLoading,
        router,
        successRedirectUrl: ROUTE_ENDPOINT.LOGIN,
        successMessage: 'Signup successful! Please log in.',
    });
};
