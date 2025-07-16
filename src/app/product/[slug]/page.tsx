import DetailedProductContainer from '@/components/product/DetailedProductContainer';
import { Separator } from '@/components/ui/separator';

const DetailedProduct = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;
	return (
		<div className='container mx-auto py-2 sm:py-8 px-2 2xl:px-6 3xl:px-0'>
			<DetailedProductContainer slug={slug} />
			<Separator className='w-full my-4' />
		</div>
	);
};

export default DetailedProduct;
