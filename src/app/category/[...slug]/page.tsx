import CategoryContainer from '@/components/category/CategoryContainer';
import { Separator } from '@/components/ui/separator';

const Category = async ({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) => {
	const resolvedParams = await params;

	return (
		<div className='container mx-auto py-8 px-2 2xl:px-6 3xl:px-0'>
			<CategoryContainer params={resolvedParams} />
			<Separator className='w-full my-4' />
		</div>
	);
};

export default Category;
