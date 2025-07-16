import DetailedProductReviewItem from '@/components/product/DetailedProductReviewItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';
import { Star } from 'lucide-react';

// Mock reviews data
const reviewsData = [
	{
		id: 1,
		user: {
			name: 'Alex Johnson',
			avatar:
				'https://res.cloudinary.com/dx2akttki/image/upload/v1749311234/cpihscp3fiuogmexx6sa.jpg',
			verified: true,
		},
		rating: 5,
		title: 'Perfect for training sessions',
		comment:
			'This track top is exactly what I needed for my morning runs. The fabric is incredibly lightweight yet warm enough for cooler days. The fit is perfect and the quality feels premium.',
		date: '2024-12-15',
		helpful: 23,
		size: 'L',
		color: 'Green',
		verified_purchase: true,
	},
	{
		id: 2,
		user: {
			name: 'Sarah Chen',
			avatar:
				'https://res.cloudinary.com/dx2akttki/image/upload/v1749311234/cpihscp3fiuogmexx6sa.jpg',
			verified: true,
		},
		rating: 4,
		title: 'Great quality, runs slightly large',
		comment:
			'Love the design and the material feels great. Only issue is it runs a bit large - I probably should have ordered a size down. But overall very happy with the purchase.',
		date: '2024-12-10',
		helpful: 18,
		size: 'M',
		color: 'Green',
		verified_purchase: true,
	},
	{
		id: 3,
		user: {
			name: 'Mike Rodriguez',
			avatar:
				'https://res.cloudinary.com/dx2akttki/image/upload/v1749311234/cpihscp3fiuogmexx6sa.jpg',
			verified: false,
		},
		rating: 5,
		title: 'Excellent for layering',
		comment:
			'This is my go-to piece for layering. Works great over a t-shirt or under a jacket. The zip quality is excellent and the hood fits perfectly. Highly recommend!',
		date: '2024-12-08',
		helpful: 31,
		size: 'XL',
		color: 'Green',
		verified_purchase: true,
	},
	{
		id: 4,
		user: {
			name: 'Emma Wilson',
			avatar:
				'https://res.cloudinary.com/dx2akttki/image/upload/v1749311234/cpihscp3fiuogmexx6sa.jpg',
			verified: true,
		},
		rating: 4,
		title: 'Stylish and comfortable',
		comment:
			"Really like the minimalist design. It's comfortable for both workouts and casual wear. The green color is more vibrant than expected, which I love.",
		date: '2024-12-05',
		helpful: 12,
		size: 'S',
		color: 'Green',
		verified_purchase: true,
	},
];

type Props = {
	selectedProduct: Product | null;
};

const DetailedProductReviews = ({ selectedProduct }: Props) => {
	return (
		<div className='mb-16'>
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
														: 'text-gray-300'
												}`}
											/>
										))}
									</div>
									<span className='text-xl font-bold'>
										{selectedProduct?.averageRating}
									</span>
								</div>
								<div className='text-sm text-gray-600'>
									Based on {selectedProduct?.totalReviews} reviews
								</div>
							</div>
						</div>
					</div>

					<div className='space-y-6'>
						{reviewsData.map((review) => (
							<DetailedProductReviewItem
								key={review.id}
								review={review}
							/>
						))}
					</div>

					<div className='text-center mt-8'>
						<Button
							variant='outline'
							className='bg-transparent'
						>
							Load More Reviews
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default DetailedProductReviews;
