'use client';

import BestSellingCard from '@/components/home/bestSelling/BestSellingCard';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import { useRef } from 'react';

const bestSellingProducts = [
	{
		id: 1,
		name: 'Air Max Classic',
		category: 'Sneakers',
		price: 149.99,
		originalPrice: 179.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 1247,
		rating: 4.8,
		badge: 'Best Seller',
		discount: 17,
	},
	{
		id: 2,
		name: 'Premium Denim Jacket',
		category: 'Shirts',
		price: 89.99,
		originalPrice: 119.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 892,
		rating: 4.7,
		badge: 'Hot',
		discount: 25,
	},
	{
		id: 3,
		name: 'Comfort Fit Joggers',
		category: 'Pants',
		price: 59.99,
		originalPrice: 79.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 1156,
		rating: 4.9,
		badge: 'Top Rated',
		discount: 25,
	},
	{
		id: 4,
		name: 'Vintage Straight Jeans',
		category: 'Jeans',
		price: 79.99,
		originalPrice: 99.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 734,
		rating: 4.6,
		badge: 'Trending',
		discount: 20,
	},
	{
		id: 5,
		name: 'Vintage Straight Jeans',
		category: 'Jeans',
		price: 79.99,
		originalPrice: 99.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 734,
		rating: 4.6,
		badge: 'Trending',
		discount: 20,
	},
	{
		id: 6,
		name: 'Vintage Straight Jeans',
		category: 'Jeans',
		price: 79.99,
		originalPrice: 99.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 734,
		rating: 4.6,
		badge: 'Trending',
		discount: 20,
	},
	{
		id: 7,
		name: 'Vintage Straight Jeans',
		category: 'Jeans',
		price: 79.99,
		originalPrice: 99.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 734,
		rating: 4.6,
		badge: 'Trending',
		discount: 20,
	},
	{
		id: 8,
		name: 'Vintage Straight Jeans',
		category: 'Jeans',
		price: 79.99,
		originalPrice: 99.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 734,
		rating: 4.6,
		badge: 'Trending',
		discount: 20,
	},
	{
		id: 9,
		name: 'Vintage Straight Jeans',
		category: 'Jeans',
		price: 79.99,
		originalPrice: 99.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 734,
		rating: 4.6,
		badge: 'Trending',
		discount: 20,
	},
	{
		id: 10,
		name: 'Vintage Straight Jeans',
		category: 'Jeans',
		price: 79.99,
		originalPrice: 99.99,
		image: '/placeholder.svg?height=500&width=400',
		soldCount: 734,
		rating: 4.6,
		badge: 'Trending',
		discount: 20,
	},
];

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const BestSelling = () => {
	const styleRef = useRef(null);

	const styleInView = useInView(styleRef, { once: true, margin: '-100px' });
	return (
		<section
			ref={styleRef}
			className='py-20'
		>
			<div>
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: 30 }}
					animate={styleInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
				>
					<div className='flex items-center justify-center gap-2 mb-4'>
						<motion.div
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
						>
							<Star className='w-6 h-6 text-yellow-500 fill-current' />
						</motion.div>
						<h2 className='text-4xl font-bold'>Best Selling Products</h2>
						<motion.div
							animate={{ scale: [1, 1.2, 1] }}
							transition={{
								duration: 2,
								repeat: Number.POSITIVE_INFINITY,
								delay: 1,
							}}
						>
							<Star className='w-6 h-6 text-yellow-500 fill-current' />
						</motion.div>
					</div>
					<p className='text-xl text-muted-foreground'>
						Customer favorites that are flying off the shelves
					</p>
				</motion.div>
				<motion.div
					className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
					variants={staggerContainer}
					initial='initial'
					animate={styleInView ? 'animate' : 'initial'}
				>
					{bestSellingProducts.map((product) => (
						<BestSellingCard
							key={product.id}
							product={product}
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default BestSelling;
