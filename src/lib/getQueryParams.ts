import { Filter } from '@/types';
import { ReadonlyURLSearchParams } from 'next/dist/client/components/navigation';

const getQueryParams = (
	searchParams: ReadonlyURLSearchParams | URLSearchParams,
	filter: Filter | null
) => {
	const colors = searchParams.get('colors')?.split(',').filter(Boolean) ?? [];
	const brandNames =
		searchParams.get('brands')?.split(',').filter(Boolean) ?? [];
	const sizes = searchParams.get('sizes')?.split(',').filter(Boolean) ?? [];
	const genders = searchParams.get('gender')?.split(',').filter(Boolean) ?? [];
	const subcategoryNames =
		searchParams.get('subcategories')?.split(',').filter(Boolean) ?? [];
	const seasons = searchParams.get('seasons')?.split(',').filter(Boolean) ?? [];
	const materials =
		searchParams.get('materials')?.split(',').filter(Boolean) ?? [];
	const minPrice = searchParams.get('minPrice') ?? '';
	const maxPrice = searchParams.get('maxPrice') ?? '';

	const subcategoryIds = subcategoryNames
		.map((name) => {
			const subcategory = filter?.available.subcategories.find(
				(sub) => sub.name === name
			);
			return subcategory?._id || '';
		})
		.filter(Boolean);

	const brandIds = brandNames
		.map((name) => {
			const brand = filter?.available.brands.find((b) => b.name === name);
			return brand?._id || '';
		})
		.filter(Boolean);

	return {
		colors,
		brands: brandIds,
		sizes,
		genders,
		subcategories: subcategoryIds,
		seasons,
		materials,
		minPrice,
		maxPrice,
	};
};

export default getQueryParams;
