import axios from '@/lib/axios';
import { isAxiosError } from 'axios';

export const getMessages = async (staffId: string) => {
	try {
		const response = await axios.get(`api/v1/messages/${staffId}`);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			throw error;
		}
	}
};

export const sendMessage = async (staffId: string, message: string) => {
	try {
		const response = await axios.post(`api/v1/messages/${staffId}`, {
			text: message,
		});
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			throw error;
		}
	}
};

export const readMessages = async (staffId: string) => {
	try {
		await axios.patch(`api/v1/messages/${staffId}`);
	} catch (error) {
		if (isAxiosError(error)) {
			throw error;
		}
	}
};
