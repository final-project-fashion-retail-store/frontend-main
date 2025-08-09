import FilterItem from '@/components/product/FilterItem';
import PriceRangeSlider from '@/components/product/PriceRangeSlider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { Filter } from '@/types';
import { Dispatch, SetStateAction } from 'react';

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
	filter: Filter | null;
	currentFilters: CurrentFilter;
	isMobileFiltersOpen: boolean;
	priceRange: [number, number];
	setIsMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
	updateQueryParam: (key: string, value: string) => void;
	updatePriceRange: (value: [number, number]) => void;
	clearAllFilters: () => void;
};

const MobileFilter = ({
	showCategory,
	filter,
	currentFilters,
	isMobileFiltersOpen,
	priceRange,
	setIsMobileFiltersOpen,
	updateQueryParam,
	updatePriceRange,
	clearAllFilters,
}: Props) => {
	return (
		<Sheet
			open={isMobileFiltersOpen}
			onOpenChange={setIsMobileFiltersOpen}
		>
			<SheetContent
				side='right'
				className='w-80 overflow-y-auto px-6'
			>
				<SheetHeader>
					<SheetTitle>Filters</SheetTitle>
					<SheetDescription>
						Refine your search with the options below
					</SheetDescription>
				</SheetHeader>

				<div className='mt-6 space-y-6'>
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
							borderBottom={false}
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

				{/* Action Buttons */}
				<div className='mt-6 pt-6 sticky bottom-5'>
					<div className='flex gap-3'>
						<Button
							onClick={() => setIsMobileFiltersOpen(false)}
							className='flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
						>
							Apply Filters
						</Button>
						<Button
							variant='outline'
							onClick={clearAllFilters}
							className='flex-1'
						>
							Clear All
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileFilter;
