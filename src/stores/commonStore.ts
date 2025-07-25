import {
	destroyImages,
	getBrands,
	getCategories,
	uploadImages,
} from '@/services/commonServices';
import {
	getDistrict,
	getProvinceCity,
	getWardCommune,
} from '@/services/provinceServices';
import { Brand, Category } from '@/types';
import { District } from '@/types/District';
import { Province } from '@/types/Province';
import { Ward } from '@/types/Ward';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	provinces: Province[] | null;
	districts: District[] | null;
	wards: Ward[] | null;
	categories: Category[] | null;
	brands: Brand[] | null;
	uploadedImages: { public_id: string; secure_url: string }[] | null;
	form: 'login' | 'signup' | 'forgotPassword';
	force: boolean;

	isGettingBrands: boolean;
	isUploadingImages: boolean;
	isDestroyingImages: boolean;

	getCategories: () => void;
	getBrands: (featuredBrand?: boolean | '') => void;
	uploadImages: (data: FormData) => void;
	destroyImages: (data: { publicId: string[] }) => void;
	getProvinces: () => void;
	getDistricts: (provinceId: string) => void;
	getWards: (districtId: string) => void;
	setForm: (form: 'login' | 'signup' | 'forgotPassword') => void;
	setForce: (force: boolean) => void;
	reset: () => void;
};

const useCommonStore = create<Stores>((set) => ({
	provinces: null,
	districts: null,
	wards: null,
	categories: null,
	brands: null,
	uploadedImages: null,
	form: 'login',
	force: true,

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

	async getProvinces() {
		try {
			const res = await getProvinceCity();
			set({ provinces: res.data });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log('Error fetching provinces:', err.response?.data.message);
				console.log(err);
			}
		}
	},

	async getDistricts(provinceId) {
		try {
			const res = await getDistrict(provinceId);
			set({ districts: res.data });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log('Error fetching districts:', err.response?.data.message);
				console.log(err);
			}
		}
	},

	async getWards(districtId) {
		try {
			const res = await getWardCommune(districtId);
			set({ wards: res.data });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log('Error fetching wards:', err.response?.data.message);
				console.log(err);
			}
		}
	},

	setForm(form) {
		set({ form });
	},

	setForce(force) {
		set({ force });
	},

	reset() {
		set({
			provinces: null,
			districts: null,
			wards: null,
			uploadedImages: null,
		});
	},
}));

export default useCommonStore;
