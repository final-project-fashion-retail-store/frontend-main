import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ImageZoomModal = ({
	isOpen,
	onClose,
	images,
	currentIndex,
	onNavigate,
	productName,
}: {
	isOpen: boolean;
	onClose: () => void;
	images: Array<{ url: string; public_id: string }>;
	currentIndex: number;
	onNavigate: (index: number) => void;
	productName: string;
}) => {
	const [isZoomed, setIsZoomed] = useState(false);
	const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isZoomed) return;

		const rect = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;

		setZoomPosition({
			x: Math.max(0, Math.min(100, x)),
			y: Math.max(0, Math.min(100, y)),
		});
	};

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
				case ' ':
					e.preventDefault();
					setIsZoomed(!isZoomed);
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, isZoomed, currentIndex]);

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

				{/* Zoom Instructions */}
				<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm'>
					{isZoomed
						? 'Move mouse to pan • Click to zoom out'
						: 'Click to zoom in • Use arrow keys to navigate'}
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
					className={`relative max-w-4xl max-h-full ${
						isZoomed ? 'cursor-move' : 'cursor-zoom-in'
					}`}
					onClick={(e) => {
						e.stopPropagation();
						setIsZoomed(!isZoomed);
					}}
					onMouseMove={handleMouseMove}
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.3 }}
				>
					<Image
						src={images[currentIndex]?.url || '/placeholder.svg'}
						alt={`${productName} - Image ${currentIndex + 1}`}
						width={800}
						height={800}
						className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
							isZoomed ? 'scale-200' : 'scale-100'
						}`}
						style={
							isZoomed
								? {
										transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
										transform: 'scale(2)',
								  }
								: {}
						}
						priority
					/>
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
										src={image.url || '/placeholder.svg'}
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

export default ImageZoomModal;
