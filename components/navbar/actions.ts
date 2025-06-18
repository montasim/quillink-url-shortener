import httpStatusLite from 'http-status-lite';
import { IUserProfile } from '@/types/types';
import { withErrorHandler } from '@/components/withErrorHandler';
import { getData } from '@/lib/axios';

export const checkAuth = async (): Promise<{
    authenticated: boolean;
    user?: IUserProfile;
}> => {
    try {
        const res = await getData('/api/v1/auth/me');

        if (res.status === httpStatusLite.OK) {
            const data = await res.json();
            // Assuming your sendResponse wraps types in a 'types' field
            return { authenticated: true, user: data };
        }

        if (res.status === httpStatusLite.UNAUTHORIZED) {
            const refreshRes = await getData('/api/v1/auth/refresh');

            if (refreshRes.status === httpStatusLite.OK) {
                // If refresh succeeds, re-check auth to get new user types if needed,
                // or assume user is now authenticated and let the next checkAuth call handle it,
                // or ideally, the refresh endpoint would return user types.
                // For simplicity, let's assume refresh implicitly authenticates,
                // and we might need another /me call or the refresh returns types.
                // A better refresh would return the new accessToken and user info.
                // For now, let's just indicate success and possibly trigger another /me call.
                const recheckRes = await fetch('/api/v1/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (recheckRes.status === httpStatusLite.OK) {
                    const data = await recheckRes.json();
                    return { authenticated: true, user: data };
                }
            }
            return { authenticated: false };
        }

        return { authenticated: false };
    } catch (err) {
        console.error('Error during authentication check:', err);
        return { authenticated: false };
    }
};
