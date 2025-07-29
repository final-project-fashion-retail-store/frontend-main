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

export const getOrders = async () => {
	try {
		const response = await axios.get('api/v1/orders');
		return response.data;
	} catch (error) {
		console.error('Error fetching orders:', error);
		throw error;
	}
};

export const cancelOrder = async (orderId: string) => {
	try {
		const response = await axios.patch(`api/v1/orders/${orderId}/cancel`);
		return response.data;
	} catch (error) {
		console.error('Error cancelling order:', error);
		throw error;
	}
};
