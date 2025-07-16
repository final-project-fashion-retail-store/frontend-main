import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Heart,
	Info,
	Minus,
	Plus,
	RotateCcw,
	Shield,
	ShoppingCart,
	Star,
	Truck,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Product } from '@/types';
import useProductStore from '@/stores/productStore';
import { useShallow } from 'zustand/shallow';
import Overlay from '@/components/ui/overlay';
import { toast } from 'sonner';

type Props = {
	selectedProduct: Product | null;
	getCurrentImages: (color: string) => void;
};

const DetailedProductInfo = ({ selectedProduct, getCurrentImages }: Props) => {
	const [
		isAddingProductToWishlist,
		addProductToWishlist,
		getTotalProductsWishlist,
	] = useProductStore(
		useShallow((state) => [
			state.isAddingProductToWishlist,
			state.addProductToWishlist,
			state.getTotalProductsWishlist,
		])
	);
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedSize, setSelectedSize] = useState('');
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		setSelectedColor(Object.keys(selectedProduct?.colorImages || {})[0] || '');
	}, [selectedProduct]);

	const handleClickColor = (color: string) => {
		setSelectedColor(color);
		setSelectedSize('');
		getCurrentImages(color);
	};

	const handleQuantityChange = (change: number) => {
		const newQuantity = quantity + change;
		if (
			newQuantity >= 1 &&
			(!selectedVariant || newQuantity <= selectedVariant.inventory)
		) {
			setQuantity(newQuantity);
		}
	};

	// Get available colors
	const getAvailableColors = () => {
		const colors = new Set<string>();
		selectedProduct?.variants.forEach((variant) => colors.add(variant.color));
		return Array.from(colors);
	};

	// Get available sizes for selected color
	const getAvailableSizes = () => {
		return selectedProduct?.variants
			.filter((variant) => variant.color === selectedColor)
			.map((variant) => ({
				size: variant.size,
				inventory: variant.inventory,
				inStock: variant.inventory > 0,
			}));
	};

	// Get selected variant
	const getSelectedVariant = () => {
		return selectedProduct?.variants.find(
			(variant) => variant.color === selectedColor && variant.size === selectedSize
		);
	};

	const availableColors = getAvailableColors();
	const availableSizes = getAvailableSizes();
	const selectedVariant = getSelectedVariant();
	const isInStock = selectedVariant ? selectedVariant.inventory > 0 : false;
	const discount = selectedProduct?.salePrice
		? Math.round(
				((selectedProduct.price - selectedProduct.salePrice) /
					selectedProduct.price) *
					100
		  )
		: 0;

	const handleClickWishlist = async () => {
		const result = await addProductToWishlist(selectedProduct?._id || '');

		if (result.success) {
			toast.success(result.message);
			await getTotalProductsWishlist();
		} else {
			toast.error(result.message);
		}
	};

	return (
		<div className='space-y-6'>
			{/* Brand & Title */}
			{isAddingProductToWishlist && <Overlay loading />}
			<div className='space-y-2'>
				<div className='flex items-center gap-3'>
					{selectedProduct && (
						<Image
							src={selectedProduct.brand.logo.url || ''}
							alt={selectedProduct.brand.name || 'Brand Logo'}
							width={32}
							height={32}
							className='object-contain w-8 h-8'
						/>
					)}
					<span className='text-purple-600 font-semibold'>
						{selectedProduct?.brand.name}
					</span>
				</div>
				<h1 className='text-3xl font-bold text-foreground'>
					{selectedProduct?.name}
				</h1>
				<p className='text-muted-foreground text-lg'>
					{selectedProduct?.shortDescription}
				</p>
			</div>

			{/* Rating & Reviews */}
			<div className='flex items-center gap-4'>
				<div className='flex items-center gap-2'>
					<div className='flex'>
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`w-5 h-5 ${
									i < Math.floor(selectedProduct?.averageRating || 0)
										? 'text-yellow-400 fill-current'
										: 'text-muted-foreground/50'
								}`}
							/>
						))}
					</div>
					<span className='font-semibold'>{selectedProduct?.averageRating}</span>
					<span className='text-muted-foreground'>
						({selectedProduct?.totalReviews} reviews)
					</span>
				</div>
				<Badge
					variant='secondary'
					className='bg-green-100 text-green-700'
				>
					<Users className='w-3 h-3 mr-1' />
					{selectedProduct?.totalReviews}+ customers
				</Badge>
			</div>

			{/* Price */}
			<div className='space-y-2'>
				<div className='flex items-center gap-3'>
					<span className='text-3xl font-bold text-purple-600'>
						${selectedProduct?.salePrice || selectedProduct?.price}
					</span>
					{selectedProduct?.salePrice &&
						selectedProduct?.salePrice < selectedProduct?.price && (
							<span className='text-xl text-muted-foreground line-through'>
								${selectedProduct?.price}
							</span>
						)}
					{discount > 0 && (
						<Badge className='bg-red-100 text-red-700'>
							Save $
							{(
								(selectedProduct?.price || 0) - (selectedProduct?.salePrice || 0)
							).toFixed(2)}
						</Badge>
					)}
				</div>
				<p className='text-sm text-muted-foreground'>
					Tax included. Shipping calculated at checkout.
				</p>
			</div>

			{/* Color Selection */}
			<div className='space-y-3'>
				<div className='flex items-center gap-2'>
					<span className='font-medium'>Color:</span>
					<span className='text-muted-foreground'>{selectedColor}</span>
				</div>
				<div className='flex gap-3'>
					{availableColors.map((color) => (
						<motion.button
							key={color}
							onClick={() => handleClickColor(color)}
							className={`w-12 h-12 rounded-full border-2 transition-all ${
								selectedColor === color
									? 'border-purple-600 ring-2 ring-purple-200'
									: 'border-muted-foreground/30 hover:border-muted-foreground'
							}`}
							style={{ backgroundColor: color.toLowerCase() }}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							title={color}
						/>
					))}
				</div>
			</div>

			{/* Size Selection */}
			<div className='space-y-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<span className='font-medium'>Size:</span>
						{selectedSize && (
							<span className='text-muted-foreground'>{selectedSize}</span>
						)}
					</div>
					<Button
						variant='ghost'
						size='sm'
						className='text-purple-600 hover:text-purple-700'
					>
						<Info className='w-4 h-4 mr-1' />
						Size Guide
					</Button>
				</div>
				<div className='grid grid-cols-3 gap-3'>
					{availableSizes?.map(({ size, inventory, inStock }) => (
						<motion.button
							key={size}
							onClick={() => inStock && setSelectedSize(size)}
							disabled={!inStock}
							className={`py-3 px-4 border rounded-lg font-medium transition-all ${
								selectedSize === size
									? 'border-purple-600 bg-purple-50 text-purple-600'
									: inStock
									? 'border-muted-foreground/30 hover:border-muted-foreground/50 text-foreground'
									: 'border-muted-foreground/20 text-muted-foreground cursor-not-allowed bg-muted-foreground/10'
							}`}
							whileHover={inStock ? { scale: 1.05 } : {}}
							whileTap={inStock ? { scale: 0.95 } : {}}
						>
							{size}
							{!inStock && (
								<div className='text-xs text-destructive mt-1'>Out of Stock</div>
							)}
							{inStock && inventory <= 5 && (
								<div className='text-xs text-orange-500 mt-1'>
									Only {inventory} left
								</div>
							)}
						</motion.button>
					))}
				</div>
			</div>

			{/* Quantity & Add to Cart */}
			<div className='space-y-4'>
				<div className='flex items-center gap-4'>
					<span className='font-medium'>Quantity:</span>
					<div className='flex items-center border border-muted-foreground/30 rounded-lg'>
						<button
							onClick={() => handleQuantityChange(-1)}
							disabled={quantity <= 1}
							className='p-2 hover:bg-muted-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							<Minus className='w-4 h-4' />
						</button>
						<span className='px-4 py-2 font-medium'>{quantity}</span>
						<button
							onClick={() => handleQuantityChange(1)}
							disabled={!selectedVariant || quantity >= selectedVariant.inventory}
							className='p-2 hover:bg-muted-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							<Plus className='w-4 h-4' />
						</button>
					</div>
					{selectedVariant && (
						<span className='text-sm text-muted-foreground'>
							{selectedVariant.inventory} available
						</span>
					)}
				</div>

				<div className='flex gap-3'>
					<motion.div
						className='flex-1'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<Button
							disabled={!selectedSize || !isInStock}
							className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold'
						>
							<ShoppingCart className='w-5 h-5 mr-2' />
							{!selectedSize
								? 'Select Size'
								: !isInStock
								? 'Out of Stock'
								: 'Add to Cart'}
						</Button>
					</motion.div>
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Button
							variant='outline'
							size='lg'
							className='px-6 py-6'
							onClick={handleClickWishlist}
						>
							<Heart className='size-5' />
						</Button>
					</motion.div>
					{/* <motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Button
							variant='outline'
							size='lg'
							className='px-6 py-6 bg-transparent'
						>
							<Share2 className='w-5 h-5' />
						</Button>
					</motion.div> */}
				</div>
			</div>

			{/* Features */}
			<div className='grid grid-cols-3 gap-4 pt-6 border-t'>
				<div className='text-center space-y-2'>
					<Truck className='w-6 h-6 mx-auto text-purple-600' />
					<div className='text-sm'>
						<div className='font-medium'>Free Shipping</div>
						<div className='text-muted-foreground'>On orders $75+</div>
					</div>
				</div>
				<div className='text-center space-y-2'>
					<RotateCcw className='w-6 h-6 mx-auto text-purple-600' />
					<div className='text-sm'>
						<div className='font-medium'>Easy Returns</div>
						<div className='text-muted-foreground'>30-day policy</div>
					</div>
				</div>
				<div className='text-center space-y-2'>
					<Shield className='w-6 h-6 mx-auto text-purple-600' />
					<div className='text-sm'>
						<div className='font-medium'>Secure Payment</div>
						<div className='text-muted-foreground'>SSL protected</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailedProductInfo;
