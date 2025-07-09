import CategoryContainer from '@/components/category/CategoryContainer';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

const Category = async ({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) => {
	const resolvedParams = await params;

	return (
		<div className='container mx-auto py-2 sm:py-8 px-2 2xl:px-6 3xl:px-0'>
			<Suspense>
				<CategoryContainer params={resolvedParams} />
			</Suspense>
			<Separator className='w-full my-4' />
		</div>
	);
};

export default Category;
