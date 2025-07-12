import DetailedProductContainer from '@/components/product/DetailedProductContainer';

const DetailedProduct = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;
	return (
		<div>
			<DetailedProductContainer slug={slug} />
		</div>
	);
};

export default DetailedProduct;
