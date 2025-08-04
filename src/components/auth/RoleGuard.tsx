'use client';

import useAuthStore from '@/stores/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
	children: React.ReactNode;
	allowedRoles: string[];
};

export default function RoleGuard({ children, allowedRoles }: Props) {
	const authUser = useAuthStore((state) => state.authUser);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!authUser) return;
		const isAllowed = allowedRoles.includes(authUser?.role || '');
		const isAlreadyOnDeniedPage = pathname === '/access-denied';

		if (!isAllowed && !isAlreadyOnDeniedPage) {
			router.replace('/access-denied');
		}
	}, [authUser, allowedRoles, pathname, router]);

	// While checking or redirecting, render nothing to prevent flicker
	const isAllowed = allowedRoles.includes(authUser?.role || '');
	if (authUser && !isAllowed && pathname !== '/access-denied') {
		return null;
	}

	return <>{children}</>;
}
