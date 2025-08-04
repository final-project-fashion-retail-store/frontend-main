export type BestSellingProduct = {
	_id: string;
	name: string;
	slug: string;
	price: number;
	salePrice: number;
	images: { url: string }[];
	averageRating: number;
	totalReviews: number;
	inStock: boolean;
	totalSold: number;
	category: {
		name: string;
	}[];
	brand: {
		name: string;
	}[];
};
