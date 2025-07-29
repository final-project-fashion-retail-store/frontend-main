import SelectCustom from '@/components/custom/select-custom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import sortOptions from '@/constants/SortOptions';
import { Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
	pageTitle?: string;
	productCount?: number;
	sortBy: string;
	isMobileFiltersOpen?: boolean;
	setIsMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
	setSortBy: Dispatch<SetStateAction<string>>;
	getActiveFiltersCount: () => number;
	onSortChange?: (sortQuery: string) => void;
};

const PageHeader = ({
	pageTitle,
	productCount,
	sortBy,
	setSortBy,
	isMobileFiltersOpen,
	setIsMobileFiltersOpen,
	getActiveFiltersCount,
	onSortChange,
}: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Map sort values to API query parameters
	const getSortQuery = (sortValue: string) => {
		switch (sortValue) {
			case 'newest':
				return 'sort=-createdAt';
			case 'price-low':
				return 'sort=price';
			case 'price-high':
				return 'sort=-price';
			case 'rating':
				return 'sort=-averageRating';
			case 'popular':
				return 'sort=-totalReviews';
			default:
				return 'sort=-createdAt';
		}
	};

	const handleSortChange = (newSortBy: string) => {
		setSortBy(newSortBy);

		// Update URL with sort parameter
		const currentParams = new URLSearchParams(searchParams.toString());
		const sortQuery = getSortQuery(newSortBy);

		// Extract just the sort value without 'sort=' prefix
		const sortValue = sortQuery.replace('sort=', '');
		currentParams.set('sort', sortValue);

		// Update URL
		router.push(`?${currentParams.toString()}`);

		// Call the callback if provided to trigger API call
		if (onSortChange) {
			// Build complete query string including existing params
			const fullQuery = currentParams.toString();
			onSortChange(fullQuery);
		}
	};

	useEffect(() => {
		const sortParam = searchParams.get('sort');
		if (sortParam) {
			// Map API sort parameter back to select value
			let selectValue = 'newest';
			switch (sortParam) {
				case '-createdAt':
					selectValue = 'newest';
					break;
				case 'price':
					selectValue = 'price-low';
					break;
				case '-price':
					selectValue = 'price-high';
					break;
				case '-averageRating':
					selectValue = 'rating';
					break;
				case '-totalReviews':
					selectValue = 'popular';
					break;
			}
			setSortBy(selectValue);
		}
	}, [searchParams, setSortBy]);

	return (
		<div className='flex items-center justify-between max-sm:flex-col max-sm:gap-4 mb-6'>
			<div className='max-sm:text-center'>
				<h1 className='text-xl sm:text-3xl font-bold sm:mb-2'>
					{pageTitle ? `${pageTitle}` : 'Products'}
				</h1>
				<p className='max-sm:text-sm text-muted-foreground'>
					{productCount} product(s) found
				</p>
			</div>

			{/* Sort and View Controls */}
			<div className='flex items-center gap-4 max-sm:w-full max-sm:justify-between max-sm:flex-row-reverse'>
				<div className='flex items-center gap-2'>
					<Label
						htmlFor='sort'
						className='text-sm font-medium'
					>
						Sort by:
					</Label>
					<SelectCustom
						items={sortOptions}
						value={sortBy}
						onValueChange={handleSortChange}
					/>
				</div>
				{/* Mobile Filter Toggle */}
				<Sheet
					open={isMobileFiltersOpen}
					onOpenChange={setIsMobileFiltersOpen}
				>
					<SheetTrigger asChild>
						<Button
							variant='outline'
							size='sm'
							className='lg:hidden bg-transparent'
						>
							<Filter className='w-4 h-4 mr-2' />
							Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
						</Button>
					</SheetTrigger>
				</Sheet>
			</div>
		</div>
	);
};

export default PageHeader;
