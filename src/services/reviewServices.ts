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

export const getReviews = async (productId: string, link: string) => {
	try {
		const response = await axios.get(link || `api/v1/reviews/${productId}`);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			throw err;
		}
	}
};

export const updateReview = async (reviewId: string, data: ReviewDataSend) => {
	try {
		const response = await axios.patch(`api/v1/reviews/${reviewId}`, data);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			throw err;
		}
	}
};
