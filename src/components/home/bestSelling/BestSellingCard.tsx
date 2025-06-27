import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: 'easeOut' },
};

type Props = {
	product: {
		id: number;
		name: string;
		category: string;
		price: number;
		originalPrice?: number;
		image: string;
		soldCount: number;
		rating: number;
		badge: string;
		discount: number;
	};
};

const BestSellingCard = ({ product }: Props) => {
	return (
		<motion.div
			key={product.id}
			variants={fadeInUp}
			whileHover={{ y: -10 }}
			className='cursor-pointer group'
		>
			<Card className='border-0 shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden'>
				<div className='relative overflow-hidden'>
					<motion.div
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.5 }}
					>
						<Image
							src='https://res.cloudinary.com/dx2akttki/image/upload/v1749098608/jmniv3aisp4wkj3hlusg.avif'
							alt={product.name}
							width={400}
							height={500}
							className='w-full h-80 object-cover'
						/>
					</motion.div>

					{/* Badges */}
					{/* <Badge className='absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white'>
											{product.badge}
										</Badge> */}

					{product.discount > 0 && (
						<Badge
							variant='destructive'
							className='absolute top-4 right-4'
						>
							-{product.discount}%
						</Badge>
					)}

					{/* Sales overlay */}
					<motion.div
						className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
						initial={{ opacity: 0 }}
						whileHover={{ opacity: 1 }}
					>
						<div className='absolute bottom-4 left-4 right-4 text-white'>
							<div className='flex items-center justify-between mb-2'>
								<div className='flex items-center gap-1'>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: 'linear',
										}}
									>
										<Star className='w-4 h-4 fill-current text-yellow-400' />
									</motion.div>
									<span className='text-sm font-semibold'>{product.rating}</span>
								</div>
								<div className='text-sm'>
									<span className='font-semibold'>
										{product.soldCount.toLocaleString()}
									</span>{' '}
									sold
								</div>
							</div>
							<div className='w-full bg-accent-foreground/20 rounded-full h-2'>
								<motion.div
									className='bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full'
									initial={{ width: 0 }}
									whileHover={{
										width: `${Math.min((product.soldCount / 1500) * 100, 100)}%`,
									}}
									transition={{ duration: 1, ease: 'easeOut' }}
								/>
							</div>
							<p className='text-xs mt-1 opacity-90'>Popularity meter</p>
						</div>
					</motion.div>
				</div>

				<CardContent className='p-6'>
					<div className='space-y-2'>
						<p className='text-sm text-purple-600 font-medium'>{product.category}</p>
						<h3 className='text-xl font-bold transition-colors'>{product.name}</h3>
						<div className='flex items-center gap-2'>
							<span className='text-2xl font-bold text-purple-600'>
								${product.price}
							</span>
							{product.originalPrice && (
								<span className='text-lg text-muted-foreground line-through'>
									${product.originalPrice}
								</span>
							)}
						</div>

						{/* Rating and sales info */}
						<div className='flex items-center justify-between text-sm text-muted-foreground'>
							<div className='flex items-center gap-1'>
								<div className='flex'>
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-3 h-3 ${
												i < Math.floor(product.rating)
													? 'text-yellow-400 fill-current'
													: 'text-muted-foreground'
											}`}
										/>
									))}
								</div>
								<span>({product.rating})</span>
							</div>
							<span className='font-semibold text-green-600'>
								{product.soldCount.toLocaleString()} sold
							</span>
						</div>
					</div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Button className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'>
							Add to Cart
						</Button>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default BestSellingCard;
