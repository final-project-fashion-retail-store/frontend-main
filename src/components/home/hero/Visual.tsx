import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// import { Badge } from '@/components/ui/badge';

const featuredProducts = [
	{
		id: 1,
		name: 'Urban Runner Pro',
		category: 'Sneakers',
		price: 129.99,
		originalPrice: 159.99,
		image: '/placeholder.svg?height=400&width=400',
		featured: true,
		badge: 'Best Seller',
	},
	{
		id: 2,
		name: 'Classic Denim Jacket',
		category: 'Shirts',
		price: 89.99,
		image: '/placeholder.svg?height=400&width=400',
		featured: true,
		badge: 'New Arrival',
	},
	{
		id: 3,
		name: 'Slim Fit Chinos',
		category: 'Pants',
		price: 69.99,
		image: '/placeholder.svg?height=400&width=400',
		featured: true,
		badge: 'Trending',
	},
	{
		id: 4,
		name: 'Vintage Wash Jeans',
		category: 'Pants',
		price: 99.99,
		image: '/placeholder.svg?height=400&width=400',
		featured: true,
		badge: 'Limited',
	},
];

const Visual = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

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
						<Image
							src='https://res.cloudinary.com/dx2akttki/image/upload/v1749098608/jmniv3aisp4wkj3hlusg.avif'
							alt={featuredProducts[currentSlide].name}
							fill
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
							{/* <Badge className='mb-2 bg-white/20 text-white border-white/30'>
								{featuredProducts[currentSlide].badge}
							</Badge> */}
							<h3 className='text-2xl font-bold'>
								{featuredProducts[currentSlide].name}
							</h3>
							<p className='text-lg'>${featuredProducts[currentSlide].price}</p>
						</motion.div>
					</motion.div>
				</AnimatePresence>
			</motion.div>

			{/* Slide indicators */}
			<div className='flex justify-center mt-6 gap-2'>
				{featuredProducts.map((_, index) => (
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
