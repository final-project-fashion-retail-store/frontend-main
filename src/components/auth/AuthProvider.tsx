'use client';

import { useEffect } from 'react';
import useAuthStore from '@/stores/authStore';
import { useShallow } from 'zustand/shallow';

type Props = {
	children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
	const [checkAuth, isCheckingAuth] = useAuthStore(
		useShallow((state) => [state.checkAuth, state.isCheckingAuth])
	);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500'></div>
			</div>
		);
	}

	return children;
}
