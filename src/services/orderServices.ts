import axios from '@/lib/axios';
import { CreateOrder } from '@/types';

export const createOrderFromCart = async (data: CreateOrder) => {
	try {
		const response = await axios.post('api/v1/orders/create-from-cart', data);
		return response.data;
	} catch (error) {
		console.error('Error creating order:', error);
		throw error;
	}
};
