import { Badge } from '@/components/ui/badge';
import { DialogClose } from '@/components/ui/dialog';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Address } from '@/types';

type Props = {
	address: Address;
	isSelected: boolean;
	onSelect: () => void;
};

const AddressCard = ({ address, isSelected, onSelect }: Props) => {
	return (
		<DialogClose asChild>
			<div
				className={`p-4 border rounded-lg cursor-pointer transition-all ${
					isSelected
						? 'border-purple-600 bg-purple-50'
						: 'border-gray-300 hover:border-gray-400'
				}`}
				onClick={onSelect}
			>
				<div className='flex items-start justify-between'>
					<div className='flex-1'>
						<div className='flex items-center gap-2 mb-2'>
							<span className='font-semibold text-gray-900'>{address.fullName}</span>
							{address.isDefault && (
								<Badge className='bg-purple-600 text-white text-xs'>Default</Badge>
							)}
							<Badge
								variant='outline'
								className='text-xs'
							>
								{address.label}
							</Badge>
						</div>
						<p className='text-sm text-gray-600 mb-1'>{address.phoneNumber}</p>
						<p className='text-sm text-gray-700'>
							{address.addressLine}, {address.ward}, {address.district}, {address.city}
						</p>
					</div>
					<RadioGroupItem
						value={address._id}
						className='mt-1'
					/>
				</div>
			</div>
		</DialogClose>
	);
};

export default AddressCard;
