import { CartItem } from '@/types';

const calculateOrderTotals = (cartItems: CartItem[]) => {
	if (!cartItems || cartItems.length === 0) {
		return {
			subtotal: 0,
			savings: 0,
			shipping: 0,
			tax: 0,
			total: 0,
		};
	}

	// Calculate subtotal based on sale prices (or regular prices if no sale)
	const calculatedSubtotal = cartItems.reduce((sum, item) => {
		const itemPrice = item.product.salePrice || item.product.price;
		return sum + itemPrice * item.quantity;
	}, 0);

	// Calculate savings (difference between regular price and sale price)
	const calculatedSavings = cartItems.reduce((sum, item) => {
		if (item.product.salePrice && item.product.salePrice < item.product.price) {
			const savingsPerItem = item.product.price - item.product.salePrice;
			return sum + savingsPerItem * item.quantity;
		}
		return sum;
	}, 0);

	// Shipping is free by default
	const calculatedShipping = 0;

	// Tax is 10% of subtotal
	const calculatedTax = calculatedSubtotal * 0.1;

	// Total = subtotal + shipping + tax
	const calculatedTotal =
		calculatedSubtotal + calculatedShipping + calculatedTax;

	return {
		subtotal: calculatedSubtotal,
		savings: calculatedSavings,
		shipping: calculatedShipping,
		tax: calculatedTax,
		total: calculatedTotal,
	};
};

export default calculateOrderTotals;
