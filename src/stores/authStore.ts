import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { io, Socket } from 'socket.io-client';

import { User, UserDataSend } from '@/types';
import { setRefreshTokenFunction } from '@/lib/axios';
import config from '@/config';
import {
	forgotPassword,
	getCurrentUser,
	login,
	logout,
	resetPassword,
	signup,
} from '@/services/userServices';

type Stores = {
	authUser: User | null;
	isCheckingAuth: boolean;
	isLoggingIn: boolean;
	isSigningUp: boolean;
	isLoggingOut: boolean;
	isSendingEmail: boolean;
	isResettingPassword: boolean;
	socket: Socket | null;

	checkAuth: () => void;
	login: (
		payload: UserDataSend
	) => Promise<{ success: boolean; message?: string }>;
	signup: (
		payload: UserDataSend
	) => Promise<{ success: boolean; message?: string }>;
	logout: () => Promise<{ success: boolean; message?: string }>;
	refreshAccessToken: () => void;
	forgotPassword: (data: {
		email: string;
	}) => Promise<{ success: boolean; message?: string }>;
	resetPassword: (
		data: { password: string; passwordConfirm: string },
		resetPasswordToken: string
	) => Promise<{ success: boolean; message?: string }>;
	connectSocket: () => void;
	disconnectSocket: () => void;
};

export const refreshToken = async () => {
	try {
		const res = await axios.get(
			`${config.NEXT_PUBLIC_BASE_URL}auth/refresh-token`,
			{
				// Skip interceptor for this request to avoid loops
				headers: {
					skipAuthRefresh: true,
					'x-api-key': config.NEXT_PUBLIC_X_API_KEY,
				},
				withCredentials: true,
			}
		);
		return res;
	} catch (err) {
		if (err instanceof AxiosError) throw err;
	}
};

const useAuthStore = create<Stores>((set, get) => ({
	authUser: null,
	isCheckingAuth: false,
	isLoggingIn: false,
	isSigningUp: false,
	isLoggingOut: false,
	isSendingEmail: false,
	isResettingPassword: false,
	socket: null,

	async checkAuth() {
		try {
			set({ isCheckingAuth: true });
			const res = await getCurrentUser();
			set({ authUser: res.data.user });
			get().connectSocket();
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err?.response?.data?.message);
				console.log(err);
			}
		} finally {
			set({ isCheckingAuth: false });
		}
	},
	async login(data) {
		try {
			set({ isLoggingIn: true });
			const res = await login(data);
			set({ authUser: res.data.user });
			return { success: true };
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				console.log(err?.response?.data?.message);
				return {
					success: false,
					message: err.response?.data.message || 'Login failed',
				};
			}
			return {
				success: false,
				messages: 'Login failed',
			};
		} finally {
			set({ isLoggingIn: false });
		}
	},

	async signup(payload) {
		try {
			set({ isSigningUp: true });
			const res = await signup(payload);

			set({ authUser: res.data.user });
			return { success: true };
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				console.log(err?.response?.data?.message);
				return {
					success: false,
					message: err.response?.data.message || 'Signup failed',
				};
			}
			return {
				success: false,
				message: 'Signup failed',
			};
		} finally {
			set({ isSigningUp: false });
		}
	},

	async logout() {
		try {
			set({ isLoggingOut: true });
			await logout();
			set({ authUser: null });
			get().disconnectSocket();
			return { success: true };
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				console.log(err?.response?.data?.message);
				return {
					success: false,
					message: err.response?.data.message || 'Logout failed',
				};
			}
			return {
				success: false,
				message: 'Logout failed',
			};
		} finally {
			set({ isLoggingOut: false });
		}
	},

	async refreshAccessToken() {
		const res = await refreshToken();
		if (!res) {
			throw new Error('Failed to refresh token');
		}
	},

	async forgotPassword(email) {
		try {
			set({ isSendingEmail: true });
			await forgotPassword(email);
			return { success: true };
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				return {
					success: false,
					message: err.response?.data.message || 'Failed to send email',
				};
			}
			return {
				success: false,
				message: 'Failed to send email',
			};
		} finally {
			set({ isSendingEmail: false });
		}
	},

	async resetPassword(data, resetPasswordToken) {
		try {
			set({ isResettingPassword: true });
			await resetPassword(data, resetPasswordToken);
			return { success: true };
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);

				return {
					success: false,
					message: err.response?.data.message || 'Failed to reset password',
				};
			}
			return {
				success: false,
				message: 'Failed to reset password',
			};
		} finally {
			set({ isResettingPassword: false });
		}
	},

	connectSocket() {
		const { authUser, socket } = get();

		// Don't connect if no user or already connected
		if (!authUser || (socket && socket.connected)) {
			console.log('❌ Not connecting socket - no user or already connected');
			return;
		}

		// Disconnect existing socket first
		if (socket) {
			console.log('🔌 Disconnecting existing socket before reconnecting');
			socket.disconnect();
		}

		console.log('🔌 Connecting socket for user:', authUser._id);

		const newSocket = io(config.NEXT_PUBLIC_BASE_URL, {
			query: {
				userId: authUser._id,
			},
			// Force new connection to avoid reusing old connections
			forceNew: true,
			// Reconnection settings
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionAttempts: 5,
			// Transport settings
			transports: ['websocket', 'polling'],
		});

		// Connection event handlers
		newSocket.on('connect', () => {
			console.log('✅ Socket connected:', newSocket.id);
		});

		newSocket.on('disconnect', (reason) => {
			console.log('❌ Socket disconnected:', reason);
		});

		newSocket.on('connect_error', (error) => {
			console.error('🔌 Socket connection error:', error);
		});

		// Test connection
		newSocket.emit('ping', 'test from frontend');
		newSocket.on('pong', (data) => {
			console.log('🏓 Pong received:', data);
		});

		set({ socket: newSocket });
	},

	disconnectSocket: () => {
		const socket = get().socket;
		if (socket) {
			console.log('🔌 Manually disconnecting socket:', socket.id);
			socket.disconnect();
			set({ socket: null });
		}
	},
}));

setRefreshTokenFunction(useAuthStore.getState().refreshAccessToken);

export default useAuthStore;
