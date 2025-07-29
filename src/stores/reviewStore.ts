import {
	createReview,
	getReviews,
	updateReview,
} from '@/services/reviewServices';
import { Pagination, Review, ReviewDataSend } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	reviews: Review[];
	pagination: Pagination | null;

	isCreatingReview: boolean;
	isGettingReviews: boolean;
	isUpdatingReview: boolean;

	createReview: (
		data: ReviewDataSend
	) => Promise<{ success: boolean; message?: string }>;
	getAllReviews: (productId: string, link?: string) => void;
	updateReview: (
		reviewId: string,
		data: ReviewDataSend
	) => Promise<{ success: boolean; message?: string }>;
};

const useReviewStore = create<Stores>((set) => ({
	reviews: [],
	pagination: null,
	isGettingReviews: false,
	isUpdatingReview: false,
	isCreatingReview: false,

	async createReview(data) {
		try {
			set({ isCreatingReview: true });
			await createReview(data);
			return { success: true, message: 'Review created successfully' };
		} catch (err) {
			if (err instanceof AxiosError) {
				return {
					success: false,
					message: err.response?.data.message || 'Failed to create review',
				};
			}
			return { success: false, message: 'Failed to create review' };
		} finally {
			set({ isCreatingReview: false });
		}
	},

	async getAllReviews(productId, link = '') {
		try {
			set({ isGettingReviews: true });
			const res = await getReviews(productId, link);
			if (!link) {
				set({ reviews: res.data.reviews, pagination: res.data.pagination });
			} else {
				set((state) => ({
					reviews: [...state.reviews, ...res.data.reviews],
					pagination: res.data.pagination,
				}));
			}
		} catch (err) {
			console.log(err);
		} finally {
			set({ isGettingReviews: false });
		}
	},

	async updateReview(reviewId, data) {
		try {
			set({ isUpdatingReview: true });
			const res = await updateReview(reviewId, data);
			set((state) => ({
				reviews: state.reviews.map((review) =>
					review._id === reviewId ? { ...review, ...res.data.review } : review
				),
			}));
			return { success: true, message: 'Review updated successfully' };
		} catch (err) {
			if (err instanceof AxiosError) {
				return {
					success: false,
					message: err.response?.data.message || 'Failed to update review',
				};
			}
			return { success: false, message: 'Failed to update review' };
		} finally {
			set({ isUpdatingReview: false });
		}
	},
}));

export default useReviewStore;
