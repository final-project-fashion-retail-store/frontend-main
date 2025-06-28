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
