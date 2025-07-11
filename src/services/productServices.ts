import axios from '@/lib/axios';
import { isAxiosError } from 'axios';

export const getProducts = async (featuredProduct?: boolean | '') => {
	try {
		const response = await axios.get(
			`api/v1/products/?fields=-active,-createdAt,-updatedAt&featuredProduct=${featuredProduct}`
		);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) return error;
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
				`api/v1/products/category/${slug}?fields=-active,-createdAt,-updatedAt&limit=${1}&${queries}`
		);
		return res.data;
	} catch (error) {
		if (isAxiosError(error)) return error;
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
		if (isAxiosError(error)) return error;
	}
};

export const getSearchResultPopup = async (searchResult: string) => {
	try {
		const response = await axios.get(
			`api/v1/products/search/popup?q=${searchResult}`
		);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) return error;
	}
};

export const getSearchResultProducts = async (queries: string) => {
	try {
		const response = await axios.get(`api/v1/products/search?${queries}`);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) return error;
	}
};

export const getProductByBrand = async (slug: string, queries: string) => {
	try {
		const response = await axios.get(
			`api/v1/products/brand/${slug}?fields=-active,-createdAt,-updatedAt&${queries}`
		);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) return error;
	}
};
