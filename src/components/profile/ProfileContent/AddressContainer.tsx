import AddressForm from '@/components/profile/ProfileContent/AddressForm';
import AddressHeader from '@/components/profile/ProfileContent/AddressHeader';
import AddressList from '@/components/profile/ProfileContent/AddressList';
import useAuthStore from '@/stores/authStore';
import { useEffect, useState } from 'react';

const AddressContainer = () => {
	const getAddresses = useAuthStore((state) => state.getAddresses);
	const [showAddAddress, setShowAddAddress] = useState(false);

	useEffect(() => {
		getAddresses();
	}, [getAddresses]);
	return (
		<>
			<AddressHeader setShowAddAddress={setShowAddAddress} />
			{showAddAddress && <AddressForm setShowAddAddress={setShowAddAddress} />}
			<AddressList setShowAddAddress={setShowAddAddress} />
		</>
	);
};

export default AddressContainer;
