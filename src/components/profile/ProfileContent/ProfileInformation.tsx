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
import { Camera, User } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import useAuthStore from '@/stores/authStore';

const formSchema = z.object({
	firstName: z.string().nonempty('First name is required'),
	lastName: z.string().nonempty('Last name is required'),
	email: z.string().email('Invalid email address'),
	phoneNumber: z.string().optional(),
});

const ProfileInformation = () => {
	const authUser = useAuthStore((state) => state.authUser);
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

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	if (!authUser) return null;
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<User className='w-5 h-5' />
					Profile Information
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				{/* Avatar Section */}
				<div className='flex items-center gap-6'>
					<div className='relative'>
						<Image
							src={authUser.avatar.url}
							alt='Profile'
							width={120}
							height={120}
							className='rounded-full border-4 border-muted-foreground/20'
						/>
						<Button
							size='icon'
							className='absolute bottom-0 right-0 rounded-full p-0 bg-purple-600 hover:bg-purple-700'
						>
							<Camera className='size-4' />
						</Button>
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
							>
								Upload New
							</Button>
							<Button
								variant='ghost'
								size='sm'
								className='text-destructive hover:bg-destructive/10'
							>
								Remove
							</Button>
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
						<div className='flex gap-3 mt-4'>
							<Button
								type='submit'
								className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
							>
								Submit
							</Button>
							<Button
								type='button'
								variant='outline'
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
