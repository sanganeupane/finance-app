import { useCallback, useMemo, useState, type ReactNode } from 'react';

import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { AuthContext, type AuthStatus, type AuthUser } from './AuthContext';

/**
 * Authentication state foundation.
 *
 * Laravel authenticates via secure session cookies (not bearer tokens).
 * Phase 1 ships the guest/loading scaffolding; the `loading -> authenticated`
 * flow wires to the Laravel `api/user` endpoint when auth routes are added.
 * No credentials or tokens are ever persisted to localStorage.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [status, setStatus] = useState<AuthStatus>('guest');

    const signIn = useCallback((nextUser: AuthUser) => {
        setUser(nextUser);
        setStatus('authenticated');
    }, []);

    const signOut = useCallback(async () => {
        try {
            await apiClient.post(API_ENDPOINTS.auth.logout);
        } catch {
            // Best-effort: clear local state regardless of network outcome.
        } finally {
            setUser(null);
            setStatus('guest');
        }
    }, []);

    const value = useMemo(
        () => ({
            user,
            status,
            isAuthenticated: status === 'authenticated' && user !== null,
            signIn,
            signOut,
        }),
        [user, status, signIn, signOut],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
