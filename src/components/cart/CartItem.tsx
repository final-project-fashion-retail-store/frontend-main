import EditItem from '@/components/cart/EditItem';
import DialogCustom from '@/components/custom/dialog-custom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Overlay from '@/components/ui/overlay';
import useCartStore from '@/stores/cartStore';
import { CartItem as CartItemType } from '@/types';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

type Props = {
	item: CartItemType;
};

const getProductImage = (item: CartItemType) => {
	const variantId = item.variantId;
	const variantColor = item.product.variants.find(
		(v) => v._id === variantId
	)?.color;

	const imageUrl = item.product.colorImages[variantColor || ''] || [];

	return variantColor && imageUrl.length > 0 ? imageUrl[0].url : '';
};

const getSize = (item: CartItemType) => {
	const variantId = item.variantId;

	// get color
	const variant = item.product.variants.find((v) => v._id === variantId);
	return variant ? variant.size : '';
};

const getColor = (item: CartItemType) => {
	const variantId = item.variantId;
	const variant = item.product.variants.find((v) => v._id === variantId);
	return variant ? variant.color : '';
};

const CartItem = ({ item }: Props) => {
	const [
		isRemovingProductFromCart,
		isUpdatingCartItem,
		removeProductFromCart,
		getTotalCartProducts,
		updateCartItem,
	] = useCartStore(
		useShallow((state) => [
			state.isRemovingProductFromCart,
			state.isUpdatingCartItem,
			state.removeProductFromCart,
			state.getTotalCartProducts,
			state.updateCartItem,
		])
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleClickRemoveFromCart = async () => {
		if (isRemovingProductFromCart || isLoading) return;

		setIsLoading(true);
		const result = await removeProductFromCart(item.product._id, item.variantId);
		if (result.success) {
			await getTotalCartProducts();
			console.log('Product removed from cart successfully');
		} else {
			console.error(result.message);
		}
		setIsLoading(false);
	};

	const handleClickChangeQuantity = async (newQuantity: number) => {
		if (isUpdatingCartItem && isLoading) return;

		setIsLoading(true);
		const result = await updateCartItem(
			item.product._id,
			item.variantId,
			newQuantity
		);
		if (result.success) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
		setIsLoading(false);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.3 }}
		>
			{(isRemovingProductFromCart || isUpdatingCartItem) && isLoading && (
				<Overlay loading />
			)}
			<Card className='overflow-hidden hover:shadow-lg transition-shadow'>
				<CardContent className='p-6'>
					<div className='flex flex-col gap-4 md:flex-row md:gap-6'>
						{/* Product Image */}
						<Link href={`/product/${item.product.slug}`}>
							<div className='w-full md:w-32 h-48 md:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group'>
								<Image
									src={getProductImage(item)}
									alt={item.product.name}
									width={250}
									height={250}
									className='w-full h-full object-cover max-md:object-contain group-hover:scale-105 transition-transform'
								/>
							</div>
						</Link>

						{/* Product Details */}
						<div className='flex-1 space-y-3 md:space-y-4'>
							<div className='flex justify-between items-start'>
								<div className='flex-1 pr-2'>
									<Badge
										variant='secondary'
										className='text-purple-600 mb-2 text-xs'
									>
										{item.product.brand.name}
									</Badge>
									<Link href={`/product/${item.product.slug}`}>
										<h3 className='text-base md:text-lg font-semibold text-foreground hover:text-purple-600 cursor-pointer line-clamp-2'>
											{item.product.name}
										</h3>
									</Link>
								</div>
								<Button
									variant='ghost'
									size='icon'
									onClick={handleClickRemoveFromCart}
									className='text-muted-foreground hover:text-red-500 flex-shrink-0'
								>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>

							{/* Price */}
							<div className='flex items-center gap-2 md:gap-3'>
								<span className='text-lg md:text-xl font-bold text-purple-600'>
									${item.product.salePrice}
								</span>
								{item.product.salePrice < item.product.price && (
									<span className='text-base md:text-lg text-muted-foreground line-through'>
										${item.product.price}
									</span>
								)}
							</div>

							{/* Color Selection */}
							<div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
								<span className='text-sm font-medium text-muted-foreground'>
									Color:
								</span>
								<button
									onClick={() => setIsOpen(true)}
									className='flex items-center gap-2 px-3 py-2 border border-muted-foreground/30 rounded-lg hover:border-purple-500 transition-colors text-left'
								>
									<div
										className='w-4 h-4 rounded-full border border-muted-foreground/30'
										style={{
											backgroundColor: getColor(item).toLowerCase(),
										}}
									/>
									<span className='text-sm'>{getColor(item)}</span>
									<span className='text-xs text-muted-foreground/50 ml-auto'>
										Change
									</span>
								</button>
							</div>

							{/* Size Selection */}
							<div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
								<span className='text-sm font-medium text-muted-foreground'>Size:</span>
								<button
									onClick={() => setIsOpen(true)}
									className='flex items-center gap-2 px-3 py-2 border border-muted-foreground/30 rounded-lg hover:border-purple-500 transition-colors text-left w-fit'
								>
									<span className='text-sm font-medium'>{getSize(item)}</span>
									<span className='text-xs text-muted-foreground/50'>Change</span>
								</button>
							</div>

							{/* Quantity and Total */}
							<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t'>
								<div className='flex items-center gap-3'>
									<span className='text-sm font-medium text-muted-foreground'>Qty:</span>
									<div className='flex items-center border border-muted-foreground/30 rounded-lg'>
										<button
											onClick={() =>
												handleClickChangeQuantity(Math.max(item.quantity - 1, 1))
											}
											disabled={item.quantity <= 1}
											className='p-2 hover:bg-muted-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed'
										>
											<Minus className='w-3 h-3 md:w-4 md:h-4' />
										</button>
										<span className='px-3 md:px-4 py-2 font-medium text-sm md:text-base'>
											{item.quantity}
										</span>
										<button
											onClick={() =>
												handleClickChangeQuantity(
													Math.min(item.quantity + 1, item.maxQuantity)
												)
											}
											disabled={item.quantity >= item?.maxQuantity}
											className='p-2 hover:bg-muted-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed'
										>
											<Plus className='w-3 h-3 md:w-4 md:h-4' />
										</button>
									</div>
									{item.quantity >= item.maxQuantity && (
										<span className='text-xs text-orange-600'>Max reached</span>
									)}
								</div>
								<div className='text-left sm:text-right'>
									<div className='text-base md:text-lg font-bold text-foreground'>
										$
										{(
											(item.product.salePrice || item.product.price) * item.quantity
										).toFixed(2)}
									</div>
									{item.product.salePrice < item.product.price && (
										<div className='text-xs md:text-sm text-green-600'>
											Save $
											{(
												(item.product.price - item.product.salePrice) *
												item.quantity
											).toFixed(2)}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<DialogCustom
				isOpen={isOpen}
				setIsOpenChange={setIsOpen}
				dialogTitle={
					<>
						<div className='w-12 h-12 bg-muted-foreground/10 rounded-lg overflow-hidden flex-shrink-0'>
							<Image
								src={getProductImage(item)}
								alt={item.product.name}
								width={48}
								height={48}
								className='w-full h-full object-cover'
							/>
						</div>
						<div>
							<div className='text-sm text-start text-purple-600 font-medium'>
								{item.product.brand.name}
							</div>
							<div className='text-base font-semibold line-clamp-2'>
								{item.product.name}
							</div>
						</div>
					</>
				}
				body={
					<EditItem
						item={item}
						getColor={getColor}
						getSize={getSize}
						setIsOpen={setIsOpen}
					/>
				}
			/>
		</motion.div>
	);
};

export default CartItem;
