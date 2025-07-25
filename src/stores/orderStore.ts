import { createOrderFromCart, getOrders } from '@/services/orderServices';
import { CreateOrder, Order, Pagination } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	orders: Order[];
	pagination: Pagination | null;

	isCreatingOrder: boolean;
	isGettingOrders: boolean;

	createOrder: (
		data: CreateOrder
	) => Promise<{ success: boolean; message?: string; clientSecret?: string }>;
	getAllOrders: () => void;
};

const useOrderStore = create<Stores>((set) => ({
	orders: [],
	pagination: null,
	isGettingOrders: false,
	isCreatingOrder: false,

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
}));

export default useOrderStore;
