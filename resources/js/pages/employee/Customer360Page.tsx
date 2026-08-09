import { useParams } from 'react-router-dom';
import { UserRound } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function Customer360Page() {
    const { id } = useParams<{ id: string }>();

    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={`${NAV_LABELS.employee.customer360} · ${id ?? '—'}`}
            description="Full 360-degree view: products, behavior, health, insights and next best action."
            icon={<UserRound className="h-10 w-10" aria-hidden />}
        />
    );
}
