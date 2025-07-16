import ImageCustom from '@/components/custom/image-custom';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

type Props = {
	review: {
		id: number;
		user: {
			name: string;
			avatar: string;
			verified: boolean;
		};
		rating: number;
		title: string;
		comment: string;
		date: string;
		helpful: number;
		size: string;
		color: string;
		verified_purchase: boolean;
	};
};

const DetailedProductReviewItem = ({ review }: Props) => {
	return (
		<div
			key={review.id}
			className='border-b border-gray-200 pb-6 last:border-b-0'
		>
			<div className='flex items-start gap-4'>
				<ImageCustom
					src={review.user.avatar}
					alt={review.user.name}
					width={48}
					height={48}
					className='size-12'
				/>
				<div className='flex-1'>
					<div className='flex items-center gap-2 mb-2'>
						<span className='font-semibold'>{review.user.name}</span>
						{/* {review.user.verified && (
							<Badge
								variant='secondary'
								className='bg-green-100 text-green-700 text-xs'
							>
								<Check className='w-3 h-3 mr-1' />
								Verified
							</Badge>
						)}
						{review.verified_purchase && (
							<Badge
								variant='outline'
								className='text-xs'
							>
								Verified Purchase
							</Badge>
						)} */}
					</div>

					<div className='flex max-sm:flex-col max-sm:justify-center sm:items-center gap-4 mb-2'>
						<div className='flex items-center gap-4'>
							<div className='flex items-center'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-4 h-4 ${
											i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
										}`}
									/>
								))}
							</div>
							<span className='text-sm text-gray-600'>{review.date}</span>
						</div>
						<div className='flex gap-2 text-xs'>
							<Badge variant='outline'>Size: {review.size}</Badge>
							<Badge variant='outline'>Color: {review.color}</Badge>
						</div>
					</div>

					<h4 className='font-medium mb-2'>{review.title}</h4>
					<p className='text-gray-700 mb-3'>{review.comment}</p>
				</div>
			</div>
		</div>
	);
};

export default DetailedProductReviewItem;
