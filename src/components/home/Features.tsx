'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: 'easeOut' },
};

const Features = () => {
	const featuresRef = useRef(null);

	const featuresInView = useInView(featuresRef, {
		once: true,
		margin: '-100px',
	});

	return (
		<section
			ref={featuresRef}
			className='py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white'
		>
			<div className='container mx-auto px-4'>
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: 30 }}
					animate={featuresInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
				>
					<h2 className='text-4xl font-bold mb-4'>Why Choose Purple Bee?</h2>
					<p className='text-xl opacity-90'>
						What makes us different in the fashion world
					</p>
				</motion.div>

				<motion.div
					className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
					variants={staggerContainer}
					initial='initial'
					animate={featuresInView ? 'animate' : 'initial'}
				>
					{[
						{
							icon: '🚚',
							title: 'Free Shipping',
							description:
								'Free delivery on orders over $75. Fast and reliable shipping worldwide.',
						},
						{
							icon: '🔄',
							title: 'Easy Returns',
							description:
								"30-day hassle-free returns. Not satisfied? We'll make it right.",
						},
						{
							icon: '✨',
							title: 'Quality First',
							description:
								'Carefully curated products from trusted brands. Quality you can feel.',
						},
						{
							icon: '💬',
							title: 'Expert Support',
							description:
								'Our fashion experts are here to help you find your perfect style.',
						},
					].map((feature, index) => (
						<motion.div
							key={feature.title}
							variants={fadeInUp}
							className='text-center space-y-4'
							whileHover={{ scale: 1.05, y: -5 }}
						>
							<motion.div
								className='text-6xl mb-4'
								animate={{
									y: [-5, 5],
									rotate: [-5, 5],
								}}
								transition={{
									duration: 2 + index * 0.3,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: 'reverse',
									ease: 'easeInOut',
								}}
							>
								{feature.icon}
							</motion.div>
							<h3 className='text-xl font-bold'>{feature.title}</h3>
							<p className='text-sm opacity-90 leading-relaxed'>
								{feature.description}
							</p>
						</motion.div>
					))}
				</motion.div>

				{/* Customer Promise */}
				<motion.div
					className='mt-16 text-center'
					initial={{ opacity: 0, y: 30 }}
					animate={featuresInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.6, duration: 0.8 }}
				>
					<motion.div
						className='max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8'
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.3 }}
					>
						<h3 className='text-2xl font-bold mb-4'>Our Promise to You</h3>
						<p className='text-lg opacity-90 leading-relaxed'>
							&quot;We&apos;re not just selling clothes - we&apos;re helping you
							express your unique style. Every piece in our collection is chosen with
							care, and every customer interaction is handled with respect.&quot;
						</p>
						<div className='mt-6 flex items-center justify-center gap-2'>
							<motion.div
								className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center'
								animate={{ scale: [1, 1.1, 1] }}
								transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
							>
								<span className='text-2xl'>💜</span>
							</motion.div>
							<div className='text-left'>
								<p className='font-semibold'>Purple Bee Team</p>
								<p className='text-sm opacity-75'>Fashion Curators</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Features;
