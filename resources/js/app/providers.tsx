import type { ReactNode } from 'react';

import { ToastProvider } from '@/components/ui';
import { AuthProvider } from '@/services/auth/AuthProvider';

/**
 * App-level providers, ordered outside-to-inside.
 * Add new providers here (e.g. query client) rather than nesting them in pages.
 */
export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
    );
}
