import axios from '@/lib/axios';
import { isAxiosError } from 'axios';

export const getCart = async () => {
	try {
		const response = await axios.get('api/v1/cart');
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			throw new Error(`Failed to fetch cart: ${error.message}`);
		}
		throw error;
	}
};

export const addToCart = async (
	productId: string,
	variantId: string,
	quantity: number
) => {
	try {
		const response = await axios.post('api/v1/cart', {
			productId,
			variantId,
			quantity,
		});
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const updateCartProduct = async (
	productId: string,
	variantId: string,
	quantity: number,
	color?: string,
	size?: string
) => {
	try {
		const response = await axios.patch(`api/v1/cart`, {
			productId,
			variantId,
			quantity,
			color,
			size,
		});
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const removeFromCart = async (productId: string, variantId: string) => {
	try {
		const response = await axios.delete(`api/v1/cart`, {
			data: { productId, variantId },
		});
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getTotalCartProducts = async () => {
	try {
		const response = await axios.get('api/v1/cart/total');
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};
