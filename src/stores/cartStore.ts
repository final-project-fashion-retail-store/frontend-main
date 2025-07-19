import {
	addToCart,
	getCart,
	getTotalCartProducts,
	removeFromCart,
	updateCartProduct,
} from '@/services/cartServices';
import { CartItem } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	cartItems: CartItem[];
	totalCartProducts: number;

	isGettingCartItems: boolean;
	isAddingProductToCart: boolean;
	isUpdatingCartItem: boolean;
	isRemovingProductFromCart: boolean;

	getTotalCartProducts: () => void;
	getCartItems: () => void;
	addProductToCart: (
		productId: string,
		variantId: string,
		quantity: number
	) => Promise<{ success: boolean; message?: string }>;
	updateCartItem: (
		productId: string,
		variantId: string,
		quantity: number,
		color?: string,
		size?: string
	) => Promise<{ success: boolean; message?: string }>;
	removeProductFromCart: (
		productId: string,
		variantId: string
	) => Promise<{ success: boolean; message?: string }>;
};

const useCartStore = create<Stores>((set, get) => ({
	cartItems: [],
	totalCartProducts: 0,
	isGettingCartItems: false,
	isAddingProductToCart: false,
	isRemovingProductFromCart: false,
	isUpdatingCartItem: false,

	async getTotalCartProducts() {
		try {
			const res = await getTotalCartProducts();
			set({ totalCartProducts: res.data.totalProducts });
		} catch (err) {
			console.log(err);
		}
	},

	async getCartItems() {
		try {
			set({ isGettingCartItems: true });
			const res = await getCart();
			set({ cartItems: res.data.cart.items });
		} catch (err) {
			console.log(err);
		} finally {
			set({ isGettingCartItems: false });
		}
	},

	async addProductToCart(productId, variantId, quantity) {
		try {
			set({ isAddingProductToCart: true });
			const res = await addToCart(productId, variantId, quantity);
			set({ cartItems: res.data.cart.items });
			return { success: true, message: 'Product added to cart successfully' };
		} catch (err) {
			if (err instanceof AxiosError) {
				return {
					success: false,
					message: err.response?.data.message || 'Failed to add product to cart',
				};
			}
			return { success: false, message: 'Failed to add product to cart' };
		} finally {
			set({ isAddingProductToCart: false });
		}
	},

	async updateCartItem(productId, variantId, quantity, color = '', size = '') {
		try {
			set({ isUpdatingCartItem: true });
			const res = await updateCartProduct(
				productId,
				variantId,
				quantity,
				color,
				size
			);
			set({ cartItems: res.data.cart.items });

			return { success: true, message: 'Cart item updated successfully' };
		} catch (err) {
			if (err instanceof AxiosError) {
				return {
					success: false,
					message: err.response?.data.message || 'Failed to update cart item',
				};
			}
			return { success: false, message: 'Failed to update cart item' };
		} finally {
			set({ isUpdatingCartItem: false });
		}
	},

	async removeProductFromCart(productId, variantId) {
		try {
			set({ isRemovingProductFromCart: true });
			await removeFromCart(productId, variantId);
			set({
				cartItems: get().cartItems.filter(
					(item) => item.product._id !== productId && item.variantId !== variantId
				),
			});
			return { success: true, message: 'Product removed from cart successfully' };
		} catch (err) {
			if (err instanceof AxiosError) {
				return {
					success: false,
					message:
						err.response?.data.message || 'Failed to remove product from cart',
				};
			}
			return { success: false, message: 'Failed to remove product from cart' };
		} finally {
			set({ isRemovingProductFromCart: false });
		}
	},
}));

export default useCartStore;
