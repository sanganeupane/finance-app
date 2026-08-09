import type { ReactNode } from 'react';
import { Hammer } from 'lucide-react';

import { Badge, Card, EmptyState } from '@/components/ui';

export interface PlaceholderPageProps {
    title: string;
    description: string;
    icon?: ReactNode;
    eyebrow?: string;
}

/** Temporary lightweight page scaffold used until Phase 2+ features land. */
export function PlaceholderPage({ title, description, icon, eyebrow }: PlaceholderPageProps) {
    return (
        <div className="flex flex-col gap-4">
            <header className="flex flex-col gap-1">
                {eyebrow ? (
                    <Badge variant="primary" className="w-fit">
                        {eyebrow}
                    </Badge>
                ) : null}
                <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
                <p className="text-sm text-muted">{description}</p>
            </header>
            <Card className="bg-primary-softer">
                <EmptyState
                    icon={icon ?? <Hammer className="h-10 w-10" aria-hidden />}
                    title={`${title} is under construction`}
                    description="This area will be built in a later phase using the shared design system and API layer."
                />
            </Card>
        </div>
    );
}
