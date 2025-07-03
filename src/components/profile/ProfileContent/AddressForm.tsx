import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import SelectFormCustom from '@/components/custom/select-form-custom';

import { useShallow } from 'zustand/shallow';
import useCommonStore from '@/stores/commonStore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import useAuthStore from '@/stores/authStore';
import { toast } from 'sonner';
import Overlay from '@/components/ui/overlay';

const labelItems = [
	{
		id: 'Home',
		name: 'Home',
	},
	{
		id: 'Work',
		name: 'Work',
	},
	{
		id: 'Other',
		name: 'Other',
	},
];

const formSchema = z.object({
	fullName: z.string().nonempty('Full name is required'),
	addressLine: z.string().nonempty('Address line is required'),
	city: z.string().nonempty('City is required'),
	district: z.string().nonempty('District is required'),
	ward: z.string().nonempty('Ward is required'),
	phoneNumber: z.string().nonempty('Phone number is required'),
	label: z.string().nonempty('Label is required'),
	isDefault: z.boolean().optional(),
});

type Props = {
	setShowAddAddress: Dispatch<SetStateAction<boolean>>;
};

const AddressForm = ({ setShowAddAddress }: Props) => {
	const [
		provinces,
		districts,
		wards,
		getProvinces,
		getDistricts,
		getWards,
		reset,
	] = useCommonStore(
		useShallow((state) => [
			state.provinces,
			state.districts,
			state.wards,
			state.getProvinces,
			state.getDistricts,
			state.getWards,
			state.reset,
		])
	);
	const [
		selectedAddress,
		isCreatingAddress,
		isUpdatingAddress,
		createAddress,
		updateAddress,
		setSelectedAddress,
	] = useAuthStore(
		useShallow((state) => [
			state.selectedAddress,
			state.isCreatingAddress,
			state.isUpdatingAddress,
			state.createAddress,
			state.updateAddress,
			state.setSelectedAddress,
		])
	);
	const [selectedCity, setSelectedCity] = useState(selectedAddress?.city || '');
	const [selectedDistrict, setSelectedDistrict] = useState(
		selectedAddress?.district || ''
	);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: selectedAddress
			? {
					fullName: selectedAddress.fullName,
					addressLine: selectedAddress.addressLine,
					city: selectedAddress.city,
					district: selectedAddress.district,
					ward: selectedAddress.ward,
					phoneNumber: selectedAddress.phoneNumber,
					label: selectedAddress.label,
					isDefault: selectedAddress.isDefault,
			  }
			: {
					fullName: '',
					addressLine: '',
					city: '',
					district: '',
					ward: '',
					phoneNumber: '',
					label: '',
					isDefault: false,
			  },
	});

	useEffect(() => {
		getProvinces();
	}, [getProvinces]);

	useEffect(() => {
		if (selectedCity && provinces) {
			const province = provinces.find(
				(province) => province.name === selectedCity
			);
			if (province) {
				getDistricts(province.id);
			}
		}
	}, [selectedCity, provinces, getDistricts, form]);

	useEffect(() => {
		if (selectedDistrict && districts) {
			const district = districts.find(
				(district) => district.name === selectedDistrict
			);
			if (district) {
				getWards(district.id);
			}
		}
	}, [selectedDistrict, districts, getWards, form]);

	const handleChangeSelect = (value: string, fieldName: string) => {
		switch (fieldName) {
			case 'city':
				form.setValue('district', '');
				form.setValue('ward', '');
				setSelectedCity(value);
				break;
			case 'district':
				form.setValue('ward', '');
				setSelectedDistrict(value);
				break;
			case 'ward':
				break;
			default:
				console.log('Invalid field');
		}
	};

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (isCreatingAddress || isUpdatingAddress) return;
		let result, successMessage, errorMessage;
		if (selectedAddress) {
			// Update existing address
			result = await updateAddress(values, selectedAddress._id);
			successMessage = 'Address updated successfully!';
			errorMessage = 'Failed to update address';
		} else {
			result = await createAddress(values);
			successMessage = 'Address created successfully!';
			errorMessage = 'Failed to create address';
		}

		if (result.success) {
			toast.success(successMessage);
			form.reset();
			setShowAddAddress(false);
		} else {
			toast.error(errorMessage);
			form.setError('root', { message: result.message });
		}
	}
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			<Card>
				{isCreatingAddress && <Overlay />}
				<CardHeader>
					<CardTitle>
						{selectedAddress ? 'Edit Address' : 'Add New Address'}
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-2'
						>
							<FormField
								control={form.control}
								name='fullName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Full Name <span className='text-destructive'>*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter your full name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='addressLine'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Address Line <span className='text-destructive'>*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter your address line'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='grid md:grid-cols-2 gap-4'>
								<SelectFormCustom
									className='w-full'
									control={form.control}
									name='city'
									label='City'
									placeholder='Select City'
									items={provinces}
									passToValue='name'
									onValueChange={handleChangeSelect}
									required
								/>
								<SelectFormCustom
									className='w-full'
									control={form.control}
									name='district'
									label='District'
									placeholder='Select District'
									items={districts}
									passToValue='name'
									onValueChange={handleChangeSelect}
									required
								/>
							</div>
							<div className='grid md:grid-cols-2 gap-4'>
								<SelectFormCustom
									className='w-full'
									control={form.control}
									name='ward'
									label='Ward'
									placeholder='Select Ward'
									items={wards}
									passToValue='name'
									onValueChange={handleChangeSelect}
									required
								/>
								<SelectFormCustom
									className='w-full'
									control={form.control}
									name='label'
									label='Label'
									placeholder='Select Label'
									items={labelItems}
									required
								/>
							</div>
							<FormField
								control={form.control}
								name='phoneNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Phone Number <span className='text-destructive'>*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter your phone number'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='isDefault'
								render={({ field }) => (
									<FormItem className='flex flex-row items-start space-x-1 space-y-0'>
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												// disabled={!!selectedAddress && form.getValues('isDefault')}
											/>
										</FormControl>
										<div className='grid gap-1.5 leading-none'>
											<FormLabel className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
												Set as default shipping address
											</FormLabel>
											<FormDescription className='text-xs text-muted-foreground'>
												This address will be selected by default for new orders
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>
							{form.formState.errors.root?.message && (
								<div className='mb-4'>
									<FormMessage>{form.formState.errors.root.message}</FormMessage>
								</div>
							)}
							<div className='flex gap-2'>
								<Button type='submit'>
									{isCreatingAddress ? (
										<LoaderCircle className='animate-spin' />
									) : (
										'Save Address'
									)}
								</Button>
								<Button
									type='button'
									variant={'outline'}
									onClick={() => {
										setShowAddAddress(false);
										setSelectedAddress(null);
										reset();
									}}
								>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default AddressForm;
