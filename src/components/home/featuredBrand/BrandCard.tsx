import { Brand } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
	brand: Brand;
	index: number;
};

const scaleIn = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	transition: { duration: 0.6, ease: 'easeOut' },
};

const BrandCard = ({ brand, index }: Props) => {
	return (
		<motion.div
			key={brand.name}
			variants={scaleIn}
			whileHover={{
				scale: 1.15,
				rotateY: 5,
				transition: { duration: 0.3 },
			}}
			className='cursor-pointer'
		>
			<motion.div
				className='bg-background rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow duration-300 flex items-center justify-center h-24 relative overflow-hidden'
				animate={{
					y: [-5, 5],
				}}
				transition={{
					duration: 2 + index * 0.2,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: 'reverse',
					ease: 'easeInOut',
				}}
			>
				<motion.div
					className='absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0'
					whileHover={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				/>
				<Image
					src={brand.logo.url || '/placeholder.svg'}
					alt={brand.name}
					width={120}
					height={80}
					className='max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 relative z-10'
				/>
			</motion.div>
		</motion.div>
	);
};

export default BrandCard;
