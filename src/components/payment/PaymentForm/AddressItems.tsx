import AddressCard from '@/components/payment/PaymentForm/AddressCard';
import { RadioGroup } from '@/components/ui/radio-group';
import { Address } from '@/types';

type Props = {
	addresses: Address[];
	selectedAddress: string;
	setSelectedAddress: (addressId: string) => void;
};

const AddressItems = ({
	addresses,
	selectedAddress,
	setSelectedAddress,
}: Props) => {
	return (
		<RadioGroup
			value={selectedAddress}
			onValueChange={setSelectedAddress}
			className='space-y-4'
		>
			{addresses.map((address) => (
				<AddressCard
					key={address._id}
					address={address}
					isSelected={selectedAddress === address._id}
					onSelect={() => setSelectedAddress(address._id)}
				/>
			))}
		</RadioGroup>
	);
};

export default AddressItems;
