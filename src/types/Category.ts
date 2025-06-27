export type Category = {
	_id: string;
	name: string;
	slug: string;
	subcategories: {
		_id: string;
		name: string;
		slug: string;
	}[];
};
