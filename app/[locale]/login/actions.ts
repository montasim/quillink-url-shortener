import { handleAuthAction } from '@/services/auth.service';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { startProactiveRefresh } from '@/lib/axios';
import ROUTE_ENDPOINT from '@/constants/routeEndPoint';
import configuration from '@/configuration/configuration';

export const handleLogin = async (
    formData: any,
    setLoading: (val: boolean) => void,
    router: any,
    refreshAuth: any
) => {
    await handleAuthAction({
        apiEndpoint: API_ENDPOINT.LOGIN,
        formData,
        setLoading,
        router,
        successRedirectUrl: ROUTE_ENDPOINT.DASHBOARD_URLS,
        successMessage: 'Login successful! Redirecting to dashboard.',
    });

    await refreshAuth(); // 🧠 make sure auth context is updated
    startProactiveRefresh();
};

export const handleGoogleLogin = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: configuration.googleOauth2.publicRedirectUri,
        client_id: configuration.googleOauth2.publicClientId,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };

    const qs = new URLSearchParams(options);
    window.location.href = `${rootUrl}?${qs.toString()}`;
};
