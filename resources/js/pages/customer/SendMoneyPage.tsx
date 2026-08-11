import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Send } from 'lucide-react';

import { PageHeader, PageState } from '@/components/common';
import { Button, Input, Select } from '@/components/ui';
import { useToast } from '@/components/ui/toast';
import { useAsync } from '@/hooks/useAsync';
import { paymentService } from '@/services/api';

export default function SendMoneyPage() {
    const navigate = useNavigate();
    const { show: toast } = useToast();

    const { status, data, error, refetch } = useAsync(() => paymentService.overview(), []);

    const [payeeId, setPayeeId] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const numericAmount = Number(amount);
    const valid = payeeId !== '' && numericAmount > 0 && (data ? numericAmount <= data.balance : true);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!valid) {
            setFormError('Enter a payee and a valid amount within your balance.');
            return;
        }
        setSubmitting(true);
        setFormError(null);
        try {
            await paymentService.sendMoney({
                payeeId,
                amount: numericAmount,
                note: note || undefined,
            });
            toast({ title: 'Payment sent', description: 'Your transfer is being processed.', variant: 'success' });
            navigate('/customer/payments');
        } catch (submitError) {
            setFormError(submitError instanceof Error ? submitError.message : 'Payment failed. Try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="Send money" subtitle="Same-bank transfer" />

            <PageState status={status} error={error} onRetry={refetch}>
                {data ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                        <article className="rounded-lg border border-line bg-surface p-4">
                            <p className="text-sm text-muted">Available balance</p>
                            <p className="mt-0.5 text-xl font-semibold text-ink">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'NPR',
                                }).format(data.balance)}
                            </p>
                        </article>

                        <Select
                            label="Recipient"
                            placeholder="Select a saved payee"
                            options={data.payees.map((payee) => ({
                                value: payee.id,
                                label: `${payee.name} · ${payee.bank}`,
                            }))}
                            value={payeeId}
                            onChange={(event) => setPayeeId(event.target.value)}
                        />

                        <Input
                            label="Amount (NPR)"
                            type="number"
                            inputMode="decimal"
                            min={1}
                            placeholder="0.00"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            hint="Enter the amount to send."
                        />

                        <Input
                            label="Note (optional)"
                            placeholder="e.g. Dinner split"
                            value={note}
                            onChange={(event) => setNote(event.target.value)}
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
                            leftIcon={<Send className="h-4 w-4" aria-hidden />}
                        >
                            Send money
                        </Button>

                        <p className="flex items-center gap-1.5 text-xs text-muted">
                            <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden />
                            Protected by two-factor verification.
                        </p>
                    </form>
                ) : null}
            </PageState>
        </section>
    );
}
