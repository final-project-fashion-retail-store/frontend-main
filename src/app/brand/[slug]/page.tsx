import BrandContainer from '@/components/brand/BrandContainer';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

const Brand = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	return (
		<div className='container mx-auto py-2 sm:py-8 px-2 2xl:px-6 3xl:px-0'>
			<Suspense>
				<BrandContainer slug={slug} />
			</Suspense>
			<Separator className='w-full my-4' />
		</div>
	);
};

export default Brand;
