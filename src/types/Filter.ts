export type Filter = {
	available: {
		brands: {
			_id: string;
			name: string;
			logo: {
				url: string;
			};
		}[];
		subcategories: {
			_id: string;
			name: string;
			slug: string;
		}[];
		colors: string[];
		sizes: string[];
		genders: string[];
		seasons: string[];
		materials: string[];
		minPrice: number;
		maxPrice: number;
	};
	applied: {
		brands: string[];
		subcategories: string[];
		colors: string[];
		sizes: string[];
		genders: string[];
		seasons: string[];
		materials: string[];
		minPrice: number;
		maxPrice: number;
	};
};
