export type ReviewDataSend = {
	orderId?: string;
	productId?: string;
	variantId?: string;
	rating?: number;
	title?: string;
	content?: string;
	images?: {
		publicId: string;
		url: string;
	}[];
};
