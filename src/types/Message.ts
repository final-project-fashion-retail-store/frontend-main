export type Message = {
	_id: string;
	sender: string;
	receiver: string;
	text: string;
	isRead: boolean;
	createdAt: string;
	updatedAt: string;
};
