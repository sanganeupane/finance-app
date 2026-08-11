import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Loan, LoanDetail } from '@/types/loan';

export const loansService = {
    list: async () => unwrap(apiClient.get<{ data: Loan[] }>(API_ENDPOINTS.loans.list)),

    detail: async (loanId: string) =>
        unwrap(apiClient.get<{ data: LoanDetail }>(API_ENDPOINTS.loans.detail(loanId))),
};
