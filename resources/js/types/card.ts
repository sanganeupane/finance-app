export type CardBrand = 'visa' | 'mastercard';

export type CardType = 'debit' | 'credit';

export type CardStatus = 'active' | 'blocked' | 'expired';

export interface Card {
    id: string;
    accountId: string;
    brand: CardBrand;
    type: CardType;
    status: CardStatus;
    cardNumber: string; // full PAN — only ever render via maskCardNumber()
    maskedNumber: string;
    holderName: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string; // never expose; used by flows that require verification
    creditLimit?: number;
    outstandingBalance?: number;
    availableCredit?: number;
}
