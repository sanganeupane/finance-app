/**
 * Masking utilities for sensitive banking identifiers.
 * Never display full account/card numbers or OTPs anywhere in the UI.
 */

/** `1234567890123456` -> `**** **** **** 3456` */
export function maskCardNumber(cardNumber: string): string {
    const digits = cardNumber.replace(/\D/g, '');
    const last4 = digits.slice(-4);
    return `**** **** **** ${last4}`;
}

/** `0012345678901` -> `**** **** 8901` */
export function maskAccountNumber(accountNumber: string): string {
    const digits = accountNumber.replace(/\D/g, '');
    const last4 = digits.slice(-4);
    return `**** **** ${last4}`;
}

/** `+9779801234567` -> `+977 980******67` */
export function maskPhone(phone: string): string {
    const trimmed = phone.trim();
    const countryMatch = trimmed.match(/^(\+\d{1,3})\s*/);
    const countryCode = countryMatch?.[1] ?? '';
    const local = trimmed.slice(countryCode.length).replace(/\s/g, '');
    const head = local.slice(0, 3);
    const tail = local.slice(-2);
    return `${countryCode} ${head}******${tail}`;
}

/** `aarav.sharma@example.com` -> `aar***@example.com` */
export function maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    const head = local.slice(0, 3);
    const masked = `${head}${'*'.repeat(Math.max(local.length - 3, 1))}`;
    return `${masked}@${domain}`;
}

/** `123456` -> `••••••` (OTP / verification codes) */
export function maskSensitiveCode(code: string): string {
    return '•'.repeat(code.length);
}
