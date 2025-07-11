'use client';

import BreadcrumbCustom from '@/components/custom/breadcrumb-custom';
import MobileFilter from '@/components/product/MobileFilter';
import PageHeader from '@/components/product/PageHeader';
import useDebounce from '@/hooks/useDebounce';
import buildApiQuery from '@/lib/buildApiQuery';
import getQueryParams from '@/lib/getQueryParams';
import useProductStore from '@/stores/productStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import FilterSection from '@/components/product/Filter';
import Loader from '@/components/Loader';
import ProductCard from '@/components/product/ProductCard';
import { Filter } from 'lucide-react';

type Props = {
	slug: string;
};

const BrandContainer = ({ slug }: Props) => {
	const [isGettingProducts, products, filter, getProductByBrand, pagination] =
		useProductStore(
			useShallow((state) => [
				state.isGettingProducts,
				state.products,
				state.filter,
				state.getProductByBrand,
				state.pagination,
			])
		);
	const [sortBy, setSortBy] = useState('newest');
	const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
	const [isInitialLoaded, setIsInitialLoaded] = useState(false);
	const [priceRange, setPriceRange] = useState<[number, number]>([
		filter?.available.minPrice || 0,
		filter?.available.maxPrice || 500,
	]);

	const [currentFilters, setCurrentFilters] = useState({
		colors: [] as string[],
		brands: [] as string[],
		sizes: [] as string[],
		genders: [] as string[],
		subcategories: [] as string[],
		seasons: [] as string[],
		materials: [] as string[],
		minPrice: '',
		maxPrice: '',
	});

	const priceDebounce = useDebounce(priceRange, 500);
	const hasUserInteracted = useRef(false);
	const hasGetDataAtFirstTime = useRef(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!searchParams.toString()) {
			getProductByBrand(slug);
		} else {
			// No need to wait, we just skip the firstLoad
			setIsInitialLoaded(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!hasUserInteracted.current) return;
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.set('minPrice', priceDebounce[0].toString());
		currentParams.set('maxPrice', priceDebounce[1].toString());

		// Call API with updated price range
		const updatedQueryParams = getQueryParams(currentParams, filter);
		const apiQuery = buildApiQuery(new URLSearchParams(), updatedQueryParams);
		handleFilterChange(apiQuery);

		router.push(`?${currentParams.toString()}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [priceDebounce]);

	useEffect(() => {
		// Initialize price range with filter data only once
		if (
			filter?.available.minPrice !== undefined &&
			filter?.available.maxPrice !== undefined
		) {
			setPriceRange([
				Number(filter.available.minPrice) || 0,
				Number(filter.available.maxPrice) || 500,
			]);
		}
	}, [filter?.available.minPrice, filter?.available.maxPrice]);

	useEffect(() => {
		if (
			!searchParams.toString() ||
			hasGetDataAtFirstTime.current ||
			!isInitialLoaded
		)
			return;

		const queryParams = getQueryParams(searchParams, filter);

		const apiQuery = buildApiQuery(new URLSearchParams(), queryParams);
		// console.log(apiQuery);
		handleFilterChange(apiQuery);
		if (filter) {
			hasGetDataAtFirstTime.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter, isInitialLoaded]);

	useEffect(() => {
		const queryParams = getQueryParams(searchParams, filter);

		setCurrentFilters(queryParams);

		if (!hasUserInteracted.current) {
			setPriceRange([
				Number(queryParams.minPrice) || filter?.available.minPrice || 0,
				Number(queryParams.maxPrice) || filter?.available.maxPrice || 500,
			]);
		}
	}, [searchParams, filter]);

	const handleFilterChange = (queries: string) => {
		getProductByBrand(slug, queries);
	};

	const updateQueryParam = (key: string, value: string) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		const existingValues =
			currentParams.get(key)?.split(',').filter(Boolean) ?? [];

		let newValues = [];
		if (existingValues.includes(value)) {
			newValues = existingValues.filter((v) => v !== value);
		} else {
			newValues = [...existingValues, value];
		}

		if (newValues.length > 0) {
			currentParams.set(key, newValues.join(','));
		} else {
			currentParams.delete(key);
		}

		// call api
		const updatedQueryParams = getQueryParams(currentParams, filter);

		// Build the API query with the updated params
		const apiQuery = buildApiQuery(new URLSearchParams(), updatedQueryParams);
		handleFilterChange(apiQuery);
		router.push(`?${currentParams.toString()}`);
	};

	const updatePriceRange = (newRange: [number, number]) => {
		hasUserInteracted.current = true;
		setPriceRange(newRange);
	};

	const clearAllFilters = () => {
		hasUserInteracted.current = false;
		handleFilterChange('');
		router.push(window.location.pathname);
	};

	const getActiveFiltersCount = () => {
		return (
			currentFilters.colors.length +
			currentFilters.brands.length +
			currentFilters.sizes.length +
			currentFilters.genders.length +
			currentFilters.subcategories.length +
			currentFilters.seasons.length +
			currentFilters.materials.length +
			(currentFilters.minPrice ? 1 : 0) +
			(currentFilters.maxPrice ? 1 : 0)
		);
	};

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Brand', href: `/brand/${slug}` },
	];

	return (
		<div className='w-full'>
			<div className='max-sm:hidden'>
				<BreadcrumbCustom items={breadcrumbs} />
			</div>
			<PageHeader
				pageTitle={breadcrumbs[breadcrumbs.length - 1].label || 'Products'}
				productCount={pagination?.totalDocs || 0}
				sortBy={sortBy}
				isMobileFiltersOpen={isMobileFiltersOpen}
				setIsMobileFiltersOpen={setIsMobileFiltersOpen}
				setSortBy={setSortBy}
				getActiveFiltersCount={getActiveFiltersCount}
			/>
			<div className='flex gap-8'>
				<div className='hidden lg:block w-64 flex-shrink-0'>
					{filter && (
						<FilterSection
							showCategory
							filter={filter}
							getActiveFiltersCount={getActiveFiltersCount}
							clearAllFilters={clearAllFilters}
							currentFilters={currentFilters}
							updateQueryParam={updateQueryParam}
							priceRange={priceRange}
							updatePriceRange={updatePriceRange}
						/>
					)}
				</div>
				<div className='flex-1'>
					{isGettingProducts && (
						<div className='flex items-center justify-center h-64'>
							<Loader />
						</div>
					)}
					{!isGettingProducts && products && (
						<div className='grid gap-4 grid-cols-2 xl:grid-cols-3'>
							{products.length > 0 &&
								products.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
									/>
								))}
						</div>
					)}

					{products?.length === 0 && (
						<div className='text-center py-12'>
							<div className='text-muted-foreground/60 mb-4'>
								<Filter className='w-16 h-16 mx-auto' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>No products found</h3>
							<p className='text-muted-foreground mb-4'>
								Try adjusting your filters or search terms
							</p>
						</div>
					)}
				</div>
			</div>
			<MobileFilter
				filter={filter}
				currentFilters={currentFilters}
				showCategory
				isMobileFiltersOpen={isMobileFiltersOpen}
				setIsMobileFiltersOpen={setIsMobileFiltersOpen}
				updateQueryParam={updateQueryParam}
				priceRange={priceRange}
				updatePriceRange={updatePriceRange}
				clearAllFilters={clearAllFilters}
			/>
		</div>
	);
};

export default BrandContainer;
