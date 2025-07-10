import { Product } from '@/types/Product';

export type SearchResultPopup = {
	products: Product[];
	subcategories: {
		_id: string;
		name: string;
		slug: string;
		productCount: number;
		parentCategory: {
			_id: string;
			name: string;
			slug: string;
		}[];
	}[];
	brands: {
		_id: string;
		name: string;
		slug: string;
		productCount: number;
		logo: {
			url: string;
		};
	}[];
};
