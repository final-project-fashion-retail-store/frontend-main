import axios from '@/lib/axios';

export const getCategories = async () => {
	try {
		const response = await axios.get(
			'/api/v1/categories/with-subcategories?fields=-active,-createdAt,-updatedAt'
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
};
