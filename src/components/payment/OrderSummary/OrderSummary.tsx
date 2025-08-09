import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import calculateOrderTotals from '@/lib/calculateOrderTotals';
import classifyCartItems from '@/lib/classifyCartItems';
import { CartItem } from '@/types';
import { Check, Shield, ShoppingCart, Truck } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';

type Props = {
	cartItems: CartItem[];
	getTotalPrice: (total: number) => void;
};

const findVariant = (item: CartItem, variantId: string) => {
	return item.product.variants.find((v) => v._id === variantId);
};

const OrderSummary = ({ cartItems, getTotalPrice }: Props) => {
	const { availableItems } = useMemo(() => {
		if (!cartItems || cartItems.length === 0) {
			return { availableItems: [], unavailableItems: [] };
		}

		const { availableItems: available, unavailableItems: unavailable } =
			classifyCartItems(cartItems);

		// For now, assuming all items are available
		return { availableItems: available, unavailableItems: unavailable };
	}, [cartItems]);

	const { subtotal, savings, shipping, tax, total } = useMemo(() => {
		return calculateOrderTotals(availableItems);
	}, [availableItems]);

	useEffect(() => {
		getTotalPrice(total);
	}, [total, getTotalPrice]);

	return (
		<div className='lg:sticky lg:top-24 h-fit'>
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<ShoppingCart className='w-5 h-5 text-purple-600' />
						Order Summary
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					{/* Order Items */}
					<div className='space-y-4'>
						{availableItems.map((item) => (
							<div
								key={item.variantId}
								className='flex gap-4'
							>
								<div className='relative w-16 h-16 bg-muted-foreground/10 rounded-lg flex-shrink-0'>
									<Image
										src={item.product.images[0].url}
										alt={item.product.name}
										width={64}
										height={64}
										className='w-full h-full object-cover rounded-lg'
									/>
									<Badge className='absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center'>
										{item.quantity}
									</Badge>
								</div>
								<div className='flex-1 min-w-0'>
									<Badge
										variant='secondary'
										className='text-purple-600 mb-1 text-xs'
									>
										{item.product.brand.name}
									</Badge>
									<h4 className='font-medium text-sm text-foreground line-clamp-2 mb-1'>
										{item.product.name}
									</h4>
									<div className='flex items-center gap-2 text-xs text-muted-foreground'>
										<span>{findVariant(item, item.variantId)?.color}</span>
										<span>•</span>
										<span>{findVariant(item, item.variantId)?.size}</span>
									</div>
								</div>
								<div className='text-right'>
									<div className='font-semibold text-foreground'>
										$
										{(
											(findVariant(item, item.variantId)?.salePrice || 0) * item.quantity
										).toFixed(2)}
									</div>
									{(() => {
										const variant = findVariant(item, item.variantId);
										return (
											variant?.salePrice &&
											variant?.price &&
											variant.salePrice < variant.price && (
												<div className='text-xs text-muted-foreground line-through'>
													${(variant.price * item.quantity).toFixed(2)}
												</div>
											)
										);
									})()}
								</div>
							</div>
						))}
					</div>

					<Separator />

					{/* Order Totals */}
					<div className='space-y-3'>
						<div className='flex justify-between'>
							<span>Subtotal</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						{savings > 0 && (
							<div className='flex justify-between text-green-600'>
								<span>Savings</span>
								<span>-${savings.toFixed(2)}</span>
							</div>
						)}
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
					</div>

					{/* Security Features */}
					<div className='bg-muted-foreground/10 rounded-lg p-4 space-y-2'>
						<div className='flex items-center gap-2 text-sm text-muted-foreground'>
							<Shield className='w-4 h-4 text-green-600' />
							<span>SSL encrypted checkout</span>
						</div>
						<div className='flex items-center gap-2 text-sm text-muted-foreground'>
							<Truck className='w-4 h-4 text-green-600' />
							<span>Free shipping on orders $75+</span>
						</div>
						<div className='flex items-center gap-2 text-sm text-muted-foreground'>
							<Check className='w-4 h-4 text-green-600' />
							<span>30-day return policy</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default OrderSummary;
