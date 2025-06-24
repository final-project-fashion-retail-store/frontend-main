import {
	getMessages,
	readMessages,
	sendMessage,
} from '@/services/chatServices';
import useAuthStore from '@/stores/authStore';
import { Message } from '@/types';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type Stores = {
	messages: Message[] | null;
	isGettingMessages: boolean;
	isSendingMessage: boolean;

	getMessages: (staffId: string) => void;
	sendMessage: (
		staffId: string,
		message: string
	) => Promise<{ success: boolean; message?: string }>;
	readMessages: (staffId: string) => void;
	subscribeToMessages: () => void;
	unsubscribeToMessages: () => void;
};

const useChatStore = create<Stores>((set, get) => ({
	messages: null,
	isGettingMessages: false,
	isSendingMessage: false,

	async getMessages(staffId) {
		try {
			set({ isGettingMessages: true });
			const res = await getMessages(staffId);
			set({ messages: res.data.messages });
		} catch (err) {
			if (err instanceof Error) {
				console.error(err);
			}
		} finally {
			set({ isGettingMessages: false });
		}
	},
	async sendMessage(staffId, message) {
		try {
			set({ isSendingMessage: true });
			const res = await sendMessage(staffId, message);
			set({ messages: [...(get().messages || []), res.data.message] });
			return { success: true };
		} catch (err) {
			if (err instanceof Error) {
				console.error(err);
				return {
					success: false,
					message: err.message || 'Failed to send message',
				};
			}
			return {
				success: false,
				message: 'Failed to send message',
			};
		} finally {
			set({ isSendingMessage: false });
		}
	},
	async readMessages(staffId) {
		try {
			await readMessages(staffId);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		}
	},

	subscribeToMessages() {
		const socket = useAuthStore.getState().socket;
		if (!socket) return;

		socket.on('newMessage', (newMessage) => {
			set({
				messages: [...(get().messages || []), newMessage],
			});
		});
	},

	unsubscribeToMessages() {
		const socket = useAuthStore.getState().socket;
		socket?.off('newMessage');
	},
}));

export default useChatStore;
