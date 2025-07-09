import FilterItem from '@/components/product/FilterItem';
import PriceRangeSlider from '@/components/product/PriceRangeSlider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter as FilterType } from '@/types';
import { Label } from '@radix-ui/react-label';

type CurrentFilter = {
	colors: string[];
	brands: string[];
	sizes: string[];
	genders: string[];
	subcategories: string[];
	seasons: string[];
	materials: string[];
	minPrice: string;
	maxPrice: string;
};

type Props = {
	showCategory?: boolean;
	filter: FilterType | null;
	getActiveFiltersCount: () => number;
	clearAllFilters: () => void;
	currentFilters: CurrentFilter;
	updateQueryParam: (key: string, value: string) => void;
	priceRange: [number, number];
	updatePriceRange: (value: [number, number]) => void;
};

const Filter = ({
	showCategory,
	filter,
	getActiveFiltersCount,
	clearAllFilters,
	currentFilters,
	updateQueryParam,
	priceRange,
	updatePriceRange,
}: Props) => {
	// console.log(currentFilters);
	return (
		<div className='hidden lg:block w-64 flex-shrink-0'>
			<Card className='sticky top-6'>
				<CardContent className='p-6'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='font-semibold text-lg p-1'>Filters</h3>
						{getActiveFiltersCount() > 0 && (
							<Button
								variant='ghost'
								size='sm'
								onClick={clearAllFilters}
								className='text-purple-600 hover:text-purple-700'
							>
								Clear All
							</Button>
						)}
					</div>
					<div className='space-y-6'>
						{/* Subcategories Filter */}
						{showCategory && (
							<FilterItem
								title='Categories'
								sectionKey='subcategories'
							>
								{filter?.available.subcategories
									.sort((a, b) => a.name.localeCompare(b.name)) // Sort by name
									.map((subcategory) => (
										<div
											key={subcategory._id}
											className='flex items-center space-x-2'
										>
											<Checkbox
												id={`subcategory-checkbox-${subcategory._id}`}
												checked={currentFilters.subcategories.includes(subcategory._id)}
												onCheckedChange={() =>
													updateQueryParam('subcategories', subcategory.name)
												}
											/>
											<Label htmlFor={`subcategory-checkbox-${subcategory._id}`}>
												{subcategory.name}
											</Label>
										</div>
									))}
							</FilterItem>
						)}
						{/* Gender Filter */}
						<FilterItem
							title='Genders'
							sectionKey='gender'
						>
							{filter?.available.genders
								.sort((a, b) => a.localeCompare(b)) // Sort alphabetically
								.map((gender) => (
									<div
										key={gender}
										className='flex items-center space-x-2'
									>
										<Checkbox
											id={`gender-checkbox-${gender}`}
											checked={currentFilters.genders.includes(gender)}
											onCheckedChange={() => updateQueryParam('genders', gender)}
										/>
										<Label htmlFor={`gender-checkbox-${gender}`}>{gender}</Label>
									</div>
								))}
						</FilterItem>
						{/* Colors Filter */}
						<FilterItem
							title='Colors'
							sectionKey='colors'
						>
							<div className='flex flex-wrap gap-2'>
								{filter?.available.colors
									.sort((a, b) => a.localeCompare(b)) // Sort colors alphabetically
									.map((color) => (
										<button
											key={color}
											onClick={() => updateQueryParam('colors', color)}
											className={`w-8 h-8 rounded-full border-2 ${
												currentFilters.colors.includes(color)
													? 'border-purple-500 border-4'
													: 'border-muted-foreground'
											}`}
											style={{ backgroundColor: color.toLowerCase() }}
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
							{filter?.available.brands
								.sort((a, b) => a.name.localeCompare(b.name)) // Sort by brand name
								.map((brand) => (
									<div
										key={brand._id}
										className='flex items-center space-x-2'
									>
										<Checkbox
											id={`brand-checkbox-${brand._id}`}
											checked={currentFilters.brands.includes(brand._id)}
											onCheckedChange={() => updateQueryParam('brands', brand.name)}
										/>
										<Label htmlFor={`brand-checkbox-${brand._id}`}>{brand.name}</Label>
									</div>
								))}
						</FilterItem>

						{/* Sizes Filter */}
						<FilterItem
							title='Sizes'
							sectionKey='sizes'
						>
							<div className='grid grid-cols-3 gap-2'>
								{filter?.available.sizes.sort().map((size) => (
									<button
										key={size}
										onClick={() => updateQueryParam('sizes', size)}
										className={`px-3 py-2 text-sm border rounded-md ${
											currentFilters.sizes.includes(size)
												? 'border-purple-500 bg-purple-50 text-purple-700'
												: 'hover:border-muted-foreground'
										}`}
									>
										{size}
									</button>
								))}
							</div>
						</FilterItem>
						{/* Seasons Filter */}
						<FilterItem
							title='Seasons'
							sectionKey='seasons'
						>
							{filter?.available.seasons
								.sort((a, b) => {
									// Custom sort for seasons in logical order
									const seasonOrder = ['Spring', 'Summer', 'Fall', 'Autumn', 'Winter'];
									const aIndex = seasonOrder.indexOf(a);
									const bIndex = seasonOrder.indexOf(b);

									if (aIndex !== -1 && bIndex !== -1) {
										return aIndex - bIndex;
									}
									if (aIndex !== -1) return -1;
									if (bIndex !== -1) return 1;
									return a.localeCompare(b);
								})
								.map((season) => (
									<div
										key={season}
										className='flex items-center space-x-2'
									>
										<Checkbox
											id={`season-checkbox-${season}`}
											checked={currentFilters.seasons.includes(season)}
											onCheckedChange={() => updateQueryParam('seasons', season)}
										/>
										<Label htmlFor={`season-checkbox-${season}`}>{season}</Label>
									</div>
								))}
						</FilterItem>
						{/* Materials Filter */}
						<FilterItem
							title='Materials'
							sectionKey='materials'
						>
							{filter?.available.materials
								.sort((a, b) => a.localeCompare(b)) // Sort alphabetically
								.map((material) => (
									<div
										key={material}
										className='flex items-center space-x-2'
									>
										<Checkbox
											id={`material-checkbox-${material}`}
											checked={currentFilters.materials.includes(material)}
											onCheckedChange={() => updateQueryParam('materials', material)}
										/>
										<Label htmlFor={`material-checkbox-${material}`}>{material}</Label>
									</div>
								))}
						</FilterItem>

						{/* Price Filter */}
						{Number(filter?.available.maxPrice) - Number(filter?.available.minPrice) >
							2 && (
							<FilterItem
								title='Price Range'
								sectionKey='price'
							>
								<PriceRangeSlider
									min={filter?.available.minPrice || 0}
									max={filter?.available.maxPrice || 500}
									value={priceRange}
									onChange={updatePriceRange}
									step={0.01}
								/>
							</FilterItem>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Filter;
