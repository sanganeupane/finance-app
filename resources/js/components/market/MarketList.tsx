import type { ReactNode } from 'react';

import { MarketCard } from './MarketCard';
import type { MarketItem } from '@/types/market';

export interface MarketListProps {
    items: MarketItem[];
    showRecommendation?: boolean;
    showVolume?: boolean;
    sparklines?: Record<string, number[]>;
    empty?: ReactNode;
}

/** Renders a vertical list of market instrument cards. */
export function MarketList({ items, showRecommendation, showVolume, sparklines, empty }: MarketListProps) {
    if (items.length === 0) {
        return <>{empty}</>;
    }
    return (
        <ul className="flex flex-col gap-2">
            {items.map((item) => (
                <li key={item.id}>
                    <MarketCard
                        item={item}
                        showRecommendation={showRecommendation}
                        showVolume={showVolume}
                        sparkline={sparklines?.[item.symbol]}
                    />
                </li>
            ))}
        </ul>
    );
}
