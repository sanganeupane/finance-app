export type DepositType = 'fixed' | 'recurring';

export type DepositStatus = 'active' | 'matured' | 'premature-closed';

export interface Deposit {
    id: string;
    customerId: string;
    type: DepositType;
    status: DepositStatus;
    certificateNumber: string;
    depositAmount: number;
    interestRate: number;
    tenureMonths: number;
    maturityDate: string;
    startDate: string;
}
