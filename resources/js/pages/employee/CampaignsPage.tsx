import { Megaphone } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function CampaignsPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.campaigns}
            description="Targeted campaigns across segments with execution status."
            icon={<Megaphone className="h-10 w-10" aria-hidden />}
        />
    );
}
