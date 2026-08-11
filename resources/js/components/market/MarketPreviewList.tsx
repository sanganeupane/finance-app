import { Link } from 'react-router-dom';
import { TrendingDown, TrendingUp } from 'lucide-react';

import { Sparkline } from '@/components/charts';
import { formatCurrency } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { MarketItem } from '@/types/market';

export interface MarketPreviewListProps {
    items: MarketItem[];
    to?: string;
    limit?: number;
    sparklines?: Record<string, number[]>;
}

/**
 * Compact instrument rows for dashboard previews (gainers / losers /
 * most traded / watchlist). Prices and changes come from the data contract.
 */
export function MarketPreviewList({ items, to = '/customer/market', limit = 3, sparklines }: MarketPreviewListProps) {
    const rows = items.slice(0, limit);

    if (rows.length === 0) return null;

    return (
        <ul className="flex flex-col gap-2">
            {rows.map((item) => {
                const isUp = item.change >= 0;
                const TrendIcon = isUp ? TrendingUp : TrendingDown;
                const spark = sparklines?.[item.symbol];

                const row = (
                    <div className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-medium text-ink">{item.symbol}</p>
                                {item.recommendation ? (
                                    <span className="hidden shrink-0 rounded bg-canvas px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline">
                                        {item.recommendation}
                                    </span>
                                ) : null}
                            </div>
                            <p className="truncate text-xs text-muted">{item.name}</p>
                        </div>
                        <div className="shrink-0 text-right">
                            <p className="text-sm font-semibold text-ink">{formatCurrency(item.price)}</p>
                            <p
                                className={cn(
                                    'inline-flex items-center gap-0.5 text-xs font-medium',
                                    isUp ? 'text-success' : 'text-danger',
                                )}
                            >
                                <TrendIcon className="h-3 w-3" aria-hidden />
                                {item.percentage.toFixed(2)}%
                            </p>
                        </div>
                        {spark ? <Sparkline data={spark} width={56} height={24} /> : null}
                    </div>
                );

                return (
                    <li key={item.id}>
                        {to ? (
                            <Link
                                to={to}
                                className="block rounded-lg border border-line bg-surface p-3 transition-colors hover:border-primary/40"
                            >
                                {row}
                            </Link>
                        ) : (
                            <div className="rounded-lg border border-line bg-surface p-3">{row}</div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
