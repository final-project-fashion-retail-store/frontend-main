import { Address } from '@/types/Address';
import { ProductVariant } from '@/types/ProductVariant';

export type Order = {
	_id: string;
	user: string;
	items: {
		product: {
			_id: string;
			name: string;
			colorImages: {
				url: string;
			}[];
			variants: ProductVariant[];
		};
		variantId: string;
		quantity: number;
		price: number;
		importPrice: number;
		name: string;
		image: string;
		reviewed: boolean;
	}[];
	shippingAddress: Address;
	subtotal: number;
	shippingCost: number;
	taxAmount: number;
	totalAmount: number;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	createdAt: string;
	updatedAt: string;
	reviewExpired: boolean;
	orderNumber: string;
};
