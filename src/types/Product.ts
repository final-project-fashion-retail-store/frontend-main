import { ProductVariant } from '@/types/ProductVariant';

export type Product = {
	_id: string;
	name: string;
	description: string;
	shortDescription: string;
	price: number;
	salePrice: number;
	category: {
		_id: string;
		name: string;
		slug: string;
	};
	brand: {
		_id: string;
		name: string;
		logo: {
			url: string;
		};
	};
	images: {
		url: string;
	}[];
	colorImages: {
		[color: string]: {
			url: string;
		}[];
	};
	tags: string[];
	gender: string;
	season: string;
	material: string[];
	careInstructions: string;
	variants: ProductVariant[];
	inStock: boolean;
	featuredProduct: boolean;
	averageRating: number;
	totalReviews: number;
	metaTitle: string;
	metaDescription: string;
	slug: string;
};
