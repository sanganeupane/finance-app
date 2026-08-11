import { Link } from 'react-router-dom';
import { Target, TrendingDown, TrendingUp } from 'lucide-react';

import { StatusBadge } from '@/components/common';
import { formatCurrency, formatPercent } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { RecommendedInvestment } from '@/types/market';

export interface RecommendedCardProps {
    item: RecommendedInvestment;
    to?: string;
    currency?: 'NPR' | 'USD';
}

/**
 * Curated investment recommendation card.
 * All values (score, returns, minimum) come from the data contract.
 * Informational only — not financial advice.
 */
export function RecommendedCard({ item, to = '/customer/market/opportunities', currency = 'NPR' }: RecommendedCardProps) {
    const isUp = item.change >= 0;
    const TrendIcon = isUp ? TrendingUp : TrendingDown;

    const content = (
        <div className="p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                        <span className="shrink-0 rounded bg-canvas px-1.5 py-0.5 text-[10px] font-medium text-muted">
                            {item.symbol}
                        </span>
                    </div>
                    <p className="mt-0.5 text-xs capitalize text-muted">{item.type.replace('-', ' ')} · {item.sector}</p>
                </div>
                <StatusBadge status={item.recommendation} />
            </div>

            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted">{item.description}</p>

            <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-md bg-canvas p-2">
                    <p className="text-[10px] text-muted">Price</p>
                    <p className="mt-0.5 text-xs font-semibold text-ink">{formatCurrency(item.price, currency)}</p>
                </div>
                <div className="rounded-md bg-canvas p-2">
                    <p className="text-[10px] text-muted">Min invest</p>
                    <p className="mt-0.5 text-xs font-semibold text-ink">{formatCurrency(item.minimumInvestment, currency)}</p>
                </div>
                <div className="rounded-md bg-canvas p-2">
                    <p className="text-[10px] text-muted">Potential</p>
                    <p className="mt-0.5 text-xs font-semibold text-success">{formatPercent(item.potentialReturn, 1)}</p>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <p
                    className={cn(
                        'inline-flex items-center gap-0.5 text-xs font-semibold',
                        isUp ? 'text-success' : 'text-danger',
                    )}
                >
                    <TrendIcon className="h-3.5 w-3.5" aria-hidden />
                    {isUp ? '+' : '-'}
                    {formatCurrency(Math.abs(item.change), currency)} ({Math.abs(item.percentage).toFixed(2)}%)
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-medium text-primary">
                    <Target className="h-3 w-3" aria-hidden />
                    Score {item.score}
                </span>
            </div>
        </div>
    );

    return (
        <Link to={to} className="block rounded-lg border border-line bg-surface transition-colors hover:border-primary/40">
            {content}
        </Link>
    );
}
