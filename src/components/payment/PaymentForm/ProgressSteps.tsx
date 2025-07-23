const ProgressSteps = () => {
	return (
		<div className='flex items-center justify-center space-x-4 mb-8'>
			<div className='flex items-center'>
				<div className='w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium'>
					1
				</div>
				<span className='ml-2 text-sm font-medium text-purple-600'>Cart</span>
			</div>
			<div className='w-8 h-0.5 bg-purple-600'></div>
			<div className='flex items-center'>
				<div className='w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium'>
					2
				</div>
				<span className='ml-2 text-sm font-medium text-purple-600'>Checkout</span>
			</div>
			<div className='w-8 h-0.5 bg-gray-300'></div>
			<div className='flex items-center'>
				<div className='w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium'>
					3
				</div>
				<span className='ml-2 text-sm text-gray-600'>Complete</span>
			</div>
		</div>
	);
};

export default ProgressSteps;
