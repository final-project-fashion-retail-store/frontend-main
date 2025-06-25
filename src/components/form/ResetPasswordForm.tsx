'use client';

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
import { Eye, EyeOff, LoaderCircle, Lock } from 'lucide-react';
import useAuthStore from '@/stores/authStore';
import { useShallow } from 'zustand/shallow';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const formSchema = z
	.object({
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.nonempty('Password is required'),
		passwordConfirm: z.string(),
		username: z.string().optional(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ['passwordConfirm'],
	});

type Props = {
	resetPasswordToken: string;
};

const ResetPasswordForm = ({ resetPasswordToken }: Props) => {
	const [isResettingPassword, resetPassword] = useAuthStore(
		useShallow((state) => [state.isResettingPassword, state.resetPassword])
	);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const router = useRouter();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			passwordConfirm: '',
			username: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		const result = await resetPassword(values, resetPasswordToken);
		if (result.success) {
			toast.success('Password reset successfully! You can now log in.');
			form.reset();
			router.push('/');
		} else {
			toast.error('Failed to reset password');
			form.setError('root', { message: result.message });
		}
	}
	return (
		<Form {...form}>
			{form.formState.errors.root?.message && (
				<div className='mb-4'>
					<FormMessage>{form.formState.errors.root.message}</FormMessage>
				</div>
			)}
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='hidden'>
							<FormLabel>User Name</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										placeholder='Enter your username'
										{...field}
										className='pl-8 h-12'
										autoComplete='username'
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder='Create a password'
										{...field}
										className='pl-8 h-12'
										autoComplete='new-password'
									/>
									<Lock className='absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
									<span className='absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground'>
										{showPassword ? (
											<Eye
												className='size-full cursor-pointer'
												onClick={() => setShowPassword(false)}
											/>
										) : (
											<EyeOff
												className='size-full cursor-pointer'
												onClick={() => setShowPassword(true)}
											/>
										)}
									</span>
								</div>
							</FormControl>
							<FormDescription>
								Your password must be at least 6 characters long.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='passwordConfirm'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										type={showConfirmPassword ? 'text' : 'password'}
										placeholder='Confirm your password'
										{...field}
										className='pl-8 h-12'
										autoComplete='new-password'
									/>
									<Lock className='absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
									<span className='absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground'>
										{showConfirmPassword ? (
											<Eye
												className='size-full cursor-pointer'
												onClick={() => setShowConfirmPassword(false)}
											/>
										) : (
											<EyeOff
												className='size-full cursor-pointer'
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
				<Button
					type='submit'
					className='w-full'
					size={'lg'}
				>
					{isResettingPassword ? (
						<LoaderCircle className='animate-spin' />
					) : (
						'Reset Password'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default ResetPasswordForm;
