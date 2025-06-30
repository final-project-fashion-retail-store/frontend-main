import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import useProductStore from '@/stores/productStore';
import { useShallow } from 'zustand/shallow';
import { LoaderCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const Visual = () => {
	const [isGettingProducts, products, getProducts] = useProductStore(
		useShallow((state) => [
			state.isGettingProducts,
			state.products,
			state.getProducts,
		])
	);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		getProducts(true);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!products || products.length === 0) return;

		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % products.length);
		}, 5000);
		return () => clearInterval(timer);
	}, [products]);

	// Show loading skeleton while fetching products
	if (isGettingProducts || !products || products.length === 0) {
		return (
			<motion.div
				className='relative'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.4, duration: 1 }}
			>
				<div className='relative w-full h-[600px] rounded-3xl overflow-hidden bg-muted-foreground flex items-center justify-center'>
					<LoaderCircle className='w-12 h-12 text-muted animate-spin' />
				</div>

				{/* Loading skeleton indicators */}
				<div className='flex justify-center mt-6 gap-2'>
					{[...Array(3)].map((_, index) => (
						<div
							key={index}
							className='h-3 w-3 rounded-full bg-muted-foreground/50'
						/>
					))}
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			className='relative'
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 0.4, duration: 1 }}
		>
			<motion.div
				className='relative w-full h-[600px] rounded-3xl overflow-hidden'
				animate={{ y: [-10, 10] }}
				transition={{
					duration: 3,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: 'reverse',
					ease: 'easeInOut',
				}}
			>
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentSlide}
						className='absolute inset-0'
						initial={{ opacity: 0, scale: 1.1 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.8 }}
					>
						<Link
							href={`/product/${products?.[currentSlide]?.slug || ''}`}
							className='block w-full h-full cursor-pointer'
						>
							<Image
								src={products?.[currentSlide]?.images[0]?.url || ''}
								alt={products?.[currentSlide]?.name || ''}
								width={1200}
								height={600}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								priority
								className='object-cover'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
							<motion.div
								className='absolute bottom-6 left-6 text-white'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
							>
								{!products[currentSlide].inStock && (
									<Badge
										variant='destructive'
										className='mb-2 bg-red-600 text-white border-red-600'
									>
										Out of Stock
									</Badge>
								)}
								<h3 className='text-2xl font-bold'>
									{products?.[currentSlide]?.name || ''}
								</h3>
								<div className='flex items-center gap-4 font-bold'>
									<p className='text-2xl'>${products?.[currentSlide]?.salePrice || 0}</p>
									{products?.[currentSlide]?.price >
										products?.[currentSlide]?.salePrice && (
										<>
											<span className='line-through text-lg text-destructive'>
												${products?.[currentSlide]?.price || 0}
											</span>
											<Badge className='bg-green-600 text-white text-sm'>
												Save $
												{(
													products[currentSlide].price - products[currentSlide].salePrice
												).toFixed(0)}
											</Badge>
										</>
									)}
								</div>
							</motion.div>
						</Link>
					</motion.div>
				</AnimatePresence>
			</motion.div>

			{/* Slide indicators */}
			<div className='flex justify-center mt-6 gap-2'>
				{products?.map((_, index) => (
					<motion.button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`h-3 rounded-full transition-all duration-300 ${
							index === currentSlide
								? 'bg-purple-600 w-8'
								: 'bg-muted-foreground/50 w-3'
						}`}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
					/>
				))}
			</div>
		</motion.div>
	);
};

export default Visual;
