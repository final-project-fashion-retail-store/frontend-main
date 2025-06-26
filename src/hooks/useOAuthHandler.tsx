import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export const useOAuthHandler = () => {
	const searchParams = useSearchParams();
	const hasHandled = useRef(false);

	useEffect(() => {
		if (hasHandled.current) return;

		const error = searchParams.get('error');
		const success = searchParams.get('login');
		if (error || success) {
			hasHandled.current = true;
			if (error) {
				let errorMessage = 'An error occurred during login';

				switch (error) {
					case 'cancelled':
						errorMessage = 'Google sign-in was cancelled';
						break;
					case 'oauth_failed':
						errorMessage = 'Google sign-in failed. Please try again';
						break;
					case 'callback_failed':
						errorMessage = 'Login failed. Please try again';
						break;
					case 'no_code':
						errorMessage = 'Invalid authorization code';
						break;
					case 'account_exists':
						errorMessage =
							'This email is already registered with a password. Please login using your password.';
						break;
					default:
						errorMessage = 'Login failed. Please try again';
				}

				toast.error(errorMessage);
			} else if (success === 'success') {
				console.log('Successfully logged in with Google!');
				toast.success('Successfully logged in with Google!');
			}

			const newUrl = new URL(window.location.href);
			newUrl.searchParams.delete('error');
			newUrl.searchParams.delete('login');
			window.history.replaceState({}, '', newUrl.pathname);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
