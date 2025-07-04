import SelectCustom from '@/components/custom/select-custom';
import { Label } from '@/components/ui/label';
import sortOptions from '@/constants/SortOptions';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	pageTitle?: string;
	sortBy: string;
	setSortBy: Dispatch<SetStateAction<string>>;
};

const PageHeader = ({ pageTitle, sortBy, setSortBy }: Props) => {
	return (
		<div className='flex items-center justify-between mb-6'>
			<div>
				<h1 className='text-3xl font-bold mb-2'>
					{pageTitle ? `${pageTitle}` : 'Products'}
				</h1>
				<p className='text-gray-600'>10 products found</p>
			</div>

			{/* Sort and View Controls */}
			<div className='flex items-center gap-4'>
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
				{/* <Button
					variant='outline'
					size='sm'
					onClick={() => setIsMobileFiltersOpen(true)}
					className='lg:hidden'
				>
					<Filter className='w-4 h-4 mr-2' />
					Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
				</Button> */}
			</div>
		</div>
	);
};

export default PageHeader;
