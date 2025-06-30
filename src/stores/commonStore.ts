import {
	destroyImages,
	getBrands,
	getCategories,
	uploadImages,
} from '@/services/commonServices';
import { Brand, Category } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	categories: Category[] | null;
	brands: Brand[] | null;
	uploadedImages: { public_id: string; secure_url: string }[] | null;

	isGettingBrands: boolean;
	isUploadingImages: boolean;
	isDestroyingImages: boolean;

	getCategories: () => void;
	getBrands: (featuredBrand?: boolean | '') => void;
	uploadImages: (data: FormData) => void;
	destroyImages: (data: { publicId: string[] }) => void;
};

const useCommonStore = create<Stores>((set) => ({
	categories: null,
	brands: null,
	uploadedImages: null,

	isGettingBrands: false,
	isUploadingImages: false,
	isDestroyingImages: false,

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

	async uploadImages(data) {
		try {
			set({ isUploadingImages: true });
			const res = await uploadImages(data);
			if (res.data.images) {
				set({ uploadedImages: res.data.images });
				return;
			}
			set({ uploadedImages: [res.data.image] });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				console.log(err?.response?.data?.message);
			}
		} finally {
			set({ isUploadingImages: false });
		}
	},

	async destroyImages(data) {
		try {
			set({ isDestroyingImages: true });
			const res = await destroyImages(data);
			return res;
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				console.log(err?.response?.data?.message);
			}
		} finally {
			set({ isDestroyingImages: false });
		}
	},
}));

export default useCommonStore;
