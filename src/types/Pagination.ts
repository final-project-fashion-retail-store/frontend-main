export type Pagination = {
	totalDocs: number;
	totalPages: number;
	accumulator: number;
	currentPage: number;
	nextPage: string | null;
	prevPage: string | null;
};
