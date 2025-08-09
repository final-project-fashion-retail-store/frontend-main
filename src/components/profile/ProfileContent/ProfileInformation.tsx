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
import { LoaderCircle, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import useAuthStore from '@/stores/authStore';
import { useEffect, useMemo, useRef } from 'react';
import useCommonStore from '@/stores/commonStore';
import { useShallow } from 'zustand/shallow';
import { toast } from 'sonner';
import Overlay from '@/components/ui/overlay';
import ImageCustom from '@/components/custom/image-custom';
import AlertDialogCustom from '@/components/custom/alert-dialog-custom';

const formSchema = z.object({
	firstName: z.string().nonempty('First name is required'),
	lastName: z.string().nonempty('Last name is required'),
	email: z.string().email('Invalid email address'),
	phoneNumber: z.string().optional(),
});

const ProfileInformation = () => {
	const [authUser, isUpdatingProfile, updateProfile] = useAuthStore(
		useShallow((state) => [
			state.authUser,
			state.isUpdatingProfile,
			state.updateProfile,
		])
	);
	const [
		uploadedImages,
		isUploadingImages,
		isDestroyingImages,
		uploadImages,
		destroyImages,
	] = useCommonStore(
		useShallow((state) => [
			state.uploadedImages,
			state.isUploadingImages,
			state.isDestroyingImages,
			state.uploadImages,
			state.destroyImages,
		])
	);

	const inputFileRef = useRef<HTMLInputElement>(null);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: authUser?.firstName || '',
			lastName: authUser?.lastName || '',
			email: authUser?.email || '',
			phoneNumber: authUser?.phoneNumber || '',
		},
	});

	// Watch the form values to determine if there are changes
	const watchedValues = form.watch();
	const hasChanges = useMemo(() => {
		if (!authUser) return false;

		return (
			watchedValues.firstName !== (authUser.firstName || '') ||
			watchedValues.lastName !== (authUser.lastName || '') ||
			watchedValues.phoneNumber !== (authUser.phoneNumber || '')
		);
	}, [watchedValues, authUser]);

	useEffect(() => {
		// Update avatar when uploadedImages changes
		if (uploadedImages && uploadedImages.length > 0) {
			const newAvatar = {
				url: uploadedImages[0].secure_url,
				public_id: uploadedImages[0].public_id || '',
			};
			updateProfile({
				avatar: newAvatar,
			});
		}
	}, [updateProfile, uploadedImages]);

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (isUpdatingProfile) return;

		const result = await updateProfile(values);

		if (result.success) {
			toast.success('Profile updated successfully!');
		} else {
			toast.error('Failed to update profile');
			form.setError('root', { message: result.message });
		}
	}

	const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file) return;
		if (!file.type.startsWith('image/')) {
			toast.error('Please select an image file');
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			toast.error('File size exceeds 5MB');
			return;
		}

		const formData = new FormData();
		formData.append('images', file);

		// Destroy previous image first
		if (authUser?.avatar.public_id) {
			await destroyImages({ publicId: [authUser.avatar.public_id || ''] });
		}

		await uploadImages(formData);
	};

	const handleClickRemoveAvatar = async () => {
		if (!authUser?.avatar.public_id) return;
		await destroyImages({ publicId: [authUser.avatar.public_id] });
		await updateProfile({
			avatar: {
				url: '',
				public_id: '',
			},
		});
	};

	if (!authUser) return null;
	return (
		<Card>
			{(isUploadingImages || isUpdatingProfile || isDestroyingImages) && (
				<Overlay />
			)}
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<User className='w-5 h-5' />
					Profile Information
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				{/* Avatar Section */}
				<input
					ref={inputFileRef}
					type='file'
					accept='image/*'
					hidden
					onChange={handleChangeAvatar}
				/>
				<div className='flex items-center gap-6'>
					<div className='relative'>
						<div className='size-[80px] lg:size-[120px] rounded-full overflow-hidden border-4 border-muted-foreground/20'>
							<ImageCustom
								src={authUser.avatar.url}
								alt='Avatar'
								width={240}
								height={240}
								priority
								showFallback={!authUser.avatar.url}
								className={`${
									isUploadingImages || isDestroyingImages ? 'animate-pulse' : ''
								} size-full`}
							/>
						</div>
						{/* <Button
							size='icon'
							className='absolute bottom-0 right-0 rounded-full p-0 bg-purple-600 hover:bg-purple-700'
							onClick={() => inputFileRef.current?.click()}
						>
							<Camera className='size-4' />
						</Button> */}
					</div>
					<div>
						<h3 className='font-semibold text-lg mb-1'>Profile Photo</h3>
						<p className='text-sm text-muted-foreground mb-3'>
							Upload a new profile photo.
						</p>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='sm'
								onClick={() => inputFileRef.current?.click()}
							>
								Upload New
							</Button>
							<AlertDialogCustom
								title='Remove Profile Photo'
								description='Are you sure you want to remove your profile photo?'
								handler={[handleClickRemoveAvatar]}
								asChild
							>
								<Button
									variant='ghost'
									size='sm'
									className='text-destructive hover:bg-destructive/10'
								>
									Remove
								</Button>
							</AlertDialogCustom>
						</div>
					</div>
				</div>

				<Separator />

				{/* Profile Form */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid md:grid-cols-2 gap-6'
					>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your first name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your last name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												placeholder='Enter your email'
												{...field}
												disabled
											/>
											<FormDescription className='absolute -bottom-6 text-xs text-muted-foreground'>
												Your email cannot be changed.
											</FormDescription>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phoneNumber'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
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
						{form.formState.errors.root?.message && (
							<div className='mb-4'>
								<FormMessage>{form.formState.errors.root.message}</FormMessage>
							</div>
						)}
						<div className='flex gap-3 mt-4'>
							<Button
								type='submit'
								className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
								disabled={!hasChanges || isUpdatingProfile}
							>
								{isUpdatingProfile ? (
									<LoaderCircle className='animate-spin' />
								) : (
									'Submit'
								)}
							</Button>
							<Button
								type='button'
								variant='outline'
								disabled={!hasChanges || isUpdatingProfile}
							>
								Reset
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default ProfileInformation;
