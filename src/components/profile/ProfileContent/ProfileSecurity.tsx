import { motion } from 'framer-motion';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';

const formSchema = z
	.object({
		username: z.string(),
		oldPassword: z.string().min(6, 'Old password is required'),
		newPassword: z.string().min(6, 'New password is required'),
		passwordConfirm: z.string(),
	})
	.refine((data) => data.newPassword === data.passwordConfirm, {
		message: 'New password and confirmation must match',
		path: ['passwordConfirm'],
	});

const ProfileSecurity = () => {
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			oldPassword: '',
			newPassword: '',
			passwordConfirm: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Lock className='size-5' />
					Security
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='flex items-center justify-between p-4 border rounded-lg'>
					<div>
						<h4 className='font-medium'>Password</h4>
						<p className='text-sm text-muted-foreground'>Last changed 3 months ago</p>
					</div>
					<Button
						variant='outline'
						onClick={() => setShowChangePassword(true)}
					>
						Change Password
					</Button>
				</div>

				{showChangePassword && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						className='border rounded-lg p-4 space-y-4'
					>
						<h4 className='font-medium'>Change Password</h4>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-4'
							>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem className='hidden'>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													type='text'
													placeholder='Enter your username'
													autoComplete='username'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='oldPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Current Password</FormLabel>
											<FormControl>
												<div className='relative'>
													<Input
														type={showOldPassword ? 'text' : 'password'}
														placeholder='Enter your current password'
														autoComplete='current-password'
														{...field}
													/>
													<span className='absolute right-4 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground cursor-pointer'>
														{showOldPassword ? (
															<Eye
																className='size-full'
																onClick={() => setShowOldPassword(false)}
															/>
														) : (
															<EyeOff
																className='size-full'
																onClick={() => setShowOldPassword(true)}
															/>
														)}
													</span>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='newPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel>New Password</FormLabel>
											<FormControl>
												<div className='relative'>
													<Input
														type={showNewPassword ? 'text' : 'password'}
														placeholder='Enter your new password'
														autoComplete='new-password'
														{...field}
													/>
													<span className='absolute right-4 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground cursor-pointer'>
														{showNewPassword ? (
															<Eye
																className='size-full'
																onClick={() => setShowNewPassword(false)}
															/>
														) : (
															<EyeOff
																className='size-full'
																onClick={() => setShowNewPassword(true)}
															/>
														)}
													</span>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='passwordConfirm'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm New Password</FormLabel>
											<FormControl>
												<div className='relative'>
													<Input
														type={showConfirmPassword ? 'text' : 'password'}
														placeholder='Confirm your new password'
														autoComplete='new-password'
														{...field}
													/>
													<span className='absolute right-4 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground cursor-pointer'>
														{showConfirmPassword ? (
															<Eye
																className='size-full'
																onClick={() => setShowConfirmPassword(false)}
															/>
														) : (
															<EyeOff
																className='size-full'
																onClick={() => setShowConfirmPassword(true)}
															/>
														)}
													</span>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex gap-2'>
									<Button size='sm'>Update Password</Button>
									<Button
										variant='outline'
										size='sm'
										onClick={() => {
											setShowChangePassword(false);
											form.reset();
										}}
									>
										Cancel
									</Button>
								</div>
							</form>
						</Form>
					</motion.div>
				)}
			</CardContent>
		</Card>
	);
};

export default ProfileSecurity;
