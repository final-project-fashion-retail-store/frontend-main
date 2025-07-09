type QueryParams = {
	colors: string[];
	brands: string[];
	sizes: string[];
	genders: string[];
	subcategories: string[];
	seasons: string[];
	materials: string[];
	minPrice: string;
	maxPrice: string;
};

const buildApiQuery = (params: URLSearchParams, query: QueryParams) => {
	const {
		colors,
		brands,
		sizes,
		genders,
		subcategories,
		seasons,
		materials,
		minPrice,
		maxPrice,
	} = query;

	if (colors.length) params.set('colors', colors.join(','));
	if (brands.length) params.set('brands', brands.join(','));
	if (sizes.length) params.set('sizes', sizes.join(','));
	if (genders.length) params.set('genders', genders.join(','));
	if (subcategories.length) params.set('subcategories', subcategories.join(','));
	if (seasons.length) params.set('seasons', seasons.join(','));
	if (materials.length) params.set('materials', materials.join(','));
	if (minPrice) params.set('minPrice', minPrice);
	if (maxPrice) params.set('maxPrice', maxPrice);

	return params.toString().replace(/%2C/g, ',');
};

export default buildApiQuery;
