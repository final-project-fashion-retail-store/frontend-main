import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	setShowAddAddress: Dispatch<SetStateAction<boolean>>;
};

const AddressHeader = ({ setShowAddAddress }: Props) => {
	return (
		<div className='flex items-center justify-between'>
			<div>
				<h2 className='text-2xl font-bold'>Shipping Addresses</h2>
				<p className='text-gray-600'>Manage your delivery addresses</p>
			</div>
			<Button
				onClick={() => setShowAddAddress(true)}
				className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
			>
				<Plus className='w-4 h-4 mr-2' />
				Add New Address
			</Button>
		</div>
	);
};

export default AddressHeader;
