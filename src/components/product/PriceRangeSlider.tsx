import { useEffect, useState } from 'react';

const PriceRangeSlider = ({
	min,
	max,
	value,
	onChange,
	step = 1,
}: {
	min: number;
	max: number;
	value: [number, number];
	onChange: (value: [number, number]) => void;
	step?: number;
}) => {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newMin = Number(e.target.value);
		const newValue: [number, number] = [newMin, Math.max(newMin, localValue[1])];
		setLocalValue(newValue);
		onChange(newValue);
	};

	const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newMax = Number(e.target.value);
		const newValue: [number, number] = [Math.min(localValue[0], newMax), newMax];
		setLocalValue(newValue);
		onChange(newValue);
	};

	const getPercentage = (value: number) => {
		// Add safety check for division by zero
		if (max === min) return 0;
		const percentage = ((value - min) / (max - min)) * 100;
		return Math.max(0, Math.min(100, percentage));
	};

	// Don't render if min/max are not properly set
	if (min >= max) {
		return (
			<div className='w-full h-8 bg-muted-foreground rounded animate-pulse' />
		);
	}

	return (
		<div className='w-full space-y-3'>
			<div className='relative px-1'>
				{/* Track */}
				<div className='h-2 bg-gray-200 rounded-full relative'>
					{/* Active range */}
					<div
						className='absolute h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full'
						style={{
							left: `${getPercentage(localValue[0])}%`,
							width: `${Math.max(
								0,
								getPercentage(localValue[1]) - getPercentage(localValue[0])
							)}%`,
						}}
					/>
				</div>

				{/* Min slider */}
				<input
					type='range'
					min={min}
					max={max}
					step={step}
					value={localValue[0]}
					onChange={handleMinChange}
					className='absolute top-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer'
				/>

				{/* Max slider */}
				<input
					type='range'
					min={min}
					max={max}
					step={step}
					value={localValue[1]}
					onChange={handleMaxChange}
					className='absolute top-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-pink-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-pink-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer'
				/>
			</div>

			{/* Value display */}
			<div className='flex items-center justify-between text-sm px-1'>
				<span className='text-gray-600'>
					Min: <span className='font-medium text-purple-600'>${localValue[0]}</span>
				</span>
				<span className='text-gray-600'>
					Max: <span className='font-medium text-pink-600'>${localValue[1]}</span>
				</span>
			</div>

			{/* Quick preset buttons */}
			<div className='grid grid-cols-2 gap-1 text-xs'>
				{[
					{
						label: 'Low',
						range: [min, Math.floor(min + (max - min) * 0.3)] as [number, number],
					},
					{
						label: 'Mid',
						range: [
							Math.floor(min + (max - min) * 0.3),
							Math.floor(min + (max - min) * 0.7),
						] as [number, number],
					},
					{
						label: 'High',
						range: [Math.floor(min + (max - min) * 0.7), max] as [number, number],
					},
					{ label: 'All', range: [min, max] as [number, number] },
				].map((preset) => (
					<button
						key={preset.label}
						onClick={() => {
							setLocalValue(preset.range);
							onChange(preset.range);
						}}
						className={`px-2 py-1 text-xs border rounded transition-colors truncate ${
							localValue[0] === preset.range[0] && localValue[1] === preset.range[1]
								? 'border-purple-600 bg-purple-50 text-purple-600'
								: 'border-gray-300 hover:border-gray-400 text-gray-600 hover:bg-gray-50'
						}`}
					>
						{preset.label}
					</button>
				))}
			</div>
		</div>
	);
};

export default PriceRangeSlider;
