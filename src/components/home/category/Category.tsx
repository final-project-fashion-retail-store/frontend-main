'use client';

import CategoryCard from '@/components/home/category/CategoryCard';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const categories = [
	{ name: 'Sneakers', icon: '👟', count: '120+ Styles' },
	{ name: 'Shirts', icon: '👕', count: '85+ Designs' },
	{ name: 'Pants', icon: '👖', count: '95+ Options' },
];

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const Category = () => {
	const categoriesRef = useRef(null);

	const categoriesInView = useInView(categoriesRef, {
		once: true,
		margin: '-100px',
	});

	return (
		<section
			ref={categoriesRef}
			className='py-20'
		>
			<div className='px-4'>
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: 30 }}
					animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
				>
					<h2 className='text-4xl font-bold mb-4'>Shop by Category</h2>
					<p className='text-xl text-muted-foreground'>
						Explore our curated collections
					</p>
				</motion.div>
				<motion.div
					className='grid grid-cols-2 lg:grid-cols-3 gap-6'
					variants={staggerContainer}
					initial='initial'
					animate={categoriesInView ? 'animate' : 'initial'}
				>
					{categories.map((category) => (
						<CategoryCard
							key={category.name}
							category={category}
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Category;
