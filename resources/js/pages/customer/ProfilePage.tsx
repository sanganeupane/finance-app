import { BadgeCheck, Building2, Mail, MapPin, Phone, ShieldCheck, UserRound } from 'lucide-react';

import { PageHeader, PageState, StatusBadge } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { userService } from '@/services/api';
import { formatDate } from '@/utils/format';

export default function ProfilePage() {
    const { status, data, error, refetch } = useAsync(() => userService.current(), []);

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="Profile" />

            <PageState
                status={status}
                error={error}
                onRetry={refetch}
                loading={
                    <div className="flex flex-col items-center gap-2 py-6">
                        <Skeleton variant="circle" className="h-20 w-20" />
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-56" />
                    </div>
                }
            >
                {data ? (
                    <>
                        <article className="flex flex-col items-center gap-2 rounded-lg border border-line bg-surface p-6 text-center">
                            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft text-primary">
                                <UserRound className="h-10 w-10" aria-hidden />
                            </span>
                            <h2 className="text-lg font-semibold text-ink">{data.name}</h2>
                            <p className="flex items-center gap-1.5 text-sm text-muted">
                                <BadgeCheck className="h-4 w-4 text-success" aria-hidden />
                                KYC {data.kycStatus} · Member since {formatDate(data.memberSince)}
                            </p>
                            <StatusBadge status={data.kycStatus === 'verified' ? 'verified' : 'pending'} />
                        </article>

                        <article className="rounded-lg border border-line bg-surface p-4">
                            <h2 className="mb-3 text-sm font-semibold text-ink">Contact details</h2>
                            <ul className="flex flex-col gap-3 text-sm">
                                <li className="flex items-center gap-3">
                                    <Mail className="h-4.5 w-4.5 text-muted" aria-hidden />
                                    <span className="text-muted">Email</span>
                                    <span className="ml-auto font-medium text-ink">{data.email}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="h-4.5 w-4.5 text-muted" aria-hidden />
                                    <span className="text-muted">Phone</span>
                                    <span className="ml-auto font-medium text-ink">{data.phone}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <MapPin className="h-4.5 w-4.5 text-muted" aria-hidden />
                                    <span className="text-muted">Address</span>
                                    <span className="ml-auto font-medium text-ink">{data.address}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Building2 className="h-4.5 w-4.5 text-muted" aria-hidden />
                                    <span className="text-muted">Branch</span>
                                    <span className="ml-auto font-medium text-ink">{data.branch}</span>
                                </li>
                            </ul>
                        </article>

                        <article className="rounded-lg border border-line bg-surface p-4">
                            <h2 className="mb-3 text-sm font-semibold text-ink">Preferences</h2>
                            <ul className="flex flex-col gap-2 text-sm">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted">Currency</span>
                                    <span className="font-medium text-ink">{data.preferences.currency}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted">Language</span>
                                    <span className="font-medium text-ink">{data.preferences.language}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted">SMS alerts</span>
                                    <span className="font-medium text-ink">{data.preferences.smsAlerts ? 'On' : 'Off'}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted">Marketing emails</span>
                                    <span className="font-medium text-ink">{data.preferences.marketingEmails ? 'On' : 'Off'}</span>
                                </li>
                            </ul>
                        </article>

                        <p className="flex items-center gap-1.5 rounded-lg bg-primary-soft px-3 py-2 text-xs text-primary">
                            <ShieldCheck className="h-4 w-4" aria-hidden />
                            Your information is encrypted and never shared.
                        </p>
                    </>
                ) : null}
            </PageState>
        </section>
    );
}
