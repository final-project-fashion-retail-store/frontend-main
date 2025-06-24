export type UserDataSend = {
	email?: string;
	password?: string;
	passwordConfirm?: string;
	firstName?: string;
	lastName?: string;
	avatar?: {
		url?: string;
		public_id?: string;
	};
	phoneNumber?: string;
};
