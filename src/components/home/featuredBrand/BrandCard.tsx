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
				scale: 1.05,
				y: -8,
				transition: { duration: 0.3 },
			}}
			className='cursor-pointer'
		>
			<motion.div
				className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex items-center justify-center w-48 h-32 relative overflow-hidden group'
				animate={{
					y: [-3, 3],
				}}
				transition={{
					duration: 3 + index * 0.5,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: 'reverse',
					ease: 'easeInOut',
				}}
			>
				{/* Background gradient overlay */}
				<motion.div
					className='absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 opacity-0 group-hover:opacity-100'
					transition={{ duration: 0.4 }}
				/>

				{/* Subtle border glow on hover */}
				<motion.div
					className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-200'
					transition={{ duration: 0.3 }}
				/>

				<div className='relative z-10 flex items-center justify-center w-full h-full'>
					<Image
						src={brand.logo.url || ''}
						alt={brand.name}
						width={120}
						height={60}
						className='max-w-[140px] max-h-[50px] object-contain filter brightness-0 opacity-60 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300'
						style={{
							width: 'auto',
							height: 'auto',
						}}
					/>
				</div>

				{/* Brand name tooltip on hover */}
				<motion.div
					className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none'
					initial={{ y: 10 }}
					whileHover={{ y: 0 }}
					transition={{ duration: 0.2 }}
				>
					{brand.name}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default BrandCard;
