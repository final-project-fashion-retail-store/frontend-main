import axios from '@/lib/axios';
import { isAxiosError } from 'axios';

export const getCategories = async () => {
	try {
		const response = await axios.get(
			'api/v1/categories/?fields=-active,-createdAt,-updatedAt'
		);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getBrands = async (featuredBrand?: boolean | '') => {
	try {
		const response = await axios.get(
			`api/v1/brands/?fields=-active,-createdAt,-updatedAt&featuredBrand=${featuredBrand}`
		);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const uploadImages = async (data: FormData) => {
	try {
		const res = await axios.post('api/v1/images', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const destroyImages = async (data: { publicId: string[] }) => {
	try {
		const res = await axios.delete('api/v1/images', { data });
		return res;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
