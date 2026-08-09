import { Sparkles } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function AiInsightsPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.aiInsights}
            description="Cross-customer AI observations surfacing opportunities and risks."
            icon={<Sparkles className="h-10 w-10" aria-hidden />}
        />
    );
}
