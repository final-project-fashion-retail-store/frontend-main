import { createOrderFromCart } from '@/services/orderServices';
import { CreateOrder } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	isCreatingOrder: boolean;

	createOrder: (
		data: CreateOrder
	) => Promise<{ success: boolean; message?: string; clientSecret?: string }>;
};

const useOrderStore = create<Stores>((set) => ({
	isCreatingOrder: false,

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
