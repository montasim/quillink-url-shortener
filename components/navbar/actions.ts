import httpStatusLite from 'http-status-lite';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    picture?: string;
    // ... any other user fields you want to display
}

export const checkAuth = async (): Promise<{
    authenticated: boolean;
    user?: UserProfile;
}> => {
    try {
        const res = await fetch('/api/v1/auth/me', {
            method: 'GET',
            credentials: 'include',
        });

        if (res.status === httpStatusLite.OK) {
            const data = await res.json();
            // Assuming your sendResponse wraps data in a 'data' field
            return { authenticated: true, user: data.data };
        }

        if (res.status === httpStatusLite.UNAUTHORIZED) {
            const refreshRes = await fetch('/api/v1/auth/refresh', {
                method: 'GET',
                credentials: 'include',
            });

            if (refreshRes.status === httpStatusLite.OK) {
                // If refresh succeeds, re-check auth to get new user data if needed,
                // or assume user is now authenticated and let the next checkAuth call handle it,
                // or ideally, the refresh endpoint would return user data.
                // For simplicity, let's assume refresh implicitly authenticates,
                // and we might need another /me call or the refresh returns data.
                // A better refresh would return the new accessToken and user info.
                // For now, let's just indicate success and possibly trigger another /me call.
                const recheckRes = await fetch('/api/v1/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (recheckRes.status === httpStatusLite.OK) {
                    const data = await recheckRes.json();
                    return { authenticated: true, user: data.data };
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
