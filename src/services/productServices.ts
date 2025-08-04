import axios from '@/lib/axios';
import { isAxiosError } from 'axios';

export const getProducts = async (featuredProduct?: boolean | '') => {
	try {
		const response = await axios.get(
			`api/v1/products/?fields=-active,-createdAt,-updatedAt&featuredProduct=${featuredProduct}`
		);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getProduct = async (slug: string) => {
	try {
		const response = await axios.get(`api/v1/products/${slug}`);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getRelatedProducts = async (slug: string) => {
	try {
		const response = await axios.get(`api/v1/products/related/${slug}`);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getBestSellingProducts = async () => {
	try {
		const response = await axios.get('api/v1/products/best-selling');
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getProductByCategory = async (
	slug: string,
	link: string,
	limit: string,
	queries: string
) => {
	try {
		const res = await axios.get(
			link ||
				`api/v1/products/category/${slug}?fields=-active,-createdAt,-updatedAt&limit=${limit}&${queries}`
		);
		return res.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getProductBySubcategory = async (
	categorySlug: string,
	subcategorySlug: string,
	link: string,
	limit: string,
	queries: string
) => {
	try {
		const res = await axios.get(
			link ||
				`api/v1/products/category/${categorySlug}/subcategory/${subcategorySlug}?fields=-active,-createdAt,-updatedAt&limit=${limit}&limit=${limit}&${queries}`
		);
		return res.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getSearchResultPopup = async (searchResult: string) => {
	try {
		const response = await axios.get(
			`api/v1/products/search/popup?q=${searchResult}`
		);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getSearchResultProducts = async (
	queries: string,
	link: string,
	limit: string
) => {
	try {
		const response = await axios.get(
			link || `api/v1/products/search?${queries}&limit=${limit}`
		);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getProductByBrand = async (
	slug: string,
	queries: string,
	link: string,
	limit: string
) => {
	try {
		const response = await axios.get(
			link ||
				`api/v1/products/brand/${slug}?fields=-active,-createdAt,-updatedAt&${queries}&limit=${limit}`
		);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

// wishlist
export const getProductsWishlist = async (
	link: string,
	limit: string,
	params: string
) => {
	try {
		const response = await axios.get(
			link || `api/v1/wishlist?limit=${limit}&${params}`
		);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const addProductToWishlist = async (productId: string) => {
	try {
		const response = await axios.post(`api/v1/wishlist`, {
			productId,
		});
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const removeProductFromWishlist = async (productId: string) => {
	try {
		const response = await axios.delete(`api/v1/wishlist/${productId}`);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};

export const getTotalProductsWishlist = async () => {
	try {
		const response = await axios.get(`api/v1/wishlist/total`);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
	}
};
