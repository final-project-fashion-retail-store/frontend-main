import Image from 'next/image';
import { useState } from 'react';

type Props = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	fallbackChar?: string;
	showFallback?: boolean;
	priority?: boolean;
	quality?: number;
};

const ImageCustom = ({
	src,
	alt,
	width,
	height,
	className,
	fallbackChar,
	showFallback = false,
	priority,
	quality,
}: Props) => {
	const [imageError, setImageError] = useState(false);
	return (
		<>
			{!imageError && !showFallback ? (
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					priority={priority}
					quality={quality}
					className={`rounded-full object-cover ${className}`}
					onError={() => setImageError(true)}
				/>
			) : (
				// Fallback content when image fails or no avatar
				<div
					className={`flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-white text-2xl font-semibold ${className}`}
				>
					{fallbackChar || 'FB'}
				</div>
			)}
		</>
	);
};

export default ImageCustom;
