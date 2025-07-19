import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Overlay from '@/components/ui/overlay';
import useProductStore from '@/stores/productStore';
import { Product, RelatedProduct } from '@/types';
import { Heart, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

type Props = {
	product: Product | RelatedProduct;
	wishlist?: boolean;
};

const ProductCard = ({ product, wishlist = false }: Props) => {
	const [
		isAddingProductToWishlist,
		isRemovingProductFromWishlist,
		addProductToWishlist,
		removeProductFromWishlist,
		getTotalProductsWishlist,
	] = useProductStore(
		useShallow((state) => [
			state.isAddingProductToWishlist,
			state.isRemovingProductFromWishlist,
			state.addProductToWishlist,
			state.removeProductFromWishlist,
			state.getTotalProductsWishlist,
		])
	);
	const [isHovered, setIsHovered] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	// Get the appropriate image based on hover state
	const currentImage =
		isHovered && product.images[1]
			? product.images[1].url
			: product.images[0].url;

	const handleClickCard = () => {
		router.push(`/product/${product.slug}`);
	};

	const handleClickWishlist = async (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsLoading(true);
		const result = await addProductToWishlist(product._id);
		if (result.success) {
			toast.success(result.message);
			await getTotalProductsWishlist();
		} else {
			toast.error(result.message);
		}
		setIsLoading(false);
	};

	const handleClickRemoveWishlist = async (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsLoading(true);
		const result = await removeProductFromWishlist(product._id);
		if (result.success) {
			toast.success(result.message);
			await getTotalProductsWishlist();
		} else {
			toast.error(result.message);
		}
		setIsLoading(false);
	};

	return (
		<Card
			className='group hover:shadow-lg transition-shadow duration-300 overflow-hidden p-0 gap-0 cursor-pointer flex flex-col h-full'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleClickCard}
		>
			{(isAddingProductToWishlist || isRemovingProductFromWishlist) &&
				isLoading && <Overlay loading />}
			<div className='relative'>
				<Image
					src={currentImage || ''}
					alt={product.name}
					width={300}
					height={400}
					priority
					className='w-full h-48 sm:h-72 md:h-80 lg:h-90 object-cover group-hover:scale-105 transition-transform duration-300'
				/>

				{/* Badges */}
				<div className='absolute top-3 left-3 flex flex-col gap-1'>
					{!product.inStock && (
						<Badge
							variant='secondary'
							className='bg-muted-foreground text-white text-xs'
						>
							Out of Stock
						</Badge>
					)}
				</div>

				{/* Action buttons */}
				<div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
					{!wishlist ? (
						<Button
							size='sm'
							variant='secondary'
							className='w-8 h-8 p-0 rounded-full'
							onClick={handleClickWishlist}
						>
							<Heart className='w-4 h-4' />
						</Button>
					) : (
						<Button
							size='sm'
							variant='secondary'
							className='w-8 h-8 p-0 rounded-full'
							onClick={handleClickRemoveWishlist}
						>
							<X className='w-4 h-4' />
						</Button>
					)}
				</div>
			</div>

			<CardContent className='p-2 sm:p-4 flex-1 flex flex-col'>
				<div className='space-y-1 sm:space-y-2 flex-1'>
					<p className='text-xs sm:text-sm text-purple-600 font-medium'>
						{Array.isArray(product.brand)
							? product.brand[0]?.name
							: product.brand.name}
					</p>
					<h3 className='font-semibold text-sm sm:text-base leading-tight line-clamp-2'>
						{product.name}
					</h3>

					{/* Rating - Smaller on mobile */}
					<div className='flex items-center gap-1 text-xs sm:text-sm'>
						<div className='flex items-center'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-3 h-3 sm:w-4 sm:h-4 ${
										i < Math.floor(product.averageRating)
											? 'text-yellow-400 fill-current'
											: 'text-gray-300'
									}`}
								/>
							))}
						</div>
						<span className='text-gray-600 hidden sm:inline'>
							({product.totalReviews})
						</span>
					</div>

					{/* Price - Smaller on mobile */}
					<div className='flex items-center gap-1 sm:gap-2'>
						<span className='text-base sm:text-xl font-bold text-purple-600'>
							${product.salePrice}
						</span>
						{product.price > product.salePrice && (
							<span className='text-xs sm:text-sm text-gray-500 line-through'>
								${product.price}
							</span>
						)}
					</div>

					{/* Colors - Hide on mobile */}
					<div className='hidden sm:flex items-center gap-1 mt-auto'>
						{'colorImages' in product &&
							Object.keys(product.colorImages).map((color) => (
								<div
									key={color}
									className='w-4 h-4 rounded-full border border-gray-300'
									style={{ backgroundColor: color.toLowerCase() }}
									title={color}
								/>
							))}
						{'colorImages' in product &&
							Object.keys(product.colorImages).length > 4 && (
								<span className='text-xs text-gray-500'>
									+{Object.keys(product.colorImages).length - 4}
								</span>
							)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
