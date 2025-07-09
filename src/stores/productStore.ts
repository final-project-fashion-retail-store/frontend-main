import {
	getProductByCategory,
	getProductBySubcategory,
	getProducts,
} from '@/services/productServices';
import { Product, Filter, Pagination } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	products: Product[] | null;
	bestSellingProducts: Product[] | null;
	pagination: Pagination | null;
	filter: Filter | null;

	isGettingProducts: boolean;
	isGettingBestSellingProducts: boolean;
	isGettingProductByCategory: boolean;
	isGettingProductBySubcategory: boolean;

	getProducts: (featuredProduct?: boolean | '') => void;
	getProductByCategory: (
		slug: string,
		link?: string,
		limit?: string,
		queries?: string
	) => void;
	getProductBySubcategory: (
		categorySlug: string,
		subcategorySlug: string,
		link?: string,
		limit?: string,
		queries?: string
	) => void;
};

const useProductStore = create<Stores>((set) => ({
	products: null,
	bestSellingProducts: null,
	pagination: null,
	filter: null,

	isGettingProducts: false,
	isGettingBestSellingProducts: false,
	isGettingProductByCategory: false,
	isGettingProductBySubcategory: false,

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

	async getProductByCategory(slug, link = '', limit = '12', queries = '') {
		try {
			set({ isGettingProductByCategory: true });
			const res = await getProductByCategory(slug, link, limit, queries);

			set({
				products: res.data.products,
				pagination: res.data.pagination,
				filter: res.data.filters,
			});
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingProductByCategory: false });
		}
	},

	async getProductBySubcategory(
		categorySlug,
		subcategorySlug,
		link = '',
		limit = '12',
		queries = ''
	) {
		try {
			set({ isGettingProductBySubcategory: true });
			const res = await getProductBySubcategory(
				categorySlug,
				subcategorySlug,
				link,
				limit,
				queries
			);
			set({
				products: res.data.products,
				pagination: res.data.pagination,
				filter: res.data.filters,
			});
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingProductBySubcategory: false });
		}
	},
}));

export default useProductStore;
