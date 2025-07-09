import SelectCustom from '@/components/custom/select-custom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import sortOptions from '@/constants/SortOptions';
import { Filter } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	pageTitle?: string;
	productCount?: number;
	sortBy: string;
	isMobileFiltersOpen?: boolean;
	setIsMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
	setSortBy: Dispatch<SetStateAction<string>>;
	getActiveFiltersCount: () => number;
};

const PageHeader = ({
	pageTitle,
	productCount,
	sortBy,
	setSortBy,
	isMobileFiltersOpen,
	setIsMobileFiltersOpen,
	getActiveFiltersCount,
}: Props) => {
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
						onValueChange={setSortBy}
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
