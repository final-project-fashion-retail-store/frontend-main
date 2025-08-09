import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BestSellingProduct } from '@/types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: 'easeOut' },
};

type Props = {
	product: BestSellingProduct;
};

const BestSellingCard = ({ product }: Props) => {
	const [isHovered, setIsHovered] = useState(false);

	const router = useRouter();

	const currentImage =
		isHovered && product.images[1]
			? product.images[1].url
			: product.images[0].url;
	const discountPercentage = (
		((product.price - product.salePrice) / product.price) *
		100
	).toFixed(0);

	const handleClickProduct = () => {
		router.push(`/product/${product.slug}`);
	};
	return (
		<motion.div
			key={product._id}
			variants={fadeInUp}
			whileHover={{ y: -10 }}
			className='cursor-pointer group h-full'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleClickProduct}
		>
			<Card className='border-0 shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden h-full flex flex-col pt-0'>
				<div className='relative overflow-hidden flex-shrink-0'>
					<motion.div
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.5 }}
					>
						<Image
							src={currentImage}
							alt={product.name}
							width={400}
							height={320}
							className='w-full h-48 sm:h-64 md:h-80 object-cover'
						/>
					</motion.div>

					{product.price > product.salePrice && (
						<Badge
							variant='destructive'
							className='absolute top-2 right-2 text-xs'
						>
							-{discountPercentage}%
						</Badge>
					)}

					{/* Sales overlay */}
					<motion.div
						className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
						initial={{ opacity: 0 }}
						whileHover={{ opacity: 1 }}
					>
						<div className='absolute bottom-2 left-2 right-2 text-white'>
							<div className='flex items-center justify-between mb-1'>
								<div className='flex items-center gap-1'>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: 'linear',
										}}
									>
										<Star className='w-3 h-3 fill-current text-yellow-400' />
									</motion.div>
									<span className='text-xs font-semibold'>{product.averageRating}</span>
								</div>
								<div className='text-xs'>
									<span className='font-semibold'>{product.totalSold}</span> sold
								</div>
							</div>
							<div className='w-full bg-accent-foreground/20 rounded-full h-1'>
								<motion.div
									className='bg-gradient-to-r from-yellow-400 to-orange-500 h-1 rounded-full'
									initial={{ width: 0 }}
									whileHover={{
										width: `${Math.min((product.totalSold / 1500) * 100, 100)}%`,
									}}
									transition={{ duration: 1, ease: 'easeOut' }}
								/>
							</div>
							<p className='text-xs mt-1 opacity-90'>Popularity meter</p>
						</div>
					</motion.div>
				</div>

				<CardContent className='p-3 md:p-6 flex-1 flex flex-col justify-between'>
					<div className='space-y-1 md:space-y-2 flex-1'>
						<p className='text-xs md:text-sm text-purple-600 font-medium'>
							{product.category[0].name}
						</p>
						<h3 className='text-sm md:text-xl font-bold transition-colors line-clamp-2'>
							{product.name}
						</h3>
						<div className='flex items-center gap-1 md:gap-2'>
							<span className='text-lg md:text-2xl font-bold text-purple-600'>
								${product.salePrice}
							</span>
							{product.price > product.salePrice && (
								<span className='text-sm md:text-lg text-muted-foreground line-through'>
									${product.price}
								</span>
							)}
						</div>
					</div>

					{/* Rating and sales info */}
					<div className='flex items-center justify-between text-xs md:text-sm text-muted-foreground mt-2 md:mt-4'>
						<div className='flex items-center gap-1'>
							<div className='flex'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-2 h-2 md:w-3 md:h-3 ${
											i < Math.floor(product.averageRating)
												? 'text-yellow-400 fill-current'
												: 'text-muted-foreground'
										}`}
									/>
								))}
							</div>
							<span>({product.averageRating})</span>
						</div>
						<span className='font-semibold text-green-600'>
							{product.totalSold.toLocaleString()} sold
						</span>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default BestSellingCard;
