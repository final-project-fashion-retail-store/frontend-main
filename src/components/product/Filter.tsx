import FilterItem from '@/components/product/FilterItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const filterOptions = {
	colors: ['Black', 'White', 'Gray', 'Navy', 'Red', 'Blue', 'Green', 'Brown'],
	brands: [
		'Nike',
		'Adidas',
		'Puma',
		'Under Armour',
		'Patagonia',
		'Tommy Hilfiger',
	],
	sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
	priceRanges: [
		{ label: 'Under $25', min: 0, max: 25 },
		{ label: '$25 - $50', min: 25, max: 50 },
		{ label: '$50 - $75', min: 50, max: 75 },
		{ label: '$75 - $100', min: 75, max: 100 },
		{ label: 'Over $100', min: 100, max: 999 },
	],
};

const Filter = () => {
	return (
		<div className='hidden lg:block w-64 flex-shrink-0'>
			<Card className='sticky top-6'>
				<CardContent className='p-6'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='font-semibold text-lg'>Filters</h3>
						{/* {getActiveFiltersCount() > 0 && (
							<Button
								variant='ghost'
								size='sm'
								onClick={clearAllFilters}
								className='text-purple-600 hover:text-purple-700'
							>
								Clear All
							</Button>
						)} */}
					</div>

					<div className='space-y-6'>
						{/* Colors Filter */}
						<FilterItem
							title='Colors'
							sectionKey='colors'
						>
							<div className='grid grid-cols-4 gap-2'>
								{filterOptions.colors.map((color) => (
									<button
										key={color}
										// onClick={() => handleColorFilter(color)}
										className={`w-8 h-8 rounded-full border-2 ${
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
							</div>
						</FilterItem>

						{/* Brands Filter */}
						<FilterItem
							title='Brands'
							sectionKey='brands'
						>
							{filterOptions.brands.map((brand) => (
								<label
									key={brand}
									className='flex items-center space-x-2 cursor-pointer'
								>
									<input
										type='checkbox'
										// checked={selectedBrands.includes(brand)}
										// onChange={() => handleBrandFilter(brand)}
										className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
									/>
									<span className='text-sm'>{brand}</span>
								</label>
							))}
						</FilterItem>

						{/* Sizes Filter */}
						<FilterItem
							title='Sizes'
							sectionKey='sizes'
						>
							<div className='grid grid-cols-3 gap-2'>
								{filterOptions.sizes.map((size) => (
									<button
										key={size}
										// onClick={() => handleSizeFilter(size)}
										className={`px-3 py-2 text-sm border rounded-md`}
									>
										{size}
									</button>
								))}
							</div>
						</FilterItem>

						{/* Price Filter */}
						<FilterItem
							title='Price Range'
							sectionKey='price'
						>
							{filterOptions.priceRanges.map((range) => (
								<label
									key={range.label}
									className='flex items-center space-x-2 cursor-pointer'
								>
									<input
										type='checkbox'
										// checked={selectedPriceRange.includes(range.label)}
										// onChange={() => handlePriceFilter(range.label)}
										className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
									/>
									<span className='text-sm'>{range.label}</span>
								</label>
							))}
						</FilterItem>

						{/* Availability Filter */}
						<FilterItem
							title='Availability'
							sectionKey='availability'
						>
							<label className='flex items-center space-x-2 cursor-pointer'>
								<input
									type='checkbox'
									// checked={showOnlyInStock}
									// onChange={(e) => setShowOnlyInStock(e.target.checked)}
									className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
								/>
								<span className='text-sm'>In Stock Only</span>
							</label>
							<label className='flex items-center space-x-2 cursor-pointer'>
								<input
									type='checkbox'
									// checked={showOnlyOnSale}
									// onChange={(e) => setShowOnlyOnSale(e.target.checked)}
									className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
								/>
								<span className='text-sm'>On Sale Only</span>
							</label>
						</FilterItem>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Filter;
