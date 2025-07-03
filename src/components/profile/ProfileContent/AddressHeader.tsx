import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	setShowAddAddress: Dispatch<SetStateAction<boolean>>;
};

const AddressHeader = ({ setShowAddAddress }: Props) => {
	return (
		<div className='flex items-center justify-between max-sm:flex-col max-sm:justify-center max-sm:gap-4'>
			<div className='max-sm:text-center max-sm:w-full'>
				<h2 className='text-2xl max-sm:text-xl font-bold'>Shipping Addresses</h2>
				<p className='text-muted-foreground max-sm:text-sm'>
					Manage your delivery addresses
				</p>
			</div>
			<Button
				onClick={() => setShowAddAddress(true)}
				className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 max-sm:self-end'
			>
				<Plus className='size-4 sm:mr-2' />
				<span className='max-sm:hidden'>Add New Address</span>
			</Button>
		</div>
	);
};

export default AddressHeader;
