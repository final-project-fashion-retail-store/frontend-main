import { getProducts } from '@/services/productServices';
import { Product } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	products: Product[] | null;
	bestSellingProducts: Product[] | null;

	isGettingProducts: boolean;
	isGettingBestSellingProducts: boolean;

	getProducts: (featuredProduct?: boolean | '') => void;
};

const useProductStore = create<Stores>((set) => ({
	products: null,
	bestSellingProducts: null,

	isGettingProducts: false,
	isGettingBestSellingProducts: false,

	async getProducts(featuredProduct = '') {
		try {
			set({ isGettingProducts: true });
			const res = await getProducts(featuredProduct);
			set({ products: res.data.data });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingProducts: false });
		}
	},
}));

export default useProductStore;
