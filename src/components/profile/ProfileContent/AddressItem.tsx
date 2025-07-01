import AlertDialogCustom from '@/components/custom/alert-dialog-custom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Overlay from '@/components/ui/overlay';
import useAuthStore from '@/stores/authStore';
import { Address } from '@/types';
import { Edit, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

type Props = {
	address: Address;
	setShowAddAddress: Dispatch<SetStateAction<boolean>>;
};

const AddressItem = ({ address, setShowAddAddress }: Props) => {
	const [
		setSelectedAddress,
		isDeletingAddress,
		isUpdatingAddress,
		deleteAddress,
		updateAddress,
	] = useAuthStore(
		useShallow((state) => [
			state.setSelectedAddress,
			state.isDeletingAddress,
			state.isUpdatingAddress,
			state.deleteAddress,
			state.updateAddress,
		])
	);

	const handleEditAddress = (address: Address) => {
		setSelectedAddress(address);
		setShowAddAddress(true);
	};

	const handleDeleteAddress = async (addressId: string) => {
		if (isDeletingAddress) return;
		const result = await deleteAddress(addressId);
		if (result.success) {
			toast.success('Address deleted successfully!');
		} else {
			toast.error('Failed to delete address');
		}
	};

	const handleSetDefault = async (addressId: string) => {
		if (isUpdatingAddress) return;
		const result = await updateAddress({ isDefault: true }, addressId);
		if (result.success) {
			toast.success('Address set as default successfully!');
		} else {
			toast.error('Failed to set address as default');
		}
	};

	return (
		<Card
			key={address._id}
			className={address.isDefault ? 'border-purple-200 bg-purple-50/30' : ''}
		>
			{isDeletingAddress || (isUpdatingAddress && <Overlay loading />)}
			<CardContent className='p-6'>
				<div className='flex items-start justify-between'>
					<div className='flex-1 space-y-2'>
						<div className='flex items-center gap-2'>
							<h4 className='font-semibold text-lg'>{address.fullName}</h4>
							<span className='h-3 w-0.25 bg-muted-foreground'></span>
							<span className='text-muted-foreground text-sm'>
								{address.phoneNumber}
							</span>
						</div>
						<div className='text-muted-foreground text-sm'>
							<p>{address.formattedAddress}</p>
						</div>
						<div className='flex items-center gap-2'>
							{address.isDefault && (
								<Badge className='bg-purple-600 text-white text-xs'>Default</Badge>
							)}
							<Badge
								variant={address.isDefault ? 'default' : 'secondary'}
								className='text-xs'
							>
								{address.label === 'Home' && '🏠'}
								{address.label === 'Work' && '🏢'}
								{address.label === 'Other' && '📍'}
								{address.label}
							</Badge>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='sm'
								onClick={() => handleEditAddress(address)}
							>
								<Edit className='size-4' />
							</Button>
							<AlertDialogCustom
								title='Are you sure you want to delete this address?'
								description='This action cannot be undone.'
								handler={[() => handleDeleteAddress(address._id)]}
								asChild
							>
								<Button
									variant='outline'
									size='sm'
									className='text-red-600 hover:text-red-700 hover:border-red-300'
								>
									<Trash2 className='size-4' />
								</Button>
							</AlertDialogCustom>
						</div>
						{!address.isDefault && (
							<Button
								variant='outline'
								size='sm'
								onClick={() => handleSetDefault(address._id)}
								className='text-purple-600 border-purple-200 hover:bg-purple-50 bg-transparent text-xs'
							>
								Set Default
							</Button>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default AddressItem;
