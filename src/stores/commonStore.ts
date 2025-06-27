import { getCategories } from '@/services/commonServices';
import { Category } from '@/types';
import { create } from 'zustand';

type Stores = {
	categories: Category[] | null;

	getCategories: () => void;
};

const useCommonStore = create<Stores>((set) => ({
	categories: null,

	async getCategories() {
		try {
			const res = await getCategories();
			set({ categories: res.data.data });
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	},
}));

export default useCommonStore;
