
export enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
    PENDING = "PENDING",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    FAILED = "FAILED"
}

export enum PaymentMethod {
    PAYPAL = "PAYPAL",
    BANK_TRANSFER = "BANK_TRANSFER",
}