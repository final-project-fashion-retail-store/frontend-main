'use client';

import { motion, useInView } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { useEffect, useRef } from 'react';
import BrandCard from '@/components/home/featuredBrand/BrandCard';
import useCommonStore from '@/stores/commonStore';
import { useShallow } from 'zustand/shallow';
import BrandCardSkeleton from '@/components/home/featuredBrand/BrandCardSkeleton';

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const FeaturedBrand = () => {
	const [isGettingBrand, brands, getBrands] = useCommonStore(
		useShallow((state) => [state.isGettingBrands, state.brands, state.getBrands])
	);
	const brandsRef = useRef(null);
	const brandsInView = useInView(brandsRef, { once: true, margin: '-100px' });

	useEffect(() => {
		getBrands();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
					className='flex flex-row flex-wrap gap-6 items-center justify-center'
					variants={staggerContainer}
					initial='initial'
					animate={brandsInView ? 'animate' : 'initial'}
				>
					{isGettingBrand &&
						[...Array(6).keys()].map((index) => (
							<BrandCardSkeleton
								key={index}
								index={index}
							/>
						))}

					{!isGettingBrand &&
						brands?.map((brand, index) => (
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
