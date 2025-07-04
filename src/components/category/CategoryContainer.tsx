'use client';

import BreadcrumbCustom from '@/components/custom/breadcrumb-custom';
import Filter from '@/components/product/Filter';
import PageHeader from '@/components/product/PageHeader';
import ProductCard from '@/components/product/ProductCard';
import { useState } from 'react';

const mockProducts = [
	{
		id: 1,
		name: 'Classic Cotton T-Shirt',
		brand: 'Nike',
		price: 29.99,
		originalPrice: 39.99,
		image:
			'https://res.cloudinary.com/dx2akttki/image/upload/v1749098608/jmniv3aisp4wkj3hlusg.avif',
		colors: ['Black', 'White', 'Gray', 'Navy'],
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		rating: 4.5,
		reviews: 128,
		inStock: true,
		isNew: false,
		onSale: true,
	},
	{
		id: 2,
		name: 'Premium Polo Shirt',
		brand: 'Adidas',
		price: 49.99,
		originalPrice: 59.99,
		image:
			'https://res.cloudinary.com/dx2akttki/image/upload/v1749633877/hckyymehim9g2jopjmdn.avif',
		colors: ['White', 'Navy', 'Red', 'Green'],
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
		rating: 4.7,
		reviews: 89,
		inStock: true,
		isNew: true,
		onSale: false,
	},
	{
		id: 3,
		name: 'Vintage Graphic Tee',
		brand: 'Puma',
		price: 34.99,
		originalPrice: null,
		image:
			'https://res.cloudinary.com/dx2akttki/image/upload/v1749726904/yzoyrqypmcxckmcijkcy.webp',
		colors: ['Black', 'White', 'Gray'],
		sizes: ['S', 'M', 'L', 'XL'],
		rating: 4.3,
		reviews: 67,
		inStock: false,
		isNew: false,
		onSale: false,
	},
	{
		id: 4,
		name: 'Athletic Performance Tee',
		brand: 'Under Armour',
		price: 39.99,
		originalPrice: 49.99,
		image:
			'https://res.cloudinary.com/dx2akttki/image/upload/v1749098608/jmniv3aisp4wkj3hlusg.avif',
		colors: ['Black', 'Blue', 'Red', 'Gray'],
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		rating: 4.6,
		reviews: 156,
		inStock: true,
		isNew: false,
		onSale: true,
	},
	{
		id: 5,
		name: 'Organic Cotton Basic Tee',
		brand: 'Patagonia',
		price: 45.99,
		originalPrice: null,
		image:
			'https://res.cloudinary.com/dx2akttki/image/upload/v1749633877/hckyymehim9g2jopjmdn.avif',
		colors: ['White', 'Black', 'Green', 'Brown'],
		sizes: ['S', 'M', 'L', 'XL'],
		rating: 4.8,
		reviews: 203,
		inStock: true,
		isNew: true,
		onSale: false,
	},
	{
		id: 6,
		name: 'Striped Long Sleeve Shirt',
		brand: 'Tommy Hilfiger',
		price: 59.99,
		originalPrice: 79.99,
		image:
			'https://res.cloudinary.com/dx2akttki/image/upload/v1749726904/yzoyrqypmcxckmcijkcy.webp',
		colors: ['Navy', 'Red', 'Blue', 'Green'],
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
		rating: 4.4,
		reviews: 92,
		inStock: true,
		isNew: false,
		onSale: true,
	},
];

type Props = {
	params: { slug: string[] };
};

const CategoryContainer = ({ params }: Props) => {
	const [sortBy, setSortBy] = useState('newest');

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		...params.slug.map((segment, index) => ({
			label: segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '),
			href: `/category/${params.slug.slice(0, index + 1).join('/')}`,
		})),
	];

	return (
		<div className='w-full'>
			<BreadcrumbCustom items={breadcrumbs} />
			<PageHeader
				pageTitle={breadcrumbs[breadcrumbs.length - 1].label || 'Products'}
				sortBy={sortBy}
				setSortBy={setSortBy}
			/>
			<div className='flex gap-8'>
				<div className='hidden lg:block w-64 flex-shrink-0'>
					<Filter />
				</div>
				<div className='flex-1'>
					<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
						{mockProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryContainer;
