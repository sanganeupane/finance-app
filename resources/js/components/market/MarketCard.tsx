import { TrendingDown, TrendingUp } from 'lucide-react';

import { Sparkline } from '@/components/charts';
import { StatusBadge } from '@/components/common';
import { formatCurrency, formatNumber } from '@/utils/format';
import { cn } from '@/utils/cn';

export interface MarketCardProps {
    item: {
        symbol: string;
        name: string;
        price: number;
        change: number;
        percentage: number;
        volume: number;
        sector: string;
        risk: 'low' | 'medium' | 'high';
        trend: 'up' | 'down' | 'flat';
    };
    sparkline?: number[];
    showRecommendation?: boolean;
    showVolume?: boolean;
}

/**
 * Single market instrument row used across trending / gainers / losers lists.
 * Numbers and trends come from the data contract — never derived client-side.
 */
export function MarketCard({ item, sparkline, showRecommendation = false, showVolume = true }: MarketCardProps) {
    const isUp = item.change >= 0;
    const TrendIcon = isUp ? TrendingUp : TrendingDown;

    return (
        <article className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4">
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-ink">{item.symbol}</p>
                    <span className="hidden shrink-0 rounded bg-canvas px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline">
                        {item.sector}
                    </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted">{item.name}</p>
                <p className="mt-1.5 text-base font-semibold text-ink">{formatCurrency(item.price)}</p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
                <p
                    className={cn(
                        'inline-flex items-center gap-0.5 text-sm font-semibold',
                        isUp ? 'text-success' : 'text-danger',
                    )}
                >
                    <TrendIcon className="h-3.5 w-3.5" aria-hidden />
                    {item.percentage.toFixed(2)}%
                </p>
                <p className="text-xs text-muted">
                    {isUp ? '+' : '-'}
                    {formatCurrency(Math.abs(item.change))}
                </p>
                {showVolume ? <p className="text-[10px] text-muted">{formatNumber(item.volume)} vol</p> : null}
                {showRecommendation ? <StatusBadge status={item.risk} /> : null}
            </div>

            {sparkline ? <Sparkline data={sparkline} width={64} height={30} /> : null}
        </article>
    );
}
