import { useEffect, useState } from 'react';

export type AsyncState<T> = {
    status: 'idle' | 'loading' | 'success' | 'error';
    data: T | null;
    error: Error | null;
};

/**
 * Generic data-fetching hook.
 * - Runs `fetcher` whenever `deps` change and on `refetch()`.
 * - Stale resolutions are cancelled when the effect re-runs.
 * - State is only set inside promise callbacks / handlers (never synchronously
 *   inside an effect body) so the react-hooks `set-state-in-effect` rule stays happy.
 *
 * Usage:
 *   const { status, data, error, refetch } = useAsync(() => dashboardService.get(), []);
 */
export function useAsync<T>(fetcher: () => Promise<T>, deps: readonly unknown[]) {
    const [state, setState] = useState<AsyncState<T>>({ status: 'loading', data: null, error: null });

    useEffect(() => {
        let cancelled = false;

        fetcher()
            .then((data) => {
                if (!cancelled) setState({ status: 'success', data, error: null });
            })
            .catch((error: unknown) => {
                if (!cancelled) {
                    setState({
                        status: 'error',
                        data: null,
                        error: error instanceof Error ? error : new Error(String(error)),
                    });
                }
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    const refetch = () => {
        setState({ status: 'loading', data: null, error: null });
        fetcher()
            .then((data) => setState({ status: 'success', data, error: null }))
            .catch((error: unknown) => {
                setState({
                    status: 'error',
                    data: null,
                    error: error instanceof Error ? error : new Error(String(error)),
                });
            });
    };

    return { ...state, refetch };
}
