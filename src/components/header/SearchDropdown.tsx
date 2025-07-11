'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useClick,
	useDismiss,
	useRole,
	useInteractions,
} from '@floating-ui/react';
import { Search, ArrowRight, X, LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useProductStore from '@/stores/productStore';
import { useShallow } from 'zustand/shallow';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useCommonStore from '@/stores/commonStore';

interface Props {
	placeholder?: string;
	className?: string;
}

function SearchDropdown({
	placeholder = 'Search products, categories...',
	className = '',
}: Props) {
	const [isGettingSearchResultPopup, searchResultPopup, getSearchResultPopup] =
		useProductStore(
			useShallow((state) => [
				state.isGettingSearchResultPopup,
				state.searchResultPopup,
				state.getSearchResultPopup,
			])
		);
	const setForce = useCommonStore((state) => state.setForce);

	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const searchQueryDebounced = useDebounce(searchQuery, 500);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset(8), // Small gap between input and dropdown
			flip({ padding: 8 }),
			shift({ padding: 8 }),
		],
		whileElementsMounted: autoUpdate,
		placement: 'bottom-start',
	});

	const click = useClick(context, {
		enabled: false, // We'll handle opening manually
	});
	const dismiss = useDismiss(context, {
		outsidePress: true,
		escapeKey: true,
	});
	const role = useRole(context);

	const { getFloatingProps } = useInteractions([click, dismiss, role]);

	// Debounced search
	useEffect(() => {
		if (searchQueryDebounced.trim()) {
			getSearchResultPopup(searchQueryDebounced);
			setIsOpen(true);
		}
	}, [searchQueryDebounced, getSearchResultPopup]);

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);

		if (!value.trim()) {
			setIsOpen(false);
		}
	};

	// Handle input focus
	const handleInputFocus = () => {
		if (searchQuery.trim() && searchResultPopup) {
			setIsOpen(true);
		}
	};

	const handleShowAllResults = () => {
		if (!searchQuery.trim()) return;
		router.push(`/search?q=${searchQuery}`);

		setIsOpen(false);
		// Navigate to search results page
	};

	const handleClearSearch = () => {
		setSearchQuery('');
		setIsOpen(false);
		setTimeout(() => {
			searchInputRef.current?.focus();
		}, 0);
	};

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			e.key === 'Enter' &&
			searchQuery.trim() &&
			searchQuery === searchQueryDebounced
		) {
			setIsOpen(false);
			setTimeout(() => {
				searchInputRef.current?.blur();
			}, 0);
			setForce(true);
			router.push(`/search?q=${searchQuery}`);
		}
	};

	return (
		<div className={`relative ${className}`}>
			<div
				ref={refs.setReference}
				className='relative'
			>
				<Input
					ref={searchInputRef}
					type='text'
					placeholder={placeholder}
					value={searchQuery}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					onKeyUp={handleKeyUp}
					className='w-full px-10'
				/>
				<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4' />
				{searchQuery && (
					<Button
						variant='ghost'
						size='sm'
						onClick={handleClearSearch}
						className='absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent'
					>
						<X className='size-4' />
					</Button>
				)}
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={refs.setFloating}
						style={{
							...floatingStyles,
							width: (refs.reference.current as HTMLElement)?.offsetWidth || 'auto',
							minWidth: (refs.reference.current as HTMLElement)?.offsetWidth || 'auto',
						}}
						{...getFloatingProps()}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className='bg-white dark:bg-accent z-50 rounded-lg shadow-xl border overflow-hidden'
					>
						{isGettingSearchResultPopup ? (
							<div className='p-6 text-center'>
								<LoaderCircle className='w-6 h-6 animate-spin mx-auto mb-2 text-purple-600' />
								<p className='text-sm text-muted-foreground'>Searching...</p>
							</div>
						) : searchResultPopup ? (
							<div className='max-h-96 overflow-y-auto'>
								{/* Search Results */}
								{searchResultPopup?.products &&
									searchResultPopup?.subcategories &&
									searchResultPopup?.brands && (
										<>
											{/* Products */}
											{searchResultPopup.products.length > 0 && (
												<div className='p-4'>
													<h3 className='text-sm font-medium text-muted-foreground mb-3'>
														Products
													</h3>
													<div className='space-y-2'>
														{searchResultPopup.products.slice(0, 3).map((product) => (
															<div
																key={product._id}
																className='flex items-center gap-3 p-2 rounded-lg hover:bg-accent dark:hover:bg-muted-foreground/10 cursor-pointer'
															>
																<Image
																	src={product.images[0].url}
																	alt={product.name}
																	width={40}
																	height={40}
																	className='rounded-md object-cover'
																/>
																<div className='flex-1 min-w-0'>
																	<p className='text-sm font-medium text-accent-foreground truncate'>
																		{product.name}
																	</p>
																	<p className='text-xs text-muted-foreground'>
																		{product.brand.name}
																	</p>
																</div>
																<span className='text-sm font-medium text-purple-600'>
																	${product.salePrice}
																</span>
															</div>
														))}
													</div>
												</div>
											)}
											{/* Categories */}
											{searchResultPopup.subcategories.length > 0 && (
												<>
													<Separator />
													<div className='p-4'>
														<h3 className='text-sm font-medium text-gray-700 mb-3'>
															Categories
														</h3>
														<div className='space-y-2'>
															{searchResultPopup.subcategories.map((category) => (
																<Link
																	key={category.name}
																	href={`/category/${category.parentCategory[0].slug}/${category.slug}`}
																	className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer'
																>
																	{/* <span className='text-lg'>{category.icon}</span> */}
																	<div className='flex-1'>
																		<p className='text-sm font-medium text-gray-900'>
																			{category.name}
																		</p>
																		<p className='text-xs text-gray-500'>
																			{category.productCount} items
																		</p>
																	</div>
																</Link>
															))}
														</div>
													</div>
												</>
											)}

											{/* Brands */}
											{searchResultPopup.brands.length > 0 && (
												<>
													<Separator />
													<div className='p-4'>
														<h3 className='text-sm font-medium text-gray-700 mb-3'>Brands</h3>
														<div className='space-y-2'>
															{searchResultPopup.brands.map((brand) => (
																<div
																	key={brand.name}
																	className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer'
																>
																	<span className='text-sm font-medium text-gray-900'>
																		{brand.name}
																	</span>
																	<span className='text-xs text-gray-500'>
																		{brand.productCount} items
																	</span>
																</div>
															))}
														</div>
													</div>
												</>
											)}
											{/* No Results */}
											{searchResultPopup.products.length === 0 &&
												searchResultPopup.subcategories.length === 0 &&
												searchResultPopup.brands.length === 0 && (
													<div className='p-6 text-center'>
														<Search className='w-8 h-8 text-muted-foreground mx-auto mb-2' />
														<p className='text-sm text-muted-foreground mb-1'>
															No results found
														</p>
														<p className='text-xs text-muted-foreground'>
															Try different keywords or check spelling
														</p>
													</div>
												)}

											{/* Show All Results Button */}
											{searchResultPopup.products.length > 0 && (
												<>
													<Separator />
													<div className='p-3'>
														<Button
															onClick={handleShowAllResults}
															variant='ghost'
															className='w-full justify-between text-purple-600 hover:text-purple-700 hover:bg-purple-50'
														>
															<span className='truncate'>
																Show all results for &quot;{searchQuery}&quot;
															</span>
															<ArrowRight className='w-4 h-4' />
														</Button>
													</div>
												</>
											)}
										</>
									)}
							</div>
						) : null}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default SearchDropdown;
