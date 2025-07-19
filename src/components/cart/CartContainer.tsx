'use client';

import { AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/cartStore';
import { AlertTriangle, ShoppingCart } from 'lucide-react';
import { useShallow } from 'zustand/shallow';
import { useEffect, useMemo, useState } from 'react';
import { CartItem as CartItemType } from '@/types';
import CartItem from '@/components/cart/CartItem';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CartItemUnavailable from '@/components/cart/CartItemUnavailable';
import CartSummary from '@/components/cart/CartSummary';
import Overlay from '@/components/ui/overlay';

const CartContainer = () => {
	const [totalCartProducts, cartItems, getCartItems, isUpdatingCartItem] =
		useCartStore(
			useShallow((state) => [
				state.totalCartProducts,
				state.cartItems,
				state.getCartItems,
				state.isUpdatingCartItem,
			])
		);
	const [availableItems, setAvailableItems] = useState<CartItemType[]>([]);
	const [unavailableItems, setUnavailableItems] = useState<CartItemType[]>([]);

	useEffect(() => {
		getCartItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useMemo(() => {
		if (!cartItems || cartItems.length === 0) {
			setAvailableItems([]);
			setUnavailableItems([]);
			return;
		}

		const available: CartItemType[] = [];
		const unavailable: CartItemType[] = [];

		cartItems.forEach((item) => {
			// Find the specific variant based on variantId
			const variant = item.product.variants.find((v) => v._id === item.variantId);

			if (variant) {
				// Check if inventory is sufficient for the requested quantity
				const availableInventory = variant.inventory - variant.reservedInventory;
				const isAvailable = availableInventory >= item.quantity;

				if (isAvailable) {
					available.push({
						...item,
						available: true,
						maxQuantity: availableInventory,
					});
				} else {
					unavailable.push({
						...item,
						available: false,
						maxQuantity: availableInventory,
					});
				}
			} else {
				unavailable.push({
					...item,
					available: false,
					maxQuantity: 0,
				});
			}
		});

		setAvailableItems(available);
		setUnavailableItems(unavailable);
	}, [cartItems]);

	return (
		<div className='w-full'>
			{isUpdatingCartItem && <Overlay loading />}
			<div className='mb-8'>
				<div className='flex items-center gap-3 mb-4'>
					<ShoppingCart className='size-8 text-purple-600' />
					<h1 className='text-3xl font-bold text-foreground'>Shopping Cart</h1>
				</div>
				<p className='text-gray-600'>
					{totalCartProducts} {totalCartProducts === 1 ? 'item' : 'items'} in your
					cart
				</p>
			</div>
			{cartItems?.length === 0 ? (
				<div className='text-center py-16'>
					<ShoppingCart className='w-16 h-16 text-gray-300 mx-auto mb-4' />
					<h2 className='text-2xl font-semibold text-gray-900 mb-2'>
						Your cart is empty
					</h2>
					<p className='text-gray-600 mb-6'>Add some items to get started</p>
					<Button className='bg-purple-600 hover:bg-purple-700 text-white'>
						Continue Shopping
					</Button>
				</div>
			) : (
				<div className='grid lg:grid-cols-3 gap-4 lg:gap-8'>
					{/* Cart Items */}
					<div className='lg:col-span-2 space-y-6 lg:space-y-8'>
						{/* Available Items Section */}
						{availableItems.length > 0 && (
							<div>
								<div className='flex items-center gap-2 mb-6'>
									<div className='w-3 h-3 bg-green-500 rounded-full'></div>
									<h2 className='text-xl font-semibold text-gray-900'>
										Available Items ({availableItems.length})
									</h2>
								</div>
								<div className='space-y-6'>
									<AnimatePresence>
										{availableItems.map((item) => (
											<CartItem
												key={item.variantId}
												item={item}
											/>
										))}
									</AnimatePresence>
								</div>
							</div>
						)}

						{/* Unavailable Items Section */}
						{unavailableItems.length > 0 && (
							<div>
								<div className='flex items-center gap-2 mb-4'>
									<AlertTriangle className='w-5 h-5 text-orange-500' />
									<h2 className='text-xl font-semibold text-gray-900'>
										Unavailable Items ({unavailableItems.length})
									</h2>
								</div>

								{/* <Alert className='mb-6 border-orange-200 bg-orange-50'>
									<AlertTriangle className='h-4 w-4 text-orange-600' />
									<AlertDescription className='text-orange-800'>
										These items are currently unavailable and won't be included in your
										order total.
									</AlertDescription>
								</Alert> */}
								<Alert variant='destructive'>
									{/* <AlertTitle>Heads up!</AlertTitle> */}
									<AlertDescription>
										These items are currently unavailable and won&apos;t be included in
										your order total.
									</AlertDescription>
								</Alert>
								<div className='space-y-6'>
									<AnimatePresence>
										{unavailableItems.map((item) => (
											<CartItemUnavailable
												key={item.product._id}
												item={item}
											/>
										))}
									</AnimatePresence>
								</div>
							</div>
						)}
					</div>

					{/* Cart Summary */}
					<CartSummary
						availableItems={availableItems}
						unavailableItems={unavailableItems}
					/>
				</div>
			)}
		</div>
	);
};

export default CartContainer;
