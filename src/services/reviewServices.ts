import axios from '@/lib/axios';
import { ReviewDataSend } from '@/types';
import { isAxiosError } from 'axios';

export const createReview = async (data: ReviewDataSend) => {
	try {
		const response = await axios.post('api/v1/reviews', data);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			throw err;
		}
	}
};
