import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReceiptText } from 'lucide-react';

import { PageHeader, PageState } from '@/components/common';
import { Button, Input, Select } from '@/components/ui';
import { useToast } from '@/components/ui/toast';
import { useAsync } from '@/hooks/useAsync';
import { paymentService } from '@/services/api';

export default function PayBillsPage() {
    const navigate = useNavigate();
    const { show: toast } = useToast();

    const { status, data, error, refetch } = useAsync(() => paymentService.overview(), []);

    const [billerId, setBillerId] = useState('');
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const selectedBiller = data?.billers.find((biller) => biller.id === billerId);
    const numericAmount = Number(amount);
    const valid = billerId !== '' && numericAmount > 0;

    function handleBillerChange(value: string) {
        setBillerId(value);
        const bill = data?.bills.find((item) => item.billerId === value && item.status !== 'paid');
        if (bill) setAmount(String(bill.amountDue));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!valid) {
            setFormError('Select a biller and enter a valid amount.');
            return;
        }
        setSubmitting(true);
        setFormError(null);
        try {
            await paymentService.payBill({ billerId, amount: numericAmount, accountId: 'acc-1001' });
            toast({ title: 'Bill paid', description: `${selectedBiller?.name ?? 'Bill'} payment scheduled.`, variant: 'success' });
            navigate('/customer/payments');
        } catch (submitError) {
            setFormError(submitError instanceof Error ? submitError.message : 'Payment failed. Try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="Pay bills" subtitle="Utilities, telecom and more" />

            <PageState status={status} error={error} onRetry={refetch}>
                {data ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                        <Select
                            label="Biller"
                            placeholder="Choose a biller"
                            options={data.billers.map((biller) => ({
                                value: biller.id,
                                label: `${biller.name} (${biller.category})`,
                            }))}
                            value={billerId}
                            onChange={(event) => handleBillerChange(event.target.value)}
                        />

                        {data.bills.some((bill) => bill.status !== 'paid') ? (
                            <section aria-labelledby="due-bills">
                                <h2 id="due-bills" className="mb-2 text-sm font-semibold text-ink">
                                    Due bills
                                </h2>
                                <ul className="flex flex-col gap-2">
                                    {data.bills
                                        .filter((bill) => bill.status !== 'paid')
                                        .map((bill) => {
                                            const biller = data.billers.find((item) => item.id === bill.billerId);
                                            return (
                                                <li key={bill.id}>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setBillerId(bill.billerId);
                                                            setAmount(String(bill.amountDue));
                                                        }}
                                                        className="flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 text-left text-sm transition-colors hover:border-primary/40"
                                                    >
                                                        <span className="flex items-center gap-3">
                                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                                                                <ReceiptText className="h-4 w-4" aria-hidden />
                                                            </span>
                                                            <span>
                                                                <span className="block font-medium text-ink">
                                                                    {biller?.name ?? bill.title}
                                                                </span>
                                                                <span className="block text-xs text-muted">
                                                                    Due {new Date(bill.dueDate).toLocaleDateString('en-GB')}
                                                                </span>
                                                            </span>
                                                        </span>
                                                        <span className="font-semibold text-ink">
                                                            {new Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: 'NPR',
                                                            }).format(bill.amountDue)}
                                                        </span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </section>
                        ) : null}

                        <Input
                            label="Amount (NPR)"
                            type="number"
                            inputMode="decimal"
                            min={1}
                            placeholder="0.00"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            hint={selectedBiller ? `Paying ${selectedBiller.name}.` : undefined}
                        />

                        {formError ? (
                            <p role="alert" className="text-sm text-danger">
                                {formError}
                            </p>
                        ) : null}

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            disabled={!valid}
                            isLoading={submitting}
                            leftIcon={<ReceiptText className="h-4 w-4" aria-hidden />}
                        >
                            Pay bill
                        </Button>
                    </form>
                ) : null}
            </PageState>
        </section>
    );
}
