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
        if (res.success) {
            return { authenticated: true, user: res.data };
        } else {
            const refreshRes = await getData('/api/v1/auth/refresh');
            if (refreshRes.status === httpStatusLite.OK) {
                const recheckRes = await getData('/api/v1/auth/me');
                if (recheckRes.status === httpStatusLite.OK) {
                    return { authenticated: true, user: recheckRes.data };
                }
            }
        }

        return { authenticated: false };
    } catch (err) {
        console.error('Error during authentication check:', err);
        return { authenticated: false };
    }
};
