import {
	addProductToWishlist,
	getBestSellingProducts,
	getProduct,
	getProductByBrand,
	getProductByCategory,
	getProductBySubcategory,
	getProducts,
	getProductsWishlist,
	getRelatedProducts,
	getSearchResultPopup,
	getSearchResultProducts,
	getTotalProductsWishlist,
	removeProductFromWishlist,
} from '@/services/productServices';
import {
	Product,
	Filter,
	Pagination,
	SearchResultPopup,
	RelatedProduct,
	BestSellingProduct,
} from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	products: Product[] | null;
	wishlistProducts: Product[] | null;
	totalWishlist: number;
	selectedProduct: Product | null;
	relatedProducts: RelatedProduct[] | null;
	bestSellingProducts: BestSellingProduct[] | null;
	pagination: Pagination | null;
	filter: Filter | null;
	searchResultPopup: SearchResultPopup | null;

	isGettingProducts: boolean;
	isGettingBestSellingProducts: boolean;
	isGettingSearchResultPopup: boolean;
	isAddingProductToWishlist: boolean;
	isRemovingProductFromWishlist: boolean;

	getProducts: (featuredProduct?: boolean | '') => void;
	getBestSellingProducts: () => void;
	getProductByCategory: (
		slug?: string,
		link?: string,
		limit?: string,
		queries?: string
	) => void;
	getProductBySubcategory: (
		categorySlug?: string,
		subcategorySlug?: string,
		link?: string,
		limit?: string,
		queries?: string
	) => void;
	getSearchResultPopup: (searchResult: string) => void;
	getProductBySearch: (queries: string, link?: string, limit?: string) => void;
	getProductByBrand: (
		slug: string,
		queries?: string,
		link?: string,
		limit?: string
	) => void;
	getProductBySlug: (slug: string) => void;
	getRelatedProducts: (slug: string) => void;
	getProductsWishlist: (link?: string, params?: string, limit?: string) => void;
	addProductToWishlist: (
		productId: string
	) => Promise<{ success: boolean; message?: string }>;
	removeProductFromWishlist: (
		productId: string
	) => Promise<{ success: boolean; message?: string }>;
	getTotalProductsWishlist: () => void;
	reset(): void;
};

const useProductStore = create<Stores>((set, get) => ({
	products: null,
	wishlistProducts: null,
	totalWishlist: 0,
	bestSellingProducts: null,
	pagination: null,
	filter: null,
	searchResultPopup: null,
	selectedProduct: null,
	relatedProducts: null,

	isGettingProducts: false,
	isGettingBestSellingProducts: false,
	isGettingProductByCategory: false,
	isGettingProductBySubcategory: false,
	isGettingSearchResultPopup: false,
	isAddingProductToWishlist: false,
	isRemovingProductFromWishlist: false,

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

	async getBestSellingProducts() {
		try {
			set({ isGettingBestSellingProducts: true });
			const res = await getBestSellingProducts();
			set({ bestSellingProducts: res.data.products });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingBestSellingProducts: false });
		}
	},

	async getProductByCategory(slug = '', link = '', limit = '12', queries = '') {
		try {
			set({ isGettingProducts: true });
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
			set({ isGettingProducts: false });
		}
	},

	async getProductBySubcategory(
		categorySlug = '',
		subcategorySlug = '',
		link = '',
		limit = '12',
		queries = ''
	) {
		try {
			set({ isGettingProducts: true });
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
			set({ isGettingProducts: false });
		}
	},

	async getSearchResultPopup(searchResult) {
		try {
			set({ isGettingSearchResultPopup: true });
			const res = await getSearchResultPopup(searchResult);
			set({ searchResultPopup: res.data.results });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingSearchResultPopup: false });
		}
	},

	async getProductBySearch(queries, link = '', limit = '12') {
		try {
			set({ isGettingProducts: true });
			const res = await getSearchResultProducts(queries, link, limit);
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
			set({ isGettingProducts: false });
		}
	},

	async getProductByBrand(slug, queries = '', link = '', limit = '12') {
		try {
			set({ isGettingProducts: true });
			const res = await getProductByBrand(slug, queries, link, limit);
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
			set({ isGettingProducts: false });
		}
	},

	async getProductBySlug(slug) {
		try {
			set({ isGettingProducts: true });
			const res = await getProduct(slug);
			set({ selectedProduct: res.data.product });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingProducts: false });
		}
	},

	async getRelatedProducts(slug) {
		try {
			set({ isGettingProducts: true });
			const res = await getRelatedProducts(slug);
			set({ relatedProducts: res.data.relatedProducts });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingProducts: false });
		}
	},

	async getProductsWishlist(link = '', params = '', limit = '12') {
		try {
			set({ isGettingProducts: true });
			const res = await getProductsWishlist(link, limit, params);

			set({
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				wishlistProducts: res.data.wishlistItems.map((item: any) => item.product),
				pagination: res.data.pagination,
			});
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingProducts: false });
		}
	},

	async addProductToWishlist(productId) {
		try {
			set({ isAddingProductToWishlist: true });
			const res = await addProductToWishlist(productId);
			set({
				wishlistProducts: [
					...(get().wishlistProducts || []),
					res.data.wishlist.product,
				],
			});
			return { success: true, message: 'Product added to wishlist' };
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				return {
					success: false,
					message:
						err?.response?.data?.message || 'Error adding product to wishlist',
				};
			}
			return { success: false, message: 'An unexpected error occurred' };
		} finally {
			set({ isAddingProductToWishlist: false });
		}
	},

	async removeProductFromWishlist(productId) {
		try {
			set({ isRemovingProductFromWishlist: true });
			await removeProductFromWishlist(productId);
			set({
				wishlistProducts: (get().wishlistProducts || []).filter(
					(product) => product._id !== productId
				),
			});
			return { success: true, message: 'Product removed from wishlist' };
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				return {
					success: false,
					message:
						err?.response?.data?.message || 'Error removing product from wishlist',
				};
			}
			return { success: false, message: 'An unexpected error occurred' };
		} finally {
			set({ isRemovingProductFromWishlist: false });
		}
	},

	async getTotalProductsWishlist() {
		try {
			const res = await getTotalProductsWishlist();
			set({ totalWishlist: res.data.totalWishlist });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		}
	},

	reset() {
		set({
			selectedProduct: null,
		});
	},
}));

export default useProductStore;
