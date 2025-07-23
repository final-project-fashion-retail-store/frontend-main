import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const useConfirmExit = (confirmExit: boolean): void => {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Handle browser reload/close/external navigation
		const handleBeforeUnload = (e: BeforeUnloadEvent): string | void => {
			if (!confirmExit) return;

			// This triggers the browser's native "Reload site?" dialog
			e.preventDefault();
			e.returnValue = '';
			return '';
		};

		if (confirmExit) {
			window.addEventListener('beforeunload', handleBeforeUnload);
		}

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [confirmExit]);

	// For App Router, we need to override the router methods
	useEffect(() => {
		if (!confirmExit) return;

		const originalPush = router.push;
		const originalReplace = router.replace;
		const originalBack = router.back;
		const originalForward = router.forward;

		// Override router.push
		router.push = (...args: Parameters<AppRouterInstance['push']>) => {
			if (window.confirm('Changes you made may not be saved.')) {
				return originalPush.apply(router, args);
			}
		};

		// Override router.replace
		router.replace = (...args: Parameters<AppRouterInstance['replace']>) => {
			if (window.confirm('Changes you made may not be saved.')) {
				return originalReplace.apply(router, args);
			}
		};

		// Override router.back
		router.back = () => {
			if (window.confirm('Changes you made may not be saved.')) {
				return originalBack.apply(router);
			}
		};

		// Override router.forward
		router.forward = () => {
			if (window.confirm('Changes you made may not be saved.')) {
				return originalForward.apply(router);
			}
		};

		// Cleanup - restore original methods
		return () => {
			router.push = originalPush;
			router.replace = originalReplace;
			router.back = originalBack;
			router.forward = originalForward;
		};
	}, [confirmExit, router]);

	// Handle browser navigation (back/forward buttons)
	useEffect(() => {
		if (!confirmExit) return;

		const handlePopState = (): void => {
			if (!window.confirm('Changes you made may not be saved.')) {
				// Prevent the navigation by pushing the current state back
				window.history.pushState(null, '', pathname);
			}
		};

		window.addEventListener('popstate', handlePopState);

		// Push initial state to enable popstate detection
		window.history.pushState(null, '', pathname);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [confirmExit, pathname]);
};

export default useConfirmExit;
