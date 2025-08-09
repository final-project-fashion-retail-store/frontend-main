import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

type Props = {
	category: {
		name: string;
		icon: React.ReactNode;
		count: string;
	};
};

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: 'easeOut' },
};

const CategoryCard = ({ category }: Props) => {
	return (
		<motion.div
			key={category.name}
			variants={fadeInUp}
			whileHover={{
				y: -15,
				scale: 1.05,
				transition: { duration: 0.3 },
			}}
			className='cursor-pointer'
		>
			<Card className='border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-purple-50 dark:bg-accent overflow-hidden'>
				<CardContent className='p-8 text-center'>
					<motion.div
						className='text-6xl mb-4'
						whileHover={{
							scale: 1.1,
							rotate: [0, -10, 10, 0],
							transition: { duration: 0.5 },
						}}
					>
						{category.icon}
					</motion.div>
					<h3 className='text-xl font-bold mb-2 text-black dark:text-foreground'>
						{category.name}
					</h3>
					<p className='text-muted-foreground'>{category.count}</p>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default CategoryCard;
