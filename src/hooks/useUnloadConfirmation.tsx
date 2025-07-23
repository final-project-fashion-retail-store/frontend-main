import { useEffect } from 'react';

function useUnloadConfirmation(enabled = true) {
	useEffect(() => {
		if (!enabled) return;

		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			event.returnValue = ''; // Required for some browsers
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [enabled]);
}

export default useUnloadConfirmation;
