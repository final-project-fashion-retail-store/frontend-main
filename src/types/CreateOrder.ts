export type CreateOrder = {
	shippingAddress: string;
	billingAddress: string;
	paymentMethod?: string;
	shippingCost?: number;
	taxRate?: number;
};
