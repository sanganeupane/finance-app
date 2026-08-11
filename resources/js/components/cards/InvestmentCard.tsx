import { Link } from 'react-router-dom';
import { TrendingDown, TrendingUp } from 'lucide-react';

import { Sparkline } from '@/components/charts';
import { formatCurrency, formatNumber } from '@/utils/format';
import { cn } from '@/utils/cn';

export interface InvestmentCardProps {
    investment: {
        id: string;
        name: string;
        symbol: string;
        type: string;
        status: string;
        units: number;
        investedAmount: number;
        currentValue: number;
        change: number;
        percentage: number;
        currency: 'NPR' | 'USD';
        nav?: number;
        risk: 'low' | 'medium' | 'high';
    };
    to?: string;
    sparkline?: number[];
}

/** Portfolio holding card with gain/loss summary. */
export function InvestmentCard({ investment, to, sparkline }: InvestmentCardProps) {
    const isUp = investment.change >= 0;
    const TrendIcon = isUp ? TrendingUp : TrendingDown;

    const content = (
        <div className="flex items-center gap-3 p-4">
            <span
                aria-hidden
                className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                    isUp ? 'bg-primary-soft text-primary' : 'bg-danger/10 text-danger',
                )}
            >
                <TrendIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-ink">{investment.name}</p>
                    <span className="shrink-0 rounded bg-canvas px-1.5 py-0.5 text-[10px] font-medium text-muted">
                        {investment.symbol}
                    </span>
                </div>
                <p className="mt-0.5 text-xs text-muted">
                    {investment.units} units · {formatNumber(investment.nav ?? 0)}
                </p>
                <p className="mt-1.5 flex items-baseline gap-2">
                    <span className="text-base font-semibold text-ink">
                        {formatCurrency(investment.currentValue, investment.currency)}
                    </span>
                    <span
                        className={cn(
                            'inline-flex items-center gap-0.5 text-xs font-medium',
                            isUp ? 'text-success' : 'text-danger',
                        )}
                    >
                        <TrendIcon className="h-3 w-3" aria-hidden />
                        {formatCurrency(investment.change, investment.currency)} ({investment.percentage.toFixed(1)}%)
                    </span>
                </p>
            </div>
            {sparkline ? <Sparkline data={sparkline} width={72} height={32} /> : null}
        </div>
    );

    if (to) {
        return (
            <Link to={to} className="block rounded-lg border border-line bg-surface transition-colors hover:border-primary/40">
                {content}
            </Link>
        );
    }
    return <div className="rounded-lg border border-line bg-surface">{content}</div>;
}
