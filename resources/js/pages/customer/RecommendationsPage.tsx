import { ThumbsUp } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function RecommendationsPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.recommendations}
            description="Curated next-best actions matched to the customer's profile."
            icon={<ThumbsUp className="h-10 w-10" aria-hidden />}
        />
    );
}
