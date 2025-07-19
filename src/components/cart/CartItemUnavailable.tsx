import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types';
import { motion } from 'framer-motion';
import { Heart, Trash2, X } from 'lucide-react';
import Image from 'next/image';

type Props = {
	item: CartItem;
};

const CartItemUnavailable = ({ item }: Props) => {
	return (
		<motion.div
			key={item.product._id}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.3 }}
		>
			<Card className='overflow-hidden border-orange-200 bg-gray-50/50'>
				<CardContent className='p-6'>
					<div className='flex flex-col md:flex-row gap-6'>
						{/* Product Image */}
						<div className='relative w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0'>
							<Image
								src={item.product.images[0].url}
								alt={item.product.name}
								width={128}
								height={128}
								className='w-full h-full object-cover opacity-60'
							/>
							<div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
								<Badge
									variant='destructive'
									className='bg-orange-500'
								>
									Out of Stock
								</Badge>
							</div>
						</div>

						{/* Product Details */}
						<div className='flex-1 space-y-4'>
							<div className='flex justify-between items-start'>
								<div>
									<Badge
										variant='secondary'
										className='text-purple-600 mb-2 opacity-60'
									>
										{item.product.brand.name}
									</Badge>
									<h3 className='text-lg font-semibold text-gray-600'>
										{item.product.name}
									</h3>
									<div className='flex items-center gap-2 mt-2'>
										<Badge
											variant='outline'
											className='text-orange-600 border-orange-300'
										>
											Out of Stock
										</Badge>
										{/* {item.estimatedRestock && (
											<div className='flex items-center gap-1 text-sm text-gray-600'>
												<Clock className='w-3 h-3' />
												<span>Back {item.estimatedRestock}</span>
											</div>
										)} */}
									</div>
								</div>
								<Button
									variant='ghost'
									size='icon'
									// onClick={() => removeUnavailableItem(item.id)}
									className='text-gray-400 hover:text-red-500'
								>
									<X className='w-4 h-4' />
								</Button>
							</div>

							{/* Price */}
							<div className='flex items-center gap-3 opacity-60'>
								<span className='text-xl font-bold text-gray-600'>
									${item.product.salePrice || item.product.price}
								</span>
								{item.product.salePrice && (
									<span className='text-lg text-gray-500 line-through'>
										${item.product.price}
									</span>
								)}
							</div>

							{/* Selected Options */}
							<div className='flex items-center gap-6 text-sm text-gray-600'>
								<div className='flex items-center gap-2'>
									<span>Color:</span>
									<div
										className='w-4 h-4 rounded-full border border-gray-300'
										style={{
											backgroundColor: item.product.variants
												.find((v) => v._id === item.variantId)
												?.color.toLowerCase(),
										}}
									/>
									<span>
										{item.product.variants.find((v) => v._id === item.variantId)?.color}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<span>Size:</span>
									<Badge
										variant='outline'
										className='text-xs'
									>
										{item.product.variants.find((v) => v._id === item.variantId)?.size}
									</Badge>
								</div>
								<div className='flex items-center gap-2'>
									<span>Qty:</span>
									<span className='font-medium'>{item.quantity}</span>
								</div>
							</div>

							{/* Actions */}
							<div className='flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t'>
								<Button
									variant='outline'
									size='sm'
									// onClick={() => moveToWishlist(item.id)}
									className='flex items-center justify-center gap-2 text-xs md:text-sm'
								>
									<Heart className='w-3 h-3 md:w-4 md:h-4' />
									Save for Later
								</Button>
								<Button
									variant='outline'
									size='sm'
									// onClick={() => removeUnavailableItem(item.id)}
									className='flex items-center justify-center gap-2 text-red-600 hover:text-red-700 text-xs md:text-sm'
								>
									<Trash2 className='w-3 h-3 md:w-4 md:h-4' />
									Remove
								</Button>
								{/* {item.estimatedRestock && item.unavailableReason !== 'Discontinued' && (
									<Button
										variant='outline'
										size='sm'
										className='flex items-center justify-center gap-2 bg-transparent text-xs md:text-sm'
									>
										<Clock className='w-3 h-3 md:w-4 md:h-4' />
										<span className='hidden sm:inline'>Notify When Available</span>
										<span className='sm:hidden'>Notify</span>
									</Button>
								)} */}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default CartItemUnavailable;
