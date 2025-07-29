import {
	cancelOrder,
	createOrderFromCart,
	getOrders,
} from '@/services/orderServices';
import { CreateOrder, Order, Pagination } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	orders: Order[];
	pagination: Pagination | null;

	isCreatingOrder: boolean;
	isGettingOrders: boolean;
	isCancelingOrder: boolean;

	createOrder: (
		data: CreateOrder
	) => Promise<{ success: boolean; message?: string; clientSecret?: string }>;
	getAllOrders: () => void;
	cancelOrder: (
		orderId: string
	) => Promise<{ success: boolean; message?: string }>;
};

const useOrderStore = create<Stores>((set) => ({
	orders: [],
	pagination: null,
	isGettingOrders: false,
	isCreatingOrder: false,
	isCancelingOrder: false,

	async getAllOrders() {
		try {
			set({ isGettingOrders: true });
			const res = await getOrders();
			set({ orders: res.data.orders, pagination: res.data.pagination });
		} catch (err) {
			console.log(err);
		} finally {
			set({ isGettingOrders: false });
		}
	},

	async createOrder(data) {
		try {
			const res = await createOrderFromCart(data);

			return {
				success: true,
				message: 'Order created successfully',
				clientSecret: res.data.clientSecret,
			};
		} catch (err) {
			console.log(err);
			if (err instanceof AxiosError) {
				return {
					success: false,
					message: err.response?.data.message || 'Failed to create order',
				};
			}

			return { success: false, message: 'Failed to create order' };
		} finally {
			set({ isCreatingOrder: false });
		}
	},

	async cancelOrder(orderId) {
		try {
			set({ isCancelingOrder: true });
			const res = await cancelOrder(orderId);
			set((state) => ({
				orders: state.orders.map((order) =>
					order._id === orderId ? { ...order, ...res.data.order } : order
				),
			}));
			return { success: true, message: 'Order cancelled successfully' };
		} catch (err) {
			console.log(err);
			if (err instanceof AxiosError) {
				return {
					success: false,
					message: err.response?.data.message || 'Failed to cancel order',
				};
			}
			return { success: false, message: 'Failed to cancel order' };
		} finally {
			set({ isCancelingOrder: false });
		}
	},
}));

export default useOrderStore;
