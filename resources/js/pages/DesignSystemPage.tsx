import { useState } from 'react';
import { Bell, Eye, Search, Sparkles } from 'lucide-react';

import {
    Alert,
    Avatar,
    Badge,
    Button,
    Card,
    EmptyState,
    ErrorState,
    IconButton,
    Input,
    Modal,
    Select,
    Skeleton,
    TabPanel,
    Tabs,
    useToast,
} from '@/components/ui';

const COLOR_TOKENS = [
    { name: 'primary', value: '#0B8F68', className: 'bg-primary' },
    { name: 'primary-dark', value: '#087A5A', className: 'bg-primary-dark' },
    { name: 'primary-soft', value: '#E8F7F1', className: 'bg-primary-soft' },
    { name: 'primary-softer', value: '#F4FBF8', className: 'bg-primary-softer' },
    { name: 'canvas', value: '#F7FAF9', className: 'bg-canvas' },
    { name: 'surface', value: '#FFFFFF', className: 'bg-surface' },
    { name: 'ink', value: '#17211D', className: 'bg-ink' },
    { name: 'muted', value: '#78847F', className: 'bg-muted' },
    { name: 'line', value: '#E6EEEA', className: 'bg-line' },
    { name: 'success', value: '#20A779', className: 'bg-success' },
    { name: 'warning', value: '#F2B84B', className: 'bg-warning' },
    { name: 'danger', value: '#E66B7A', className: 'bg-danger' },
    { name: 'info', value: '#6D9EFF', className: 'bg-info' },
    { name: 'violet', value: '#9B7FEA', className: 'bg-violet' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            {children}
        </section>
    );
}

export default function DesignSystemPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [tab, setTab] = useState('overview');
    const [name, setName] = useState('');
    const [acct, setAcct] = useState('');
    const { show } = useToast();

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 py-8">
            <header className="flex flex-col gap-1">
                <Badge variant="violet" className="w-fit">
                    Development only
                </Badge>
                <h1 className="text-3xl font-semibold tracking-tight text-ink">Design System</h1>
                <p className="text-sm text-muted">
                    Verification page for tokens and components. Not routed in production flows.
                </p>
            </header>

            <Section title="Colors">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {COLOR_TOKENS.map((color) => (
                        <div key={color.name} className="overflow-hidden rounded-lg border border-line bg-surface">
                            <div className={`h-14 ${color.className}`} />
                            <div className="p-3">
                                <p className="text-sm font-medium text-ink">{color.name}</p>
                                <p className="text-xs text-muted">{color.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Typography">
                <Card className="flex flex-col gap-3">
                    <p className="text-3xl font-semibold tracking-tight text-ink">Heading — Financial 360</p>
                    <p className="text-2xl font-semibold tracking-tight text-ink">Section title</p>
                    <p className="text-xl font-medium text-ink">Subtitle · Account overview</p>
                    <p className="text-base font-medium text-ink">Body medium — INR 2,450,500.00</p>
                    <p className="text-sm text-muted">Body small / secondary — Last updated 5 minutes ago</p>
                    <p className="text-xs text-muted">Caption — Muted helper text for hints and meta</p>
                </Card>
            </Section>

            <Section title="Buttons">
                <Card className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="primary" isLoading>
                        Loading
                    </Button>
                    <Button variant="primary" disabled>
                        Disabled
                    </Button>
                    <IconButton label="Notifications" icon={<Bell className="h-5 w-5" />} badge={<span>3</span>} />
                    <IconButton label="Search" variant="soft" icon={<Search className="h-5 w-5" />} />
                </Card>
            </Section>

            <Section title="Inputs & Select">
                <Card className="flex flex-col gap-4">
                    <Input
                        label="Full name"
                        placeholder="Aarav Sharma"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input label="Account number" placeholder="Masked on blur" prefix={<Eye className="h-4 w-4" />} value={acct} onChange={(event) => setAcct(event.target.value)} hint="Never show the full account number in the UI." />
                    <Input label="Recipient" placeholder="Required field" error="Please enter a recipient name." />
                    <Select
                        label="Account type"
                        placeholder="Select a type"
                        options={[
                            { value: 'savings', label: 'Savings' },
                            { value: 'current', label: 'Current' },
                            { value: 'fixed-deposit', label: 'Fixed deposit' },
                        ]}
                    />
                </Card>
            </Section>

            <Section title="Badges">
                <Card className="flex flex-wrap items-center gap-3">
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success" dot>
                        Verified
                    </Badge>
                    <Badge variant="warning" dot>
                        Pending
                    </Badge>
                    <Badge variant="danger" dot>
                        Overdue
                    </Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="violet">AI</Badge>
                </Card>
            </Section>

            <Section title="Avatars">
                <Card className="flex flex-wrap items-center gap-4">
                    <Avatar name="Aarav Sharma" size="xs" />
                    <Avatar name="Anisha Gurung" size="sm" />
                    <Avatar name="Bibek Karki" size="md" />
                    <Avatar name="Priya Thapa" size="lg" />
                    <Avatar name="Sujana Maharjan" size="xl" />
                </Card>
            </Section>

            <Section title="Tabs">
                <Tabs
                    id="design-tabs"
                    value={tab}
                    onValueChange={setTab}
                    items={[
                        { value: 'overview', label: 'Overview' },
                        { value: 'activity', label: 'Activity' },
                        { value: 'settings', label: 'Settings' },
                    ]}
                />
                <TabPanel id="design-tabs" value={tab}>
                    <Card>
                        <p className="text-sm text-muted">
                            {tab === 'overview' && 'Overview content — account balances and health.'}
                            {tab === 'activity' && 'Activity content — recent transactions.'}
                            {tab === 'settings' && 'Settings content — preferences and limits.'}
                        </p>
                    </Card>
                </TabPanel>
            </Section>

            <Section title="Alerts">
                <div className="flex flex-col gap-3">
                    <Alert variant="info" title="Scheduled maintenance" description="The app will be unavailable on Sunday, 02:00–03:00 NPT." />
                    <Alert variant="success" title="Payment completed" description="NPR 4,500.00 transferred to 9831*******45." />
                    <Alert variant="warning" title="Low balance" description="Your savings account balance is below NPR 10,000." />
                    <Alert variant="danger" title="Login attempt blocked" description="We blocked a suspicious sign-in. Contact support if this was you." onDismiss={() => undefined} />
                </div>
            </Section>

            <Section title="Modal">
                <Card className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={() => setModalOpen(true)}>
                        Open modal
                    </Button>
                </Card>
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Confirm transfer"
                    description="This action cannot be undone."
                    footer={
                        <>
                            <Button variant="ghost" onClick={() => setModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
                        </>
                    }
                >
                    <p className="text-sm text-muted">
                        Confirm the transfer of NPR 25,000.00 to account **** **** 4582.
                    </p>
                </Modal>
            </Section>

            <Section title="Toast">
                <Card className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={() => show({ title: 'Payment sent', description: 'NPR 4,500.00 to Aarav Sharma.', variant: 'success' })}>
                        Success toast
                    </Button>
                    <Button variant="outline" onClick={() => show({ title: 'Session expired', description: 'Please sign in again.', variant: 'warning' })}>
                        Warning toast
                    </Button>
                    <Button variant="outline" onClick={() => show({ title: 'Request failed', description: 'Please try again later.', variant: 'error' })}>
                        Error toast
                    </Button>
                </Card>
            </Section>

            <Section title="Skeleton">
                <Card className="flex flex-col gap-3">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex items-center gap-3">
                        <Skeleton variant="circle" className="h-10 w-10" />
                        <div className="flex flex-1 flex-col gap-2">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                    </div>
                </Card>
            </Section>

            <Section title="Empty & Error states">
                <EmptyState
                    icon={<Sparkles className="h-10 w-10" aria-hidden />}
                    title="No insights yet"
                    description="We need a bit more activity to generate personalised insights."
                />
                <ErrorState onRetry={() => undefined} />
            </Section>
        </div>
    );
}
