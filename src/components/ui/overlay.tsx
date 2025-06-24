type Props = {
	loading?: boolean;
};

const Overlay = ({ loading = false }: Props) => {
	return (
		<div className='fixed top-0 left-0 right-0 bottom-0 min-h-screen flex items-center justify-center bg-accent/40 z-[9999]'>
			{loading && (
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500'></div>
			)}
		</div>
	);
};

export default Overlay;
