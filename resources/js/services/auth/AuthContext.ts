import { createContext } from 'react';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    roles: string[];
}

export type AuthStatus = 'loading' | 'authenticated' | 'guest';

export interface AuthContextValue {
    user: AuthUser | null;
    status: AuthStatus;
    isAuthenticated: boolean;
    signIn: (user: AuthUser) => void;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
