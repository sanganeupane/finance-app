import { useSyncExternalStore } from 'react';

function subscribe(query: string, onChange: () => void): () => void {
    const media = window.matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
}

/** Reactive matchMedia hook. Example: `useMediaQuery('(min-width: 768px)')`. */
export function useMediaQuery(query: string): boolean {
    return useSyncExternalStore(
        (onStoreChange) => subscribe(query, onStoreChange),
        () => window.matchMedia(query).matches,
        () => false,
    );
}
