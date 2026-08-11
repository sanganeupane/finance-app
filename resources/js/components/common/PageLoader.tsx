import { LoaderCircle } from 'lucide-react';

/** Full-height route-level loading fallback. */
export function PageLoader() {
    return (
        <div
            role="status"
            aria-label="Loading"
            className="flex min-h-[50vh] items-center justify-center text-primary"
        >
            <LoaderCircle className="h-8 w-8 animate-spin" aria-hidden />
        </div>
    );
}
