import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	images: Array<{ url: string }>;
	currentIndex: number;
	onNavigate: (index: number) => void;
	reviewerName: string;
};

const ReviewImageModal = ({
	isOpen,
	onClose,
	images,
	currentIndex,
	onNavigate,
	reviewerName,
}: Props) => {
	const nextImage = () => {
		onNavigate((currentIndex + 1) % images.length);
	};

	const prevImage = () => {
		onNavigate((currentIndex - 1 + images.length) % images.length);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return;

			switch (e.key) {
				case 'Escape':
					onClose();
					break;
				case 'ArrowLeft':
					prevImage();
					break;
				case 'ArrowRight':
					nextImage();
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, currentIndex]);

	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center'
			onClick={onClose}
		>
			<div className='relative w-full h-full flex items-center justify-center p-4'>
				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors'
				>
					✕
				</button>

				{/* Image Counter */}
				<div className='absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
					{currentIndex + 1} / {images.length}
				</div>

				{/* Reviewer Info */}
				<div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm'>
					Photo by {reviewerName}
				</div>

				{/* Navigation Arrows */}
				{images.length > 1 && (
					<>
						<button
							onClick={(e) => {
								e.stopPropagation();
								prevImage();
							}}
							className='absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors'
						>
							<ChevronLeft className='w-6 h-6' />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								nextImage();
							}}
							className='absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors'
						>
							<ChevronRight className='w-6 h-6' />
						</button>
					</>
				)}

				{/* Main Image */}
				<motion.div
					className='relative max-w-2xl max-h-full cursor-pointer'
					onClick={(e) => e.stopPropagation()}
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.3 }}
				>
					<Image
						src={images[currentIndex]?.url}
						alt={'Review image'}
						width={600}
						height={600}
						className='object-contain rounded-lg'
						priority
					/>

					{/* Image Caption */}
					<div className='absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg'>
						<p className='text-sm'>Review image</p>
					</div>
				</motion.div>

				{/* Thumbnail Strip */}
				{images.length > 1 && (
					<div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10'>
						<div className='flex gap-2 bg-black/50 p-2 rounded-lg'>
							{images.map((image, index) => (
								<button
									key={index}
									onClick={(e) => {
										e.stopPropagation();
										onNavigate(index);
									}}
									className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
										index === currentIndex
											? 'border-white ring-2 ring-purple-400'
											: 'border-white/30 hover:border-white/60'
									}`}
								>
									<Image
										src={image.url}
										alt={`Thumbnail ${index + 1}`}
										width={64}
										height={64}
										className='w-full h-full object-cover'
									/>
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default ReviewImageModal;
