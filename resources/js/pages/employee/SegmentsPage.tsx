import { Shapes } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function SegmentsPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.segments}
            description="Rule and AI-driven customer segments with sizes and traits."
            icon={<Shapes className="h-10 w-10" aria-hidden />}
        />
    );
}
