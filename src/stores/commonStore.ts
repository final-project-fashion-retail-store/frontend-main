import { getBrands, getCategories } from '@/services/commonServices';
import { Brand, Category } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	categories: Category[] | null;
	brands: Brand[] | null;

	isGettingBrands: boolean;

	getCategories: () => void;
	getBrands: (featuredBrand?: boolean | '') => void;
};

const useCommonStore = create<Stores>((set) => ({
	categories: null,
	brands: null,

	isGettingBrands: false,

	async getCategories() {
		try {
			const res = await getCategories();
			set({ categories: res.data.data });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log('Error fetching categories:', err.response?.data.message);
				console.log(err);
			}
		}
	},

	async getBrands(featuredBrand = '') {
		try {
			set({ isGettingBrands: true });
			const res = await getBrands(featuredBrand);
			set({ brands: res.data.data });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log('Error fetching categories:', err.response?.data.message);
				console.log(err);
			}
		} finally {
			set({ isGettingBrands: false });
		}
	},
}));

export default useCommonStore;
