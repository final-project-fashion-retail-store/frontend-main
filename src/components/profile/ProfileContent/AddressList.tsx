import AddressItem from '@/components/profile/ProfileContent/AddressItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useAuthStore from '@/stores/authStore';
import { MapPin, Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	setShowAddAddress: Dispatch<SetStateAction<boolean>>;
};

const AddressList = ({ setShowAddAddress }: Props) => {
	const addresses = useAuthStore((state) => state.addresses);

	return (
		<>
			<div className='grid gap-4'>
				{addresses?.map((address) => (
					<AddressItem
						key={address._id}
						address={address}
						setShowAddAddress={setShowAddAddress}
					/>
				))}
			</div>
			{addresses?.length === 0 && (
				<Card>
					<CardContent className='text-center py-12'>
						<MapPin className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
						<h3 className='text-lg font-semibold mb-2'>No addresses yet</h3>
						<p className='text-muted-foreground mb-4'>
							Add your first shipping address to get started
						</p>
						<Button
							onClick={() => setShowAddAddress(true)}
							className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
						>
							<Plus className='w-4 h-4 mr-2' />
							Add Address
						</Button>
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default AddressList;
