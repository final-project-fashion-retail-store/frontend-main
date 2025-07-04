import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

type Props = {
	product: {
		id: number;
		name: string;
		brand: string;
		price: number;
		originalPrice: number | null;
		image: string;
		colors: string[];
		sizes: string[];
		rating: number;
		reviews: number;
		inStock: boolean;
		isNew: boolean;
		onSale: boolean;
	};
};

const ProductCard = ({ product }: Props) => {
	return (
		<Card className='group hover:shadow-lg transition-shadow duration-300 overflow-hidden p-0 gap-0'>
			<div className='relative'>
				<Image
					src={product.image || '/placeholder.svg'}
					alt={product.name}
					width={300}
					height={400}
					className='w-full h-90 object-cover group-hover:scale-105 transition-transform duration-300'
				/>

				{/* Badges */}
				<div className='absolute top-3 left-3 flex flex-col gap-1'>
					{product.isNew && (
						<Badge className='bg-green-600 text-white text-xs'>New</Badge>
					)}
					{product.onSale && (
						<Badge
							variant='destructive'
							className='text-xs'
						>
							Sale
						</Badge>
					)}
					{!product.inStock && (
						<Badge
							variant='secondary'
							className='bg-gray-600 text-white text-xs'
						>
							Out of Stock
						</Badge>
					)}
				</div>

				{/* Action buttons */}
				<div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
					<Button
						size='sm'
						variant='secondary'
						className='w-8 h-8 p-0 rounded-full'
					>
						<Heart className='w-4 h-4' />
					</Button>
				</div>

				{/* Quick add to cart */}
				<div className='absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
					<Button
						className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
						disabled={!product.inStock}
					>
						<ShoppingCart className='w-4 h-4 mr-2' />
						{product.inStock ? 'Add to Cart' : 'Out of Stock'}
					</Button>
				</div>
			</div>

			<CardContent className='p-4'>
				<div className='space-y-2'>
					<p className='text-sm text-purple-600 font-medium'>{product.brand}</p>
					<h3 className='font-semibold text-lg leading-tight'>{product.name}</h3>

					{/* Rating */}
					<div className='flex items-center gap-2 text-sm'>
						<div className='flex items-center'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-3 h-3 ${
										i < Math.floor(product.rating)
											? 'text-yellow-400 fill-current'
											: 'text-gray-300'
									}`}
								/>
							))}
						</div>
						<span className='text-gray-600'>({product.reviews})</span>
					</div>

					{/* Price */}
					<div className='flex items-center gap-2'>
						<span className='text-xl font-bold text-purple-600'>
							${product.price}
						</span>
						{product.originalPrice && (
							<span className='text-sm text-gray-500 line-through'>
								${product.originalPrice}
							</span>
						)}
					</div>

					{/* Colors */}
					<div className='flex items-center gap-1'>
						{product.colors.slice(0, 4).map((color) => (
							<div
								key={color}
								className={`w-4 h-4 rounded-full border border-gray-300 ${
									color === 'Black'
										? 'bg-black'
										: color === 'White'
										? 'bg-white'
										: color === 'Gray'
										? 'bg-gray-400'
										: color === 'Navy'
										? 'bg-blue-900'
										: color === 'Red'
										? 'bg-red-500'
										: color === 'Blue'
										? 'bg-blue-500'
										: color === 'Green'
										? 'bg-green-500'
										: 'bg-amber-700'
								}`}
								title={color}
							/>
						))}
						{product.colors.length > 4 && (
							<span className='text-xs text-gray-500'>
								+{product.colors.length - 4}
							</span>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
