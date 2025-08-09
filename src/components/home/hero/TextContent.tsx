import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const TextContent = () => {
	const [displayedTitle, setDisplayedTitle] = useState('');
	const [titleComplete, setTitleComplete] = useState(false);
	const [displayedDescription, setDisplayedDescription] = useState('');
	const [descriptionComplete, setDescriptionComplete] = useState(false);

	useEffect(() => {
		const titleText = 'Fashion\nRedefined';
		let titleIndex = 0;

		const titleTimer = setInterval(() => {
			if (titleIndex <= titleText.length) {
				const currentText = titleText.slice(0, titleIndex);
				setDisplayedTitle(currentText);
				titleIndex++;
			} else {
				clearInterval(titleTimer);
				setTimeout(() => setTitleComplete(true), 500);
			}
		}, 120);

		return () => clearInterval(titleTimer);
	}, []);

	useEffect(() => {
		if (titleComplete) {
			const descriptionText =
				'Discover the latest trends in streetwear and premium fashion. From iconic sneakers to statement pieces that define your style.';
			let descIndex = 0;

			const descTimer = setInterval(() => {
				if (descIndex <= descriptionText.length) {
					setDisplayedDescription(descriptionText.slice(0, descIndex));
					descIndex++;
				} else {
					clearInterval(descTimer);
					setDescriptionComplete(true);
				}
			}, 40);

			return () => clearInterval(descTimer);
		}
	}, [titleComplete]);

	return (
		<div className='space-y-8'>
			<div className='space-y-4'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
				>
					<Badge
						variant='secondary'
						className='bg-purple-100 text-purple-700 hover:bg-purple-200'
					>
						<Zap className='w-3 h-3 mr-1' />
						New Collection
					</Badge>
				</motion.div>

				<motion.h1
					className='text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.8 }}
				>
					{displayedTitle.split('\n').map((line, index) => (
						<div
							key={index}
							className={index > 0 ? 'mt-2' : ''}
						>
							{line}
							{/* Show cursor only on the last line and only while typing */}
							{index === displayedTitle.split('\n').length - 1 &&
								displayedTitle.length > 0 &&
								!titleComplete && (
									<motion.span
										className='inline-block w-1 h-16 lg:h-20 bg-purple-600 ml-2 align-top'
										animate={{ opacity: [0, 1, 0] }}
										transition={{
											duration: 0.8,
											repeat: Number.POSITIVE_INFINITY,
											ease: 'easeInOut',
										}}
									/>
								)}
						</div>
					))}
				</motion.h1>

				<motion.div
					className='min-h-[100px]'
					initial={{ opacity: 0 }}
					animate={{ opacity: titleComplete ? 1 : 0 }}
					transition={{ duration: 0.5 }}
				>
					<p className='text-xl max-sm:text-lg text-muted-foreground leading-relaxed'>
						<span>{displayedDescription}</span>
						{titleComplete &&
							displayedDescription.length > 0 &&
							!descriptionComplete && (
								<motion.span
									className='inline-block w-0.5 h-6 bg-muted-foreground ml-1 align-middle'
									animate={{ opacity: [0, 1, 0] }}
									transition={{
										duration: 0.8,
										repeat: Number.POSITIVE_INFINITY,
										ease: 'easeInOut',
									}}
								/>
							)}
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default TextContent;
