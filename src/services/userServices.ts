import axios from '@/lib/axios';
import { UserDataSend } from '@/types';
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
