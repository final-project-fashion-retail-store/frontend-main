import { useRef, useEffect } from 'react';

export default function useDebounceCallback<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends (...args: any[]) => void
>(callback: T, delay: number) {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (...args: Parameters<T>) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			callback(...args);
		}, delay);
	};
}
