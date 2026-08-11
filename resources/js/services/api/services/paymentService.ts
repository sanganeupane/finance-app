import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Bill, PayBillPayload, Payment, PaymentsData, SendMoneyPayload } from '@/types/payment';

export const paymentService = {
    overview: async () =>
        unwrap(apiClient.get<{ data: PaymentsData }>(API_ENDPOINTS.payments.list)),

    bills: async () => unwrap(apiClient.get<{ data: Bill[] }>(API_ENDPOINTS.payments.bills)),

    sendMoney: async (payload: SendMoneyPayload) =>
        unwrap(
            apiClient.post<{ data: Payment }>(API_ENDPOINTS.payments.send, payload),
        ),

    payBill: async (payload: PayBillPayload) =>
        unwrap(
            apiClient.post<{ data: Payment }>(API_ENDPOINTS.payments.payBill, payload),
        ),
};
