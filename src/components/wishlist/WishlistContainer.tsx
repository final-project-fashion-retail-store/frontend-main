'use client';

import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import useProductStore from '@/stores/productStore';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const WishlistContainer = () => {
	const [
		isGettingProducts,
		totalWishlist,
		wishlistProducts,
		getProductsWishlist,
		pagination,
	] = useProductStore(
		useShallow((state) => [
			state.isGettingProducts,
			state.totalWishlist,
			state.wishlistProducts,
			state.getProductsWishlist,
			state.pagination,
		])
	);

	useEffect(() => {
		getProductsWishlist();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isGettingProducts) {
		return <Loader />;
	}

	if (!wishlistProducts) {
		return null;
	}
	return (
		<div className='w-full'>
			<div className='mb-8'>
				<div className='flex items-center gap-3 mb-4'>
					<Heart className='w-8 h-8 text-purple-600 fill-purple-600' />
					<h1 className='text-3xl font-bold text-foreground'>My Wishlist</h1>
				</div>
				<p className='text-muted-foreground'>
					{totalWishlist > 0
						? `${totalWishlist} ${
								totalWishlist === 1 ? 'item' : 'items'
						  } saved for later`
						: 'No items saved for later'}
				</p>
			</div>
			{wishlistProducts.length === 0 ? (
				<div className='text-center py-16'>
					<Heart className='w-16 h-16 text-gray-300 mx-auto mb-4' />
					<h2 className='text-2xl font-semibold text-gray-900 mb-2'>
						Your wishlist is empty
					</h2>
					<p className='text-gray-600 mb-6'>
						Start adding items you love to see them here
					</p>
					<Button
						className='bg-purple-600 hover:bg-purple-700 text-white'
						asChild
					>
						<Link href={'/'}>Continue Shopping</Link>
					</Button>
				</div>
			) : (
				<>
					<div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{wishlistProducts.map((product) => (
							<ProductCard
								key={product._id}
								product={product}
								wishlist
							/>
						))}
					</div>
					{!isGettingProducts &&
						(pagination?.totalPages ?? 0) > 1 &&
						(wishlistProducts?.length ?? 0) > 0 && (
							<div className='mt-12'>
								<Pagination paginationPage='wishlist' />
							</div>
						)}
				</>
			)}
		</div>
	);
};

export default WishlistContainer;
