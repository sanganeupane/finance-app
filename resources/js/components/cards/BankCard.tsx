import type { ReactNode } from 'react';
import { Contact, Wifi } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface BankCardProps {
    holderName: string;
    maskedNumber: string;
    expiryMonth: number;
    expiryYear: number;
    brand: 'visa' | 'mastercard';
    type: 'debit' | 'credit';
    currency: 'NPR' | 'USD';
    /** Optional footer row, e.g. credit limit. */
    footer?: string;
    chip?: ReactNode;
    className?: string;
}

/**
 * Visual debit/credit card. Gradient surface differs slightly by brand
 * but always stays within the premium green/ink palette.
 */
export function BankCard({
    holderName,
    maskedNumber,
    expiryMonth,
    expiryYear,
    brand,
    type,
    currency,
    footer,
    chip,
    className,
}: BankCardProps) {
    const expiry = `${String(expiryMonth).padStart(2, '0')}/${String(expiryYear).slice(-2)}`;

    return (
        <article
            className={cn(
                'relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-dark p-5 text-white shadow-md',
                brand === 'mastercard' && 'from-ink to-[#374151]',
                className,
            )}
        >
            <div aria-hidden className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-white/10" />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-white/5" />

            <header className="relative flex items-start justify-between">
                <span aria-hidden className="text-white/70">
                    {chip ?? <Wifi className="h-5 w-5 rotate-90" />}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                    {brand} · {type}
                </span>
            </header>

            <p className="relative mt-5 text-lg font-medium tracking-[0.12em]">{maskedNumber}</p>

            <footer className="relative mt-4 flex items-end justify-between">
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/60">Card holder</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium">
                        <Contact className="h-3.5 w-3.5 text-white/70" aria-hidden />
                        {holderName}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-white/60">Expires</p>
                    <p className="mt-0.5 text-sm font-medium">{expiry}</p>
                </div>
            </footer>

            {footer ? (
                <p className="relative mt-3 border-t border-white/15 pt-2 text-xs text-white/75">{footer}</p>
            ) : null}

            <span className="sr-only">{`${currency} ${type} card ending ${maskedNumber.slice(-4)}`}</span>
        </article>
    );
}
