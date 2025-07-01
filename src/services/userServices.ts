import axios from '@/lib/axios';
import { AddressDataSend, UserDataSend } from '@/types';
import { isAxiosError } from 'axios';

export const getCurrentUser = async () => {
	try {
		const res = await axios.get('api/v1/users/current-user');

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const login = async (data: UserDataSend) => {
	try {
		const res = await axios.post('api/v1/auth/login', data);

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const signup = async (data: UserDataSend) => {
	try {
		const res = await axios.post('api/v1/auth/signup', data);

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const logout = async () => {
	try {
		await axios.delete('api/v1/auth/logout');
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const forgotPassword = async (data: { email: string }) => {
	try {
		const res = await axios.post('api/v1/auth/forgot-password', data);

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const resetPassword = async (
	data: {
		password: string;
		passwordConfirm: string;
	},
	resetPasswordToken: string
) => {
	try {
		const res = await axios.patch(
			`api/v1/auth/reset-password/${resetPasswordToken}`,
			data
		);

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const changePassword = async (data: {
	oldPassword: string;
	newPassword: string;
	passwordConfirm: string;
}) => {
	try {
		const res = await axios.patch('api/v1/auth/change-password', data);

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const updateUser = async (data: UserDataSend) => {
	try {
		const res = await axios.patch('api/v1/users/edit-profile', data);

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const deactivateAccount = async () => {
	try {
		await axios.delete('api/v1/users/deactivate-account');
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getAddresses = async () => {
	try {
		const res = await axios.get(
			'api/v1/addresses?fields=-active,-createdAt,-updatedAt&sort=-isDefault'
		);

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const createAddress = async (data: AddressDataSend) => {
	try {
		const res = await axios.post('api/v1/addresses', data);

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const updateAddress = async (
	data: AddressDataSend,
	addressId: string
) => {
	try {
		const res = await axios.patch(`api/v1/addresses/${addressId}`, data);

		return res.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const deleteAddress = async (addressId: string) => {
	try {
		await axios.delete(`api/v1/addresses/${addressId}`);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
