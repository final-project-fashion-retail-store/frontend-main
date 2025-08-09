import DialogCustom from '@/components/custom/dialog-custom';
import AddressItems from '@/components/payment/PaymentForm/AddressItems';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Address } from '@/types';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Props = {
	addresses: Address[];
	currentAddress: Address | null;
	cardTitle: React.ReactNode;
	addressType: 'shipping' | 'billing';
	dialogTitle: string;
	selectedAddress: string;
	sameAsShipping?: boolean;
	setSelectedAddress: (addressId: string) => void;
	setSameAsShipping?: (same: boolean) => void;
};

const PaymentAddress = ({
	cardTitle,
	dialogTitle,
	addresses,
	addressType,
	selectedAddress,
	sameAsShipping = false,
	setSelectedAddress,
	setSameAsShipping,
	currentAddress,
}: Props) => {
	const [isOpen, setIsOpenChange] = useState(false);

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>{cardTitle}</div>
					<DialogCustom
						isOpen={isOpen}
						setIsOpenChange={setIsOpenChange}
						dialogTitle={dialogTitle}
						body={
							<AddressItems
								addresses={addresses}
								selectedAddress={selectedAddress}
								setSelectedAddress={setSelectedAddress}
							/>
						}
					/>
					{!sameAsShipping && (
						<Button
							type='button'
							variant='outline'
							size='sm'
							className='bg-transparent'
							onClick={() => setIsOpenChange(true)}
						>
							<span className='hidden sm:inline'>Change Address</span>
							<span className='sm:hidden'>Change</span>
							<ChevronDown className='size-4 ml-1' />
						</Button>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				{addressType === 'billing' && (
					<div className='flex items-center space-x-2'>
						<Checkbox
							id='sameAsShipping'
							checked={sameAsShipping}
							onCheckedChange={(checked) => setSameAsShipping?.(checked as boolean)}
						/>
						<Label htmlFor='sameAsShipping'>Same as shipping address</Label>
					</div>
				)}
				{currentAddress && (
					<div className='space-y-2'>
						<div className='flex items-center gap-2'>
							<span className='font-semibold'>{currentAddress.fullName}</span>
							{currentAddress.isDefault && (
								<Badge className='bg-purple-600 text-white text-xs'>Default</Badge>
							)}
							<Badge
								variant='outline'
								className='text-xs'
							>
								{currentAddress.label}
							</Badge>
						</div>
						<p className='text-sm text-muted-foreground/70'>
							{currentAddress.phoneNumber}
						</p>
						<p className='text-sm text-muted-foreground'>
							{currentAddress.addressLine}, {currentAddress.ward},{' '}
							{currentAddress.district}, {currentAddress.city}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default PaymentAddress;
