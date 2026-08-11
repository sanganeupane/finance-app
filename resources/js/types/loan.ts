export type LoanType = 'home' | 'personal' | 'auto' | 'education' | 'business';

export type LoanStatus = 'active' | 'closed' | 'overdue' | 'pending';

export interface Loan {
    id: string;
    customerId: string;
    type: LoanType;
    status: LoanStatus;
    loanNumber: string;
    principal: number;
    outstanding: number;
    interestRate: number;
    tenureMonths: number;
    emiAmount: number;
    nextDueDate?: string | null;
    sanctionedAt: string;
}

export interface LoanPayment {
    id: string;
    date: string;
    amount: number;
    principal: number;
    interest: number;
    status: 'paid' | 'due' | 'overdue';
}

export interface LoanDetail extends Loan {
    disbursedAt: string;
    paidPrincipal: number;
    paidInstallments: number;
    totalInstallments: number;
    remainingInstallments: number;
    emiDay: number;
    branch: string;
    collateral: string;
    purpose: string;
    payments: LoanPayment[];
}
