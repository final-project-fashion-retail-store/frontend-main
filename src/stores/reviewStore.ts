import { createReview } from '@/services/reviewServices';
import { ReviewDataSend } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	isCreatingReview: boolean;

	createReview: (
		data: ReviewDataSend
	) => Promise<{ success: boolean; message?: string }>;
};

const useReviewStore = create<Stores>((set) => ({
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
}));

export default useReviewStore;
