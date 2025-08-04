export default function Forbidden() {
	return (
		<div className='flex items-center justify-center bg-background min-h-screen'>
			<div className='text-center space-y-4'>
				<h1 className='text-6xl font-bold text-muted-foreground'>403</h1>
				<h2 className='text-2xl font-semibold'>Access Forbidden</h2>
				<p className='text-muted-foreground max-w-md'>
					You don&apos;t have permission to access this resource. Please contact your
					administrator if you believe this is an error.
				</p>
			</div>
		</div>
	);
}
