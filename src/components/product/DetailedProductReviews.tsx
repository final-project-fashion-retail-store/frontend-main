import { AnimatePresence } from 'framer-motion';

import DetailedProductReviewItem from '@/components/product/DetailedProductReviewItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useReviewStore from '@/stores/reviewStore';
import { Product } from '@/types';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import ReviewImageModal from '@/components/product/ReviewImageModal';
import Loader from '@/components/Loader';
import Overlay from '@/components/ui/overlay';
import useCommonStore from '@/stores/commonStore';

type Props = {
	selectedProduct: Product | null;
};

const DetailedProductReviews = ({ selectedProduct }: Props) => {
	const [
		isGettingReviews,
		isUpdatingReview,
		reviews,
		pagination,
		getAllReviews,
	] = useReviewStore(
		useShallow((state) => [
			state.isGettingReviews,
			state.isUpdatingReview,
			state.reviews,
			state.pagination,
			state.getAllReviews,
		])
	);
	const [isUploadingImages, isDestroyingImages] = useCommonStore(
		useShallow((state) => [state.isUploadingImages, state.isDestroyingImages])
	);
	const [showReviewImageModal, setShowReviewImageModal] = useState(false);
	const [selectedReviewImages, setSelectedReviewImages] = useState<
		Array<{ url: string }>
	>([]);
	const [reviewImageIndex, setReviewImageIndex] = useState(0);
	const [selectedReviewerName, setSelectedReviewerName] = useState('');

	useEffect(() => {
		if (!selectedProduct) return;
		getAllReviews(selectedProduct._id || '');
	}, [getAllReviews, selectedProduct]);

	if (isGettingReviews) {
		return <Loader />;
	}

	return (
		<div className='mb-16'>
			{(isUploadingImages || isDestroyingImages) && <Overlay loading />}
			{isUpdatingReview && <Overlay />}
			<Card>
				<CardContent className='p-6'>
					<div className='flex max-sm:flex-col items-center justify-between mb-6'>
						<h3 className='text-2xl font-bold'>Customer Reviews</h3>
						<div className='flex items-center gap-4'>
							<div className='text-right'>
								<div className='flex items-center gap-2'>
									<div className='flex'>
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-5 h-5 ${
													i < Math.floor(selectedProduct?.averageRating || 0)
														? 'text-yellow-400 fill-current'
														: 'text-muted-foreground/30'
												}`}
											/>
										))}
									</div>
									<span className='text-xl font-bold'>
										{selectedProduct?.averageRating}
									</span>
								</div>
								<div className='text-sm text-muted-foreground'>
									Based on {selectedProduct?.totalReviews} reviews
								</div>
							</div>
						</div>
					</div>

					<div className='space-y-6'>
						{reviews.map((review) => (
							<DetailedProductReviewItem
								key={review._id}
								review={review}
								setSelectedReviewImages={setSelectedReviewImages}
								setReviewImageIndex={setReviewImageIndex}
								setSelectedReviewerName={setSelectedReviewerName}
								setShowReviewImageModal={setShowReviewImageModal}
							/>
						))}
					</div>

					{pagination && pagination.nextPage && (
						<div className='text-center mt-8'>
							<Button
								variant='outline'
								className='bg-transparent'
								onClick={() => {
									console.log(pagination.nextPage);
									getAllReviews(selectedProduct?._id || '', pagination?.nextPage || '');
								}}
							>
								Load More Reviews
							</Button>
						</div>
					)}
				</CardContent>
			</Card>

			<AnimatePresence>
				{showReviewImageModal && (
					<ReviewImageModal
						isOpen={showReviewImageModal}
						onClose={() => setShowReviewImageModal(false)}
						images={selectedReviewImages}
						currentIndex={reviewImageIndex}
						onNavigate={setReviewImageIndex}
						reviewerName={selectedReviewerName}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default DetailedProductReviews;
