'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';
import { useShallow } from 'zustand/shallow';

type Props = {
	children: React.ReactNode;
	redirectTo?: string;
	requireAuth?: boolean;
};

export default function ProtectedRoute({
	children,
	redirectTo = '/',
	requireAuth = true,
}: Props) {
	const router = useRouter();
	const [authUser, isCheckingAuth, hasInitialized] = useAuthStore(
		useShallow((state) => [
			state.authUser,
			state.isCheckingAuth,
			state.hasInitialized,
		])
	);

	useEffect(() => {
		if (!isCheckingAuth && hasInitialized) {
			if (requireAuth && !authUser) {
				// User is not authenticated, redirect to login
				console.log(authUser);
				router.push(redirectTo);
			}
		}
	}, [
		authUser,
		isCheckingAuth,
		requireAuth,
		router,
		redirectTo,
		hasInitialized,
	]);

	// Show loading while checking auth
	if (isCheckingAuth || !hasInitialized) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500'></div>
			</div>
		);
	}

	// Don't render children if auth requirements aren't met
	if (requireAuth && !authUser) {
		return null; // Will redirect in useEffect
	}

	return children;
}
