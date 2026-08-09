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
