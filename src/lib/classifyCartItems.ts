import { CartItem } from '@/types';

const classifyCartItems = (cartItems: CartItem[]) => {
	const available: CartItem[] = [];
	const unavailable: CartItem[] = [];

	cartItems.forEach((item) => {
		// Find the specific variant based on variantId
		const variant = item.product.variants.find((v) => v._id === item.variantId);

		if (variant) {
			// Check if inventory is sufficient for the requested quantity
			const availableInventory = variant.inventory - variant.reservedInventory;
			const isAvailable = availableInventory >= item.quantity;

			if (isAvailable) {
				available.push({
					...item,
					available: true,
					maxQuantity: availableInventory,
				});
			} else {
				unavailable.push({
					...item,
					available: false,
					maxQuantity: availableInventory,
				});
			}
		} else {
			unavailable.push({
				...item,
				available: false,
				maxQuantity: 0,
			});
		}
	});

	return {
		availableItems: available,
		unavailableItems: unavailable,
	};
};

export default classifyCartItems;
