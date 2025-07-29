import { motion } from 'framer-motion';

import ImageCustom from '@/components/custom/image-custom';
import { Badge } from '@/components/ui/badge';
import { formatTime } from '@/lib/formatTime';
import { Review } from '@/types';
import { SquarePen, Star } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/authStore';
import DialogCustom from '@/components/custom/dialog-custom';
import ReviewForm from '@/components/order/ReviewForm';
import { useState } from 'react';

type Props = {
	review: Review;
	setSelectedReviewImages: (images: Array<{ url: string }>) => void;
	setReviewImageIndex: (index: number) => void;
	setSelectedReviewerName: (name: string) => void;
	setShowReviewImageModal: (show: boolean) => void;
};

const DetailedProductReviewItem = ({
	review,
	setSelectedReviewImages,
	setReviewImageIndex,
	setSelectedReviewerName,
	setShowReviewImageModal,
}: Props) => {
	const authUser = useAuthStore((state) => state.authUser);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			key={review._id}
			className='border-b pb-6 last:border-b-0'
		>
			<div className='flex items-start gap-4'>
				<ImageCustom
					src={review.user.avatar.url}
					alt={review.user.fullName}
					width={48}
					height={48}
					className='size-12'
				/>
				<div className='flex-1'>
					<div className='flex items-center justify-between gap-2 mb-2'>
						<span className='font-semibold'>{review.user.fullName}</span>
						{authUser && authUser._id === review.user._id && (
							<Button
								variant='ghost'
								size='sm'
								className='text-muted-foreground hover:text-purple-600 px-2 py-1 h-auto'
								onClick={() => setIsOpen(true)}
							>
								<SquarePen />
								Edit
							</Button>
						)}
					</div>

					<div className='flex max-sm:flex-col max-sm:justify-center sm:items-center gap-4 mb-2'>
						<div className='flex items-center gap-4'>
							<div className='flex items-center'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-4 h-4 ${
											i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
										}`}
									/>
								))}
							</div>
							<span className='text-sm text-gray-600'>
								{formatTime(review.updatedAt)}
							</span>
						</div>
						<div className='flex gap-2 text-xs'>
							<Badge variant='outline'>Size: {review.size}</Badge>
							<Badge variant='outline'>Color: {review.color}</Badge>
						</div>
					</div>

					<h4 className='font-medium mb-2'>{review.title}</h4>
					<p className='text-foreground/70 mb-3'>{review.comment}</p>
					{review.images && review.images.length > 0 && (
						<div className='mb-4'>
							<div className='flex items-center gap-2 mb-3'>
								<span className='text-sm font-medium text-gray-700'>
									Customer Photos:
								</span>
								<Badge
									variant='secondary'
									className='bg-blue-100 text-blue-700 text-xs'
								>
									{review.images.length} photo{review.images.length > 1 ? 's' : ''}
								</Badge>
							</div>
							<div className='flex gap-2 overflow-x-auto pb-2'>
								{review.images.map((image, index) => (
									<motion.button
										key={index}
										onClick={() => {
											setSelectedReviewImages(
												review.images.map((img) => ({ url: img.url }))
											);
											setReviewImageIndex(index);
											setSelectedReviewerName(review.user.fullName);
											setShowReviewImageModal(true);
										}}
										className='flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-all cursor-pointer group'
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Image
											src={image.url}
											alt='Customer review image'
											width={80}
											height={80}
											className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
										/>
									</motion.button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			<DialogCustom
				isOpen={isOpen}
				setIsOpenChange={setIsOpen}
				dialogTitle='Edit a Review'
				body={
					<ReviewForm
						review={review}
						color={review.color}
						size={review.size}
						item={{
							product: {
								name: review.product.name,
							},
							image: review.product.colorImages[review.color][0].url,
						}}
						setIsOpen={setIsOpen}
					/>
				}
			/>
		</div>
	);
};

export default DetailedProductReviewItem;
