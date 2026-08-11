export type PaymentStatus = 'completed' | 'pending' | 'failed';

export interface Biller {
    id: string;
    name: string;
    category: string;
    logo: string; // lucide icon key
    billerCode: string;
}

export interface Payee {
    id: string;
    name: string;
    accountNumber: string; // masked for display
    bank: string;
}

export interface Payment {
    id: string;
    type: 'transfer' | 'bill' | 'mobile' | 'utility';
    title: string;
    subtitle: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    reference: string;
    createdAt: string;
}

export interface Bill {
    id: string;
    billerId: string;
    title: string;
    amountDue: number;
    dueDate: string;
    status: 'paid' | 'due' | 'overdue';
}

export interface SendMoneyPayload {
    payeeId?: string;
    recipientName?: string;
    recipientAccount?: string;
    amount: number;
    note?: string;
}

export interface PayBillPayload {
    billerId: string;
    amount: number;
    accountId: string;
}

export interface PaymentsData {
    recent: Payment[];
    billers: Biller[];
    payees: Payee[];
    bills: Bill[];
    balance: number;
}
