export type Review = {
	_id: string;
	user: {
		_id: string;
		fullName: string;
		avatar: {
			url: string;
		};
	};
	product: {
		name: string;
		colorImages: {
			[color: string]: {
				url: string;
			}[];
		};
	};
	rating: number;
	title: string;
	comment: string;
	images: {
		publicId: string;
		url: string;
	}[];
	color: string;
	size: string;
	updatedAt: string;
};
