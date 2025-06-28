import axios from '@/lib/axios';

export const getCategories = async () => {
	try {
		const response = await axios.get(
			'/api/v1/categories/?fields=-active,-createdAt,-updatedAt'
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
};

export const getBrands = async (featuredBrand?: boolean | '') => {
	try {
		const response = await axios.get(
			`/api/v1/brands/?fields=-active,-createdAt,-updatedAt&featuredBrand=${featuredBrand}`
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching brands:', error);
		throw error;
	}
};
