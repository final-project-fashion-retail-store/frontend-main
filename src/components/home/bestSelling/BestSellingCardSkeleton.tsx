import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: 'easeOut' },
};

const BestSellingCardSkeleton = () => {
	return (
		<motion.div
			variants={fadeInUp}
			className='cursor-pointer group'
		>
			<Card className='border-0 shadow-lg transition-shadow duration-500 overflow-hidden'>
				<div className='relative overflow-hidden'>
					{/* Image Skeleton */}
					<div className='w-full h-80 bg-gray-200 animate-pulse' />

					{/* Badge Skeleton */}
					<div className='absolute top-4 right-4 w-12 h-6 bg-gray-300 rounded animate-pulse' />
				</div>

				<CardContent className='p-6'>
					<div className='space-y-2'>
						{/* Category Skeleton */}
						<div className='w-20 h-4 bg-gray-200 rounded animate-pulse' />

						{/* Product Name Skeleton */}
						<div className='w-3/4 h-6 bg-gray-200 rounded animate-pulse' />

						{/* Price Skeleton */}
						<div className='flex items-center gap-2'>
							<div className='w-16 h-7 bg-gray-200 rounded animate-pulse' />
							<div className='w-12 h-5 bg-gray-300 rounded animate-pulse' />
						</div>

						{/* Rating and Sales Skeleton */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-1'>
								<div className='flex gap-1'>
									{[...Array(5)].map((_, i) => (
										<div
											key={i}
											className='w-3 h-3 bg-gray-200 rounded animate-pulse'
										/>
									))}
								</div>
								<div className='w-8 h-4 bg-gray-200 rounded animate-pulse ml-1' />
							</div>
							<div className='w-16 h-4 bg-gray-200 rounded animate-pulse' />
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default BestSellingCardSkeleton;
