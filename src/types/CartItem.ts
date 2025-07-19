import { Product } from '@/types/Product';

export type CartItem = {
	product: Product;
	variantId: string;
	quantity: number;
	available: boolean;
	maxQuantity: number;
};
