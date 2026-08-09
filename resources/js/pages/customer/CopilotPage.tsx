import { Bot } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function CopilotPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.copilot}
            description="Conversational assistant for banking questions and guidance."
            icon={<Bot className="h-10 w-10" aria-hidden />}
        />
    );
}
