import DetailedProductContainer from '@/components/product/DetailedProductContainer';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

import { getProduct } from '@/services/productServices';

const getProductBySlug = async (slug: string) => {
	try {
		const res = await getProduct(slug);
		return res.data.product;
	} catch (error) {
		console.error('Error fetching product by slug:', error);
		return null;
	}
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	return {
		title: product.metaTitle || product.name,
		description: product.metaDescription || product.shortDescription,
		openGraph: {
			title: product.metaTitle || product.name,
			description: product.metaDescription || product.shortDescription,
			images: product.images?.length
				? [{ url: product.images[0].url, alt: product.name }]
				: [],
		},
		twitter: {
			card: 'summary_large_image',
			title: product.metaTitle || product.name,
			description: product.metaDescription || product.shortDescription,
			images: product.images?.[0]?.url || '',
		},
	};
}

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
