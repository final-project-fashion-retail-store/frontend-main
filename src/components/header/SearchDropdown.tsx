/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
	Search,
	Clock,
	TrendingUp,
	ArrowRight,
	X,
	LoaderCircle,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Mock search data
const mockSearchData = {
	products: [
		{
			id: 1,
			name: 'Classic Cotton T-Shirt',
			brand: 'Nike',
			price: 29.99,
			image:
				'https://res.cloudinary.com/dx2akttki/image/upload/v1751708470/e3mgspizprmhnw4hmyii.avif',
			category: 'Shirts',
		},
		{
			id: 2,
			name: 'Premium Polo Shirt',
			brand: 'Adidas',
			price: 49.99,
			image:
				'https://res.cloudinary.com/dx2akttki/image/upload/v1751708470/e3mgspizprmhnw4hmyii.avif',
			category: 'Shirts',
		},
		{
			id: 3,
			name: 'Athletic Performance Tee',
			brand: 'Under Armour',
			price: 39.99,
			image:
				'https://res.cloudinary.com/dx2akttki/image/upload/v1751708470/e3mgspizprmhnw4hmyii.avif',
			category: 'Shirts',
		},
	],
	categories: [
		{ name: 'T-Shirts', count: 45, icon: '👕' },
		{ name: 'Polo Shirts', count: 23, icon: '👔' },
		{ name: 'Hoodies', count: 18, icon: '🧥' },
	],
	brands: [
		{ name: 'Nike', count: 156 },
		{ name: 'Adidas', count: 134 },
		{ name: 'Under Armour', count: 89 },
	],
	suggestions: [
		'cotton t-shirt',
		'polo shirt',
		'athletic wear',
		'casual shirts',
	],
	recentSearches: ['nike shoes', 'polo shirt', 'cotton t-shirt'],
	trending: [
		'summer collection',
		'athletic wear',
		'casual shirts',
		'polo shirts',
	],
};

interface SearchDropdownProps {
	placeholder?: string;
	className?: string;
}

function SearchDropdown({
	placeholder = 'Search products, categories...',
	className = '',
}: SearchDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [searchResults, setSearchResults] = useState<any>(null);
	const [selectedIndex, setSelectedIndex] = useState(-1);

	const searchInputRef = useRef<HTMLInputElement>(null);

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

	// Simulate search API call
	const performSearch = async (query: string) => {
		if (!query.trim()) {
			setSearchResults(null);
			setIsOpen(false);
			return;
		}

		setIsLoading(true);
		setIsOpen(true);

		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 300));

		// Filter mock data based on query
		const filteredProducts = mockSearchData.products.filter(
			(product) =>
				product.name.toLowerCase().includes(query.toLowerCase()) ||
				product.brand.toLowerCase().includes(query.toLowerCase()) ||
				product.category.toLowerCase().includes(query.toLowerCase())
		);

		const filteredCategories = mockSearchData.categories.filter((category) =>
			category.name.toLowerCase().includes(query.toLowerCase())
		);

		const filteredBrands = mockSearchData.brands.filter((brand) =>
			brand.name.toLowerCase().includes(query.toLowerCase())
		);

		const filteredSuggestions = mockSearchData.suggestions.filter((suggestion) =>
			suggestion.toLowerCase().includes(query.toLowerCase())
		);

		setSearchResults({
			products: filteredProducts,
			categories: filteredCategories,
			brands: filteredBrands,
			suggestions: filteredSuggestions,
			query,
		});

		setIsLoading(false);
	};

	// Debounced search
	useEffect(() => {
		const timer = setTimeout(() => {
			performSearch(searchQuery);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);
		setSelectedIndex(-1);

		if (!value.trim()) {
			setSearchResults(null);
			setIsOpen(false);
		}
	};

	// Handle input focus
	const handleInputFocus = () => {
		if (searchQuery.trim() && searchResults) {
			setIsOpen(true);
		}
		// else if (!searchQuery.trim()) {
		// 	// Show recent searches and trending when focused with empty query
		// 	setSearchResults({
		// 		products: [],
		// 		categories: [],
		// 		brands: [],
		// 		suggestions: [],
		// 		recentSearches: mockSearchData.recentSearches,
		// 		trending: mockSearchData.trending,
		// 		query: '',
		// 	});
		// 	setIsOpen(true);
		// }
	};

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen || !searchResults) return;

		const totalItems =
			searchResults.products.length +
			searchResults.categories.length +
			searchResults.brands.length;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
				break;
			case 'ArrowUp':
				e.preventDefault();
				setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
				break;
			case 'Enter':
				e.preventDefault();
				if (selectedIndex >= 0) {
					// Handle selection
					console.log('Selected item at index:', selectedIndex);
				} else {
					// Show all results
					handleShowAllResults();
				}
				break;
			case 'Escape':
				setIsOpen(false);
				searchInputRef.current?.blur();
				break;
		}
	};

	const handleShowAllResults = () => {
		console.log('Show all results for:', searchQuery);
		setIsOpen(false);
		// Navigate to search results page
	};

	const handleClearSearch = () => {
		setSearchQuery('');
		setSearchResults(null);
		setIsOpen(false);
		searchInputRef.current?.focus();
	};

	const handleRecentSearchClick = (search: string) => {
		setSearchQuery(search);
		searchInputRef.current?.focus();
	};

	const handleTrendingClick = (trend: string) => {
		setSearchQuery(trend);
		searchInputRef.current?.focus();
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
					onKeyDown={handleKeyDown}
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
						{isLoading ? (
							<div className='p-6 text-center'>
								<LoaderCircle className='w-6 h-6 animate-spin mx-auto mb-2 text-purple-600' />
								<p className='text-sm text-muted-foreground'>Searching...</p>
							</div>
						) : searchResults ? (
							<div className='max-h-96 overflow-y-auto'>
								{/* Recent Searches & Trending (when no query) */}
								{!searchResults.query && (
									<div className='p-4 space-y-4'>
										{searchResults.recentSearches.length > 0 && (
											<div>
												<div className='flex items-center gap-2 mb-3'>
													<Clock className='w-4 h-4 text-gray-400' />
													<span className='text-sm font-medium text-gray-700'>
														Recent Searches
													</span>
												</div>
												<div className='space-y-2'>
													{searchResults.recentSearches.map(
														(search: string, index: number) => (
															<button
																key={index}
																onClick={() => handleRecentSearchClick(search)}
																className='flex items-center w-full text-left px-2 py-1 rounded hover:bg-gray-50 text-sm text-gray-600'
															>
																<Clock className='w-3 h-3 mr-2 text-gray-400' />
																{search}
															</button>
														)
													)}
												</div>
											</div>
										)}

										{searchResults.trending.length > 0 && (
											<div>
												<div className='flex items-center gap-2 mb-3'>
													<TrendingUp className='w-4 h-4 text-gray-400' />
													<span className='text-sm font-medium text-gray-700'>Trending</span>
												</div>
												<div className='flex flex-wrap gap-2'>
													{searchResults.trending.map((trend: string, index: number) => (
														<Badge
															key={index}
															variant='secondary'
															className='cursor-pointer hover:bg-purple-100 hover:text-purple-700'
															onClick={() => handleTrendingClick(trend)}
														>
															{trend}
														</Badge>
													))}
												</div>
											</div>
										)}
									</div>
								)}

								{/* Search Results */}
								{searchResults.query && (
									<>
										{/* Products */}
										{searchResults.products.length > 0 && (
											<div className='p-4'>
												<h3 className='text-sm font-medium text-muted-foreground mb-3'>
													Products
												</h3>
												<div className='space-y-2'>
													{searchResults.products
														.slice(0, 3)
														.map((product: any, index: number) => (
															<div
																key={product.id}
																className={`flex items-center gap-3 p-2 rounded-lg hover:bg-accent dark:hover:bg-muted-foreground/10 cursor-pointer ${
																	selectedIndex === index ? 'bg-purple-50' : ''
																}`}
															>
																<Image
																	src={product.image || '/placeholder.svg'}
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
																		{product.brand}
																	</p>
																</div>
																<span className='text-sm font-medium text-purple-600'>
																	${product.price}
																</span>
															</div>
														))}
												</div>
											</div>
										)}
										{/* Categories */}
										{searchResults.categories.length > 0 && (
											<>
												<Separator />
												<div className='p-4'>
													<h3 className='text-sm font-medium text-gray-700 mb-3'>
														Categories
													</h3>
													<div className='space-y-2'>
														{searchResults.categories.map((category: any) => (
															<div
																key={category.name}
																className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer'
															>
																<span className='text-lg'>{category.icon}</span>
																<div className='flex-1'>
																	<p className='text-sm font-medium text-gray-900'>
																		{category.name}
																	</p>
																	<p className='text-xs text-gray-500'>{category.count} items</p>
																</div>
															</div>
														))}
													</div>
												</div>
											</>
										)}

										{/* Brands */}
										{searchResults.brands.length > 0 && (
											<>
												<Separator />
												<div className='p-4'>
													<h3 className='text-sm font-medium text-gray-700 mb-3'>Brands</h3>
													<div className='space-y-2'>
														{searchResults.brands.map((brand: any) => (
															<div
																key={brand.name}
																className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer'
															>
																<span className='text-sm font-medium text-gray-900'>
																	{brand.name}
																</span>
																<span className='text-xs text-gray-500'>
																	{brand.count} items
																</span>
															</div>
														))}
													</div>
												</div>
											</>
										)}
										{/* No Results */}
										{searchResults.products.length === 0 &&
											searchResults.categories.length === 0 &&
											searchResults.brands.length === 0 && (
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
										{(searchResults.products.length > 0 ||
											searchResults.categories.length > 0 ||
											searchResults.brands.length > 0) && (
											<>
												<Separator />
												<div className='p-3'>
													<Button
														onClick={handleShowAllResults}
														variant='ghost'
														className='w-full justify-between text-purple-600 hover:text-purple-700 hover:bg-purple-50'
													>
														<span>
															Show all results for &quot;{searchResults.query}&quot;
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
