'use client';

import { motion, useInView } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { useRef } from 'react';
import BrandCard from '@/components/home/featuredBrand/BrandCard';

const trendingBrands = [
	{
		name: 'Nike',
		logo: '/placeholder.svg?height=80&width=120&text=NIKE',
		description: 'Just Do It',
		specialty: 'Athletic Wear',
	},
	{
		name: 'Adidas',
		logo: '/placeholder.svg?height=80&width=120&text=ADIDAS',
		description: '3 Stripes',
		specialty: 'Sports Fashion',
	},
	{
		name: 'Puma',
		logo: '/placeholder.svg?height=80&width=120&text=PUMA',
		description: 'Forever Faster',
		specialty: 'Performance',
	},
	{
		name: 'Vans',
		logo: '/placeholder.svg?height=80&width=120&text=VANS',
		description: 'Off The Wall',
		specialty: 'Skate Culture',
	},
	{
		name: 'Converse',
		logo: '/placeholder.svg?height=80&width=120&text=CONVERSE',
		description: 'All Star',
		specialty: 'Classic Style',
	},
	{
		name: 'New Balance',
		logo: '/placeholder.svg?height=80&width=120&text=NEW BALANCE',
		description: 'Endorsed by No One',
		specialty: 'Comfort Tech',
	},
];

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const FeaturedBrand = () => {
	const brandsRef = useRef(null);

	const brandsInView = useInView(brandsRef, { once: true, margin: '-100px' });
	return (
		<section
			ref={brandsRef}
			className='py-20 overflow-hidden'
		>
			<div className='px-4'>
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: 30 }}
					animate={brandsInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={brandsInView ? { opacity: 1, scale: 1 } : {}}
						transition={{ delay: 0.2, duration: 0.6 }}
					>
						<Badge className='mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2'>
							🔥 This Week&apos;s Spotlight
						</Badge>
					</motion.div>
					<h2 className='text-4xl font-bold mb-4'>Trending Brands</h2>
					<p className='text-xl text-muted-foreground'>
						The hottest brands everyone&apos;s talking about
					</p>
				</motion.div>
				<motion.div
					className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center'
					variants={staggerContainer}
					initial='initial'
					animate={brandsInView ? 'animate' : 'initial'}
				>
					{trendingBrands.map((brand, index) => (
						<BrandCard
							key={brand.name}
							brand={brand}
							index={index}
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default FeaturedBrand;
