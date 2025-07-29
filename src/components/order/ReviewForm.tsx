import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useCommonStore from '@/stores/commonStore';
import useOrderStore from '@/stores/orderStore';
import useReviewStore from '@/stores/reviewStore';
import { Review } from '@/types';
import { LoaderCircle, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

type Props = {
	review?: Review;
	color: string;
	size: string;
	orderId?: string;
	item: {
		product: {
			_id?: string;
			name: string;
		};
		variantId?: string;
		image: string;
	};
	setIsOpen: (open: boolean) => void;
};

const ReviewForm = ({
	review,
	color,
	size,
	item,
	orderId,
	setIsOpen,
}: Props) => {
	const [uploadedImages, uploadImages, destroyImages, reset] = useCommonStore(
		useShallow((state) => [
			state.uploadedImages,
			state.uploadImages,
			state.destroyImages,
			state.reset,
		])
	);
	const [isCreatingReview, isUpdatingReview, createReview, updateReview] =
		useReviewStore(
			useShallow((state) => [
				state.isCreatingReview,
				state.isUpdatingReview,
				state.createReview,
				state.updateReview,
			])
		);
	const getAllOrders = useOrderStore(useShallow((state) => state.getAllOrders));
	const [data, setData] = useState<{
		rating: number;
		title: string;
		comment: string;
		images: {
			public_id: string;
			secure_url: string;
		}[];
	}>(
		review
			? {
					rating: review.rating,
					title: review.title,
					comment: review.comment,
					images: review.images.map((img) => ({
						public_id: img.publicId,
						secure_url: img.url,
					})),
			  }
			: {
					rating: 0,
					title: '',
					comment: '',
					images: [],
			  }
	);

	useEffect(() => {
		if (uploadedImages && uploadedImages.length > 0) {
			setData((prev) => ({
				...prev,
				images: [...prev.images, ...uploadedImages],
			}));
		}

		return () => {
			reset();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uploadedImages]);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target?.files;
		if (!files || files.length === 0) return;

		// Check the current number of images and the files being uploaded
		if (data.images.length + files.length > 5) {
			toast.error('You can only upload up to 5 images.');
			return;
		}

		const fileArray = Array.from(files);
		const formData = new FormData();
		fileArray.forEach((file) => {
			formData.append('images', file);
		});

		await uploadImages(formData);
	};

	const handleImageDestroy = async (publicId: string) => {
		await destroyImages({ publicId: [publicId] });
		setData((prev) => ({
			...prev,
			images: prev.images.filter((img) => img.public_id !== publicId),
		}));
	};

	const handleSubmitReview = async () => {
		const properData = review
			? {
					...data,
					images: data.images.map((img) => ({
						publicId: img.public_id,
						url: img.secure_url,
					})),
			  }
			: {
					...data,
					orderId,
					productId: item.product._id,
					variantId: item.variantId,
					images: data.images.map((img) => ({
						publicId: img.public_id,
						url: img.secure_url,
					})),
			  };

		let result;

		if (review) {
			result = await updateReview(review._id, properData);
		} else {
			result = await createReview(properData);
		}

		if (result.success) {
			toast.success(result.message);
			await getAllOrders();
			setIsOpen(false);
		} else {
			toast.error(result.message);
		}
	};

	return (
		<>
			<div className='space-y-6 h-[600px] overflow-y-auto scrollbar-hide px-1'>
				{/* Product Info */}
				<div className='flex gap-4'>
					<div className='w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0'>
						<Image
							src={item.image}
							alt={item.product.name}
							width={64}
							height={64}
							className='w-full h-full object-cover'
						/>
					</div>
					<div className='flex-1'>
						<h4 className='font-medium text-gray-900 line-clamp-2'>
							{item.product.name}
						</h4>
						<div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
							<span>{color}</span>
							<span>•</span>
							<span>{size}</span>
						</div>
					</div>
				</div>

				{/* Rating */}
				<div>
					<Label className='text-sm font-medium'>Rating *</Label>
					<div className='flex gap-1 mt-2'>
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								type='button'
								onClick={() => setData({ ...data, rating: star })}
								className='p-1'
							>
								<Star
									className={`w-6 h-6 ${
										star <= data.rating
											? 'text-yellow-400 fill-yellow-400'
											: 'text-muted-foreground/30'
									}`}
								/>
							</button>
						))}
					</div>
				</div>

				{/* Review Title */}
				<div>
					<Label
						htmlFor='title'
						className='text-sm font-medium'
					>
						Review Title *
					</Label>
					<Input
						id='title'
						placeholder='Summarize your experience in a few words'
						value={data.title}
						onChange={(e) => setData({ ...data, title: e.target.value })}
						className='mt-2'
						maxLength={100}
					/>
					<div className='text-xs text-gray-500 mt-1'>
						{data.title.length}/100 characters
					</div>
				</div>

				{/* Review Text */}
				<div>
					<Label
						htmlFor='review'
						className='text-sm font-medium'
					>
						Review Details (Optional)
					</Label>
					<Textarea
						id='review'
						placeholder='Share more details about your experience with this product...'
						value={data.comment}
						onChange={(e) => setData({ ...data, comment: e.target.value })}
						rows={4}
						className='mt-2'
						maxLength={500}
					/>
					<div className='text-xs text-gray-500 mt-1'>
						{data.comment.length}/500 characters
					</div>
				</div>

				{/* Image Upload */}
				<div>
					<Label className='text-sm font-medium'>Photos (Optional)</Label>
					<div className='mt-2'>
						<input
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageUpload}
							className='hidden'
							id='image-upload'
							disabled={data.images.length >= 5}
						/>
						<label
							htmlFor='image-upload'
							className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors block ${
								data.images.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
							}`}
						>
							<div className='text-gray-600'>
								<div className='text-sm'>Click to upload photos</div>
								<div className='text-xs text-gray-500 mt-1'>
									Up to 5 images, max 5MB each
								</div>
							</div>
						</label>
					</div>

					{/* Image Preview */}
					{data.images.length > 0 && (
						<div className='grid grid-cols-3 gap-2 mt-3 px-2'>
							{data.images.map((image, index) => (
								<div
									key={index}
									className='relative'
								>
									<div className='aspect-square bg-gray-100 rounded-lg overflow-hidden'>
										<Image
											src={image.secure_url}
											alt={`Review image ${index + 1}`}
											width={200}
											height={200}
											className='w-full h-full object-cover'
										/>
									</div>
									<Button
										size='sm'
										variant='destructive'
										onClick={() => handleImageDestroy(image.public_id)}
										className='absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs'
									>
										×
									</Button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<DialogFooter className='gap-2'>
				<DialogClose asChild>
					<Button
						variant='outline'
						onClick={() => {
							setData({
								rating: 0,
								title: '',
								comment: '',
								images: [],
							});
						}}
					>
						Cancel
					</Button>
				</DialogClose>
				<Button
					onClick={handleSubmitReview}
					className='bg-purple-600 hover:bg-purple-700 text-white'
					disabled={isCreatingReview || isUpdatingReview || data.rating === 0}
				>
					{isCreatingReview || isUpdatingReview ? (
						<LoaderCircle className='animate-spin' />
					) : review ? (
						'Update Review'
					) : (
						'Submit Review'
					)}
				</Button>
			</DialogFooter>
		</>
	);
};

export default ReviewForm;
