export type RelatedProduct = {
	_id: string;
	name: string;
	price: number;
	salePrice: number;
	category: {
		_id: string;
		name: string;
		slug: string;
	}[];
	brand: {
		_id: string;
		name: string;
		logo: {
			url: string;
		};
	}[];
	images: {
		url: string;
	}[];
	inStock: boolean;
	featuredProduct: boolean;
	averageRating: number;
	totalReviews: number;
	createdAt: string;
	slug: string;
};
