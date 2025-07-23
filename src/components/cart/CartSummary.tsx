import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import calculateOrderTotals from '@/lib/calculateOrderTotals';
import { CartItem } from '@/types';
import {
	ArrowRight,
	RotateCcw,
	Shield,
	ShoppingCart,
	Truck,
} from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react';

type Props = {
	availableItems: CartItem[];
	unavailableItems: CartItem[];
};

const CartSummary = ({ availableItems, unavailableItems }: Props) => {
	const { subtotal, savings, shipping, tax, total } = useMemo(() => {
		return calculateOrderTotals(availableItems);
	}, [availableItems]);

	const isCheckingOut = false; // Placeholder for checkout state

	return (
		<div className='lg:col-span-1 order-first lg:order-last'>
			<div className='lg:sticky lg:top-24 space-y-4 lg:space-y-6'>
				{/* Order Summary */}
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<ShoppingCart className='w-5 h-5 text-purple-600' />
							Order Summary
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex justify-between'>
							<span>Subtotal ({availableItems.length} items)</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						{savings > 0 && (
							<div className='flex justify-between text-green-600'>
								<span>Savings</span>
								<span>-${savings.toFixed(2)}</span>
							</div>
						)}
						{/* {appliedPromo && (
							<div className='flex justify-between text-green-600'>
								<span>Promo ({appliedPromo})</span>
								<span>-${promoDiscount.toFixed(2)}</span>
							</div>
						)} */}
						<div className='flex justify-between'>
							<span>Shipping</span>
							<span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
						</div>
						<div className='flex justify-between'>
							<span>Tax</span>
							<span>${tax.toFixed(2)}</span>
						</div>
						<Separator />
						<div className='flex justify-between text-lg font-bold'>
							<span>Total</span>
							<span className='text-purple-600'>${total.toFixed(2)}</span>
						</div>
						{unavailableItems.length > 0 && (
							<p className='text-xs text-gray-600'>
								* {unavailableItems.length} unavailable{' '}
								{unavailableItems.length === 1 ? 'item' : 'items'} not included
							</p>
						)}
					</CardContent>
				</Card>

				{/* Promo Code */}
				{/* <Card>
					<CardContent className='p-4'>
						<div className='flex items-center gap-2 mb-3'>
							<Tag className='w-4 h-4 text-purple-600' />
							<span className='font-medium'>Promo Code</span>
						</div>
						<div className='flex gap-2'>
							<Input
								placeholder='Enter code'
								value={promoCode}
								onChange={(e) => setPromoCode(e.target.value)}
								className='flex-1'
							/>
							<Button
								onClick={applyPromoCode}
								variant='outline'
								className='bg-transparent'
							>
								Apply
							</Button>
						</div>
						{appliedPromo && (
							<div className='mt-2 text-sm text-green-600'>
								✓ Code applied successfully!
							</div>
						)}
					</CardContent>
				</Card> */}

				{/* Checkout Button */}
				<Button
					asChild
					disabled={isCheckingOut || availableItems.length === 0}
					className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold disabled:opacity-50'
				>
					<Link href={'/payment'}>
						Proceed to Checkout
						<ArrowRight className='w-5 h-5 ml-2' />
					</Link>
				</Button>

				{/* Features */}
				<div className='grid grid-cols-1 gap-3 text-sm'>
					<div className='flex items-center gap-2 text-gray-600'>
						<Truck className='w-4 h-4 text-purple-600' />
						<span>Free shipping on orders $75+</span>
					</div>
					<div className='flex items-center gap-2 text-gray-600'>
						<RotateCcw className='w-4 h-4 text-purple-600' />
						<span>30-day easy returns</span>
					</div>
					<div className='flex items-center gap-2 text-gray-600'>
						<Shield className='w-4 h-4 text-purple-600' />
						<span>Secure checkout</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartSummary;
