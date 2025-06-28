export type User = {
	_id: string;
	email: string;
	role: 'user' | 'admin' | 'staff';
	fullName: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	avatar: {
		url: string;
		public_id: string;
	};
	authProvider: 'local' | 'google';
	createdAt: string;
};
