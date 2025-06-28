import { motion } from 'framer-motion';

type Props = {
	index: number;
};

const scaleIn = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	transition: { duration: 0.6, ease: 'easeOut' },
};

const BrandCardSkeleton = ({ index }: Props) => {
	return (
		<motion.div
			variants={scaleIn}
			className='cursor-pointer'
		>
			<motion.div
				className='bg-background rounded-xl p-6 shadow-lg border flex items-center justify-center h-24 relative overflow-hidden'
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
				{/* Skeleton shimmer effect */}
				<motion.div
					className='absolute inset-0 bg-gradient-to-r from-gray-200/50 via-gray-300/50 to-gray-200/50'
					animate={{
						x: ['-100%', '100%'],
					}}
					transition={{
						duration: 1.5,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>

				{/* Skeleton logo placeholder */}
				<div className='w-[120px] h-[80px] bg-gray-200 rounded-md animate-pulse relative z-10' />
			</motion.div>
		</motion.div>
	);
};

export default BrandCardSkeleton;
