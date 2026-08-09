import { Sparkles } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function AiInsightsPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.aiInsights}
            description="Personalised AI-driven observations about this customer's finances."
            icon={<Sparkles className="h-10 w-10" aria-hidden />}
        />
    );
}
