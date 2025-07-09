'use client';

import { useEffect } from 'react';
import useAuthStore from '@/stores/authStore';
import { useShallow } from 'zustand/shallow';
import Loader from '@/components/Loader';

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
		return <Loader />;
	}

	return children;
}
