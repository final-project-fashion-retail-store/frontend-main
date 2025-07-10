import SearchContainer from '@/components/search/SearchContainer';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

const Search = () => {
	return (
		<div className='container mx-auto py-2 sm:py-8 px-2 2xl:px-6 3xl:px-0'>
			<Suspense>
				<SearchContainer />
			</Suspense>
			<Separator className='w-full my-4' />
		</div>
	);
};

export default Search;
