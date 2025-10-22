'use client';

import type React from 'react';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useProductStore from '@/stores/productStore';
import { useShallow } from 'zustand/shallow';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
	className?: string;
	paginationPage: 'category' | 'subcategory' | 'search' | 'brand' | 'wishlist';
	param?: { slug: string[] };
	slug?: string;
};

function Pagination({ className, paginationPage, param, slug }: Props) {
	const [
		pagination,
		getProductByCategory,
		getProductBySubcategory,
		getProductBySearch,
		getProductByBrand,
		getProductsWishlist,
	] = useProductStore(
		useShallow((state) => [
			state.pagination,
			state.getProductByCategory,
			state.getProductBySubcategory,
			state.getProductBySearch,
			state.getProductByBrand,
			state.getProductsWishlist,
		])
	);
	const [page, setPage] = useState(pagination?.currentPage || 1);
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateQueryParams = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`?${params.toString()}`);
	};

	const handleClickPrevious = () => {
		setPage((pagination?.currentPage || 1) - 1);
		updateQueryParams(
			pagination && pagination.currentPage ? pagination.currentPage - 1 : 1
		);

		if (paginationPage === 'category') {
			getProductByCategory('', pagination?.prevPage || '');
		} else if (paginationPage === 'subcategory') {
			getProductBySubcategory('', '', pagination?.prevPage || '');
		} else if (paginationPage === 'search') {
			getProductBySearch('', pagination?.prevPage || '');
		} else if (paginationPage === 'brand') {
			getProductByBrand('', '', pagination?.prevPage || '');
		} else if (paginationPage === 'wishlist') {
			getProductsWishlist(pagination?.prevPage || '');
		}
	};

	const handleClickNext = () => {
		setPage((pagination?.currentPage || 1) + 1);
		updateQueryParams(
			pagination && pagination.currentPage ? pagination.currentPage + 1 : 1
		);
		if (paginationPage === 'category') {
			getProductByCategory('', pagination?.nextPage || '');
		} else if (paginationPage === 'subcategory') {
			getProductBySubcategory('', '', pagination?.nextPage || '');
		} else if (paginationPage === 'search') {
			getProductBySearch('', pagination?.nextPage || '');
		} else if (paginationPage === 'brand') {
			getProductByBrand('', '', pagination?.nextPage || '');
		} else if (paginationPage === 'wishlist') {
			getProductsWishlist(pagination?.nextPage || '');
		}
	};

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const currentParams = new URLSearchParams(searchParams.toString());
			currentParams.set('page', page.toString());

			// Update the URL with the new page parameter
			router.push(`?${currentParams.toString()}`);

			// Trigger the appropriate API call based on the paginationPage prop
			if (paginationPage === 'category' && param?.slug?.[0]) {
				getProductByCategory(param.slug[0], '', '', currentParams.toString());
			} else if (
				paginationPage === 'subcategory' &&
				param?.slug?.[0] &&
				param?.slug?.[1]
			) {
				getProductBySubcategory(
					param.slug[0],
					param.slug[1],
					currentParams.toString()
				);
			} else if (paginationPage === 'search') {
				getProductBySearch(currentParams.toString());
			} else if (paginationPage === 'brand') {
				getProductByBrand(slug || '', currentParams.toString());
			} else if (paginationPage === 'wishlist') {
				getProductsWishlist('', currentParams.toString());
			}
		}
	};

	return (
		<div className={`flex items-center justify-center gap-2 ${className}`}>
			{/* Previous Button */}
			<Button
				size='icon'
				className='rounded-full size-12'
				onClick={handleClickPrevious}
				disabled={pagination?.currentPage === 1}
			>
				<ChevronLeft className='w-5 h-5' />
			</Button>

			{/* Page Info Container */}
			<div className='bg-accent-foreground dark:bg-accent text-background dark:text-foreground px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium'>
				<span>Page</span>
				<Input
					value={page}
					className='w-16 bg-transparent text-center text-background dark:text-foreground rounded px-1'
					onChange={(e) => {
						const inputValue = e.target.value;

						// Check if the input value is a valid number
						if (!isNaN(Number(inputValue))) {
							const numericValue = Number(inputValue);

							if (numericValue > (pagination?.totalPages || 1)) {
								setPage(pagination?.totalPages || 1);
							} else {
								setPage(numericValue);
							}
						} else {
							// Reset to empty string if input is invalid
							setPage(1);
						}
					}}
					onKeyUp={handleKeyUp}
				/>
				<span>/</span>
				<span>{pagination?.totalPages}</span>
			</div>

			{/* Next Button */}
			<Button
				size='icon'
				className='rounded-full size-12'
				onClick={handleClickNext}
				disabled={pagination?.currentPage === pagination?.totalPages}
			>
				<ChevronRight className='w-5 h-5' />
			</Button>
		</div>
	);
}

export default Pagination;
