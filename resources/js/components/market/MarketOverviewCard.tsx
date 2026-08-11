import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { StatusBadge } from '@/components/common';
import { formatNumber } from '@/utils/format';
import { cn } from '@/utils/cn';

export interface MarketOverviewCardProps {
    overview: {
        status: string;
        index: string;
        currentValue: number;
        change: number;
        percentage: number;
        volume?: number;
        sentiment: 'bullish' | 'bearish' | 'neutral';
        updatedAt?: string;
        disclaimer?: string;
    };
    to?: string;
}

/** Market index hero card (NEPSE). */
export function MarketOverviewCard({ overview }: MarketOverviewCardProps) {
    const isUp = overview.change >= 0;
    const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;

    return (
        <article className="overflow-hidden rounded-xl bg-ink p-5 text-white shadow-md">
            <header className="flex items-center justify-between">
                <p className="text-sm text-white/70">{overview.index} index</p>
                <StatusBadge status={overview.status} label={overview.status === 'open' ? 'Open' : 'Closed'} />
            </header>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{formatNumber(overview.currentValue)}</p>
            <p
                className={cn(
                    'mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                    isUp ? 'bg-white/15 text-white' : 'bg-white/10 text-white/80',
                )}
            >
                <TrendIcon className="h-3.5 w-3.5" aria-hidden />
                {isUp ? '+' : '-'}
                {Math.abs(overview.change).toLocaleString('en-US')} ({Math.abs(overview.percentage).toFixed(2)}%)
            </p>
            <footer className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-xs text-white/70">
                <span>Sentiment: {overview.sentiment}</span>
                {overview.volume !== undefined ? <span>{formatNumber(overview.volume)} volume</span> : null}
            </footer>
            {overview.disclaimer ? <p className="mt-3 text-[10px] leading-relaxed text-white/50">{overview.disclaimer}</p> : null}
        </article>
    );
}
