'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { IUserProfile } from '@/types/types';
import { checkAuth } from '@/components/navbar/actions';

interface AuthContextType {
    isAuthenticated: boolean;
    user: IUserProfile | null;
    loading: boolean;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const refreshAuth = async () => {
        setLoading(true);
        const { authenticated, user } = await checkAuth();
        setIsAuthenticated(authenticated);
        setUser(user || null);
        setLoading(false);
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, loading, refreshAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
