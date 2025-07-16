import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type Props = {
	selectedImage: number;
	currentImages: {
		url: string;
	}[];
	selectedProduct: Product | null;
	setModalImageIndex: React.Dispatch<React.SetStateAction<number>>;
	setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
};

const DetailedProductImages = ({
	selectedImage,
	currentImages,
	selectedProduct,
	setModalImageIndex,
	setShowImageModal,
	setSelectedImage,
}: Props) => {
	const nextImage = () => {
		setSelectedImage((prev) => (prev + 1) % currentImages.length);
	};

	const prevImage = () => {
		setSelectedImage(
			(prev) => (prev - 1 + currentImages.length) % currentImages.length
		);
	};

	if (!selectedProduct || !currentImages.length) {
		return null;
	}

	return (
		<div className='space-y-4'>
			{/* Main Image */}
			<motion.div
				className='relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in'
				onClick={() => {
					setModalImageIndex(selectedImage);
					setShowImageModal(true);
				}}
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.3 }}
			>
				<AnimatePresence mode='wait'>
					<motion.div
						key={`${selectedImage}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='w-full h-full relative'
					>
						<Image
							src={currentImages[selectedImage].url}
							alt={selectedProduct.name}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className='object-cover'
							priority
						/>
					</motion.div>
				</AnimatePresence>

				{/* Navigation Arrows */}
				{currentImages.length > 1 && (
					<>
						<button
							onClick={(e) => {
								e.stopPropagation();
								prevImage();
							}}
							className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
						>
							<ChevronLeft className='w-5 h-5' />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								nextImage();
							}}
							className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
						>
							<ChevronRight className='w-5 h-5' />
						</button>
					</>
				)}
			</motion.div>
			{/* Thumbnail Images */}
			{currentImages.length > 0 && (
				<Carousel
					className='w-full max-sm:hidden'
					opts={{ loop: true }}
				>
					<CarouselContent className='-ml-2'>
						{currentImages.map((image, index) => (
							<CarouselItem
								key={index}
								className='pl-2 basis-1/4'
							>
								<motion.div
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
										selectedImage === index
											? 'border-purple-600 ring-2 ring-purple-200'
											: 'border-muted-foreground/20 hover:border-muted-foreground/50'
									}`}
									// whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Image
										src={image.url}
										alt={`${selectedProduct?.name} view ${index + 1}`}
										width={100}
										height={100}
										className='w-full h-full object-cover'
									/>
								</motion.div>
							</CarouselItem>
						))}
					</CarouselContent>
					{/* <CarouselPrevious />
					<CarouselNext /> */}
				</Carousel>
			)}
			{currentImages.length > 0 && (
				<div className='sm:hidden grid grid-cols-4 gap-3'>
					{currentImages.map((image, index) => (
						<motion.button
							key={index}
							onClick={() => setSelectedImage(index)}
							className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
								selectedImage === index
									? 'border-purple-600 ring-2 ring-purple-200'
									: 'border-muted-foreground/20 hover:border-muted-foreground/50'
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Image
								src={image.url}
								alt={`${selectedProduct?.name} view ${index + 1}`}
								width={100}
								height={100}
								className='w-full h-full object-cover'
							/>
						</motion.button>
					))}
				</div>
			)}
		</div>
	);
};

export default DetailedProductImages;
