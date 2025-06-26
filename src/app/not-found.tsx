import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex items-center justify-center bg-background'>
			<div className='text-center space-y-4'>
				<h1 className='text-6xl font-bold text-muted-foreground'>404</h1>
				<h2 className='text-2xl font-semibold'>Page Not Found</h2>
				<p className='text-muted-foreground max-w-md'>
					The page you are looking for might have been removed, had its name changed,
					or is temporarily unavailable.
				</p>
				<Link
					href='/'
					className='inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors'
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
}
