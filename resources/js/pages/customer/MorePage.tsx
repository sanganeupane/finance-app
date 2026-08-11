import { Link } from 'react-router-dom';
import {
    ArrowLeftRight,
    BookOpen,
    ChevronRight,
    CircleDollarSign,
    CreditCard,
    FlaskConical,
    HandCoins,
    HeartPulse,
    Landmark,
    LayoutGrid,
    Lightbulb,
    LineChart,
    PiggyBank,
    ReceiptText,
    Settings2,
    ShoppingBag,
    Sparkles,
    Store,
    TrendingUp,
    UserRound,
    Wallet,
    type LucideIcon,
} from 'lucide-react';

import { PageHeader, PageState, StatusBadge } from '@/components/common';
import { Avatar } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { notificationService, userService } from '@/services/api';

interface MenuRow {
    label: string;
    to: string;
    icon: LucideIcon;
    description?: string;
}

function MenuLink({ label, to, icon: Icon, description }: MenuRow) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-primary/40"
        >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-ink">{label}</span>
                {description ? <span className="mt-0.5 block text-xs text-muted">{description}</span> : null}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        </Link>
    );
}

function Section({ title, rows }: { title: string; rows: MenuRow[] }) {
    return (
        <section aria-labelledby={title} className="flex flex-col gap-2">
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">{title}</h2>
            {rows.map((row) => (
                <MenuLink key={`${title}-${row.to}`} {...row} />
            ))}
        </section>
    );
}

export default function MorePage() {
    const user = useAsync(() => userService.current(), []);
    const notifications = useAsync(() => notificationService.list(), []);
    const unreadCount = (notifications.data ?? []).filter((item) => !item.isRead).length;

    return (
        <section className="flex flex-col gap-6">
            <PageHeader title="More" />

            <PageState status={user.status} error={user.error} onRetry={user.refetch}>
                {user.data ? (
                    <Link
                        to="/customer/profile"
                        className="flex items-center gap-3 rounded-xl bg-primary p-5 text-white shadow-md transition-colors hover:bg-primary-dark"
                    >
                        <Avatar name={user.data.name} size="lg" className="bg-white/15 text-white ring-white/25" />
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-base font-semibold">{user.data.name}</span>
                            <span className="mt-0.5 flex items-center gap-2 text-xs text-white/80">
                                {user.data.branch} branch
                                <StatusBadge status={user.data.kycStatus} />
                            </span>
                        </span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-white/70" aria-hidden />
                    </Link>
                ) : null}
            </PageState>

            <div className="flex flex-col gap-6">
                <Section
                    title="Manage money"
                    rows={[
                        { label: 'Accounts', to: '/customer/accounts', icon: Wallet, description: 'View balances and details' },
                        { label: 'Credit & debit cards', to: '/customer/cards', icon: CreditCard, description: 'Cards and statements' },
                        { label: 'Loans', to: '/customer/loans', icon: HandCoins, description: 'Track repayments and EMI' },
                        { label: 'Deposits', to: '/customer/deposits', icon: PiggyBank, description: 'Fixed and recurring deposits' },
                        { label: 'Investments', to: '/customer/investments', icon: TrendingUp, description: 'Your portfolio holdings' },
                    ]}
                />

                <Section
                    title="Markets"
                    rows={[
                        { label: 'Market overview', to: '/customer/market', icon: LineChart, description: 'NEPSE index and movers' },
                        { label: 'Trending', to: '/customer/market/trending', icon: CircleDollarSign },
                        { label: 'Top gainers', to: '/customer/market/gainers', icon: Landmark },
                        { label: 'Top losers', to: '/customer/market/losers', icon: LineChart },
                        { label: 'Opportunities', to: '/customer/market/opportunities', icon: Sparkles, description: 'Curated for your profile' },
                    ]}
                />

                <Section
                    title="Spending"
                    rows={[
                        { label: 'Spending analysis', to: '/customer/spending', icon: ReceiptText, description: 'Where your money goes' },
                        { label: 'E-commerce spending', to: '/customer/spending/e-commerce', icon: ShoppingBag },
                        { label: 'ATM usage', to: '/customer/spending/atm', icon: Store },
                        { label: 'Financial health', to: '/customer/financial-health', icon: HeartPulse, description: 'Your score and factors' },
                    ]}
                />

                <Section
                    title="Payments & insights"
                    rows={[
                        { label: 'Payments', to: '/customer/payments', icon: ArrowLeftRight },
                        { label: 'Send money', to: '/customer/payments/send', icon: CircleDollarSign },
                        { label: 'Pay bills', to: '/customer/payments/bills', icon: ReceiptText },
                        { label: 'AI insights', to: '/customer/ai-insights', icon: Lightbulb, description: 'Personalized recommendations' },
                        { label: 'Notifications', to: '/customer/notifications', icon: LayoutGrid, description: unreadCount ? `${unreadCount} unread` : 'You are all caught up' },
                    ]}
                />

                <Section
                    title="Account & developer"
                    rows={[
                        { label: 'Profile & settings', to: '/customer/profile', icon: UserRound, description: 'Contact details and preferences' },
                        { label: 'Developer · API data', to: '/developer/api-data', icon: FlaskConical, description: 'Endpoint and data contracts' },
                        { label: 'Design system', to: '/design-system', icon: BookOpen },
                    ]}
                />

                <p className="flex items-center gap-1.5 text-xs text-muted">
                    <Settings2 className="h-3.5 w-3.5" aria-hidden />
                    Sagarmatha Bank customer app · v1.0
                </p>
            </div>
        </section>
    );
}
