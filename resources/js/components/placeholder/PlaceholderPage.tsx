import type { ReactNode } from 'react';
import { Hammer } from 'lucide-react';

export interface PlaceholderPageProps {
    title: string;
    description: string;
    icon?: ReactNode;
    eyebrow?: string;
}

/**
 * Temporary page scaffold written in plain HTML-like JSX
 * (semantic elements + Tailwind classes, same conventions as Blade markup).
 */
export function PlaceholderPage({ title, description, icon, eyebrow }: PlaceholderPageProps) {
    return (
        <section className="flex flex-col gap-4">
            <header className="flex flex-col gap-1">
                {eyebrow ? (
                    <span className="w-fit rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                        {eyebrow}
                    </span>
                ) : null}
                <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
                <p className="text-sm text-muted">{description}</p>
            </header>

            <div className="rounded-lg border border-line bg-surface p-6">
                <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-line bg-canvas/60 px-6 py-12 text-center">
                    <span className="text-muted" aria-hidden>
                        {icon ?? <Hammer className="h-10 w-10" />}
                    </span>
                    <div>
                        <h2 className="font-semibold text-ink">{title} is under construction</h2>
                        <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
                            This area will be built in a later phase using the shared design system and API layer.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
