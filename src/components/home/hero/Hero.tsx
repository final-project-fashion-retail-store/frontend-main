'use client';

import { motion } from 'framer-motion';

import TextContent from '@/components/home/hero/TextContent';
import Visual from '@/components/home/hero/Visual';
import { useEffect, useState } from 'react';

const Hero = () => {
	const [particles, setParticles] = useState<
		Array<{
			id: number;
			left: number;
			top: number;
			duration: number;
			delay: number;
		}>
	>([]);

	useEffect(() => {
		// Generate particles only on client side
		const generatedParticles = [...Array(20)].map((_, i) => ({
			id: i,
			left: Math.random() * 100,
			top: Math.random() * 100,
			duration: 2 + Math.random() * 2,
			delay: Math.random() * 3,
		}));
		setParticles(generatedParticles);
	}, []);

	return (
		<section className='relative overflow-hidden pt-20 pb-32'>
			{/* Animated background particles */}
			<div className='absolute inset-0 overflow-hidden'>
				{particles.map((particle) => (
					<motion.div
						key={particle.id}
						className='absolute w-2 h-2 bg-purple-300/30 rounded-full'
						style={{
							left: `${particle.left}%`,
							top: `${particle.top}%`,
						}}
						animate={{
							y: [-10, 10],
							opacity: [0.3, 0.8, 0.3],
						}}
						transition={{
							duration: particle.duration,
							repeat: Number.POSITIVE_INFINITY,
							repeatType: 'reverse',
							delay: particle.delay,
						}}
					/>
				))}
			</div>
			<div className='relative z-10'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<TextContent />
					<Visual />
				</div>
			</div>
		</section>
	);
};

export default Hero;
