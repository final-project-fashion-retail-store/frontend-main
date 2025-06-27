'use client';

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
	FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, LoaderCircle, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Google } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import useAuthStore from '@/stores/authStore';
import { useShallow } from 'zustand/shallow';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useGeneralStore from '@/stores/generalStore';
import getOauthGoogleUrl from '@/lib/getOauthGoogleUrl';

const formSchema = z
	.object({
		firstName: z.string().nonempty('First name is required'),
		lastName: z.string().nonempty('Last name is required'),
		email: z.string().email().nonempty('Email is required'),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.nonempty('Password is required'),
		passwordConfirm: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ['passwordConfirm'],
	});

const SignupForm = () => {
	const [isSigningUp, signup] = useAuthStore(
		useShallow((state) => [state.isSigningUp, state.signup])
	);
	const setForm = useGeneralStore((state) => state.setForm);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isCheckedTerms, setIsCheckedTerms] = useState(true);

	const oauthURL = getOauthGoogleUrl();

	const router = useRouter();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const result = await signup(values);
		if (result.success) {
			toast.success('Account created successfully!');
			router.push('/');
		} else {
			toast.error(result.message);
			form.setError('root', {
				type: 'custom',
				message: result.message,
			});
		}
	}

	return (
		<div className='flex-1 max-h-full overflow-y-auto px-2 scrollbar-hide'>
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
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='Enter your first name'
											{...field}
											className='pl-8 h-12'
											autoComplete='first-name'
										/>
										<User className='absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
									</div>
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
									<div className='relative'>
										<Input
											placeholder='Enter your last name'
											{...field}
											className='pl-8 h-12'
											autoComplete='last-name'
										/>
										<User className='absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
									</div>
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
											className='pl-8 h-12'
											autoComplete='email'
										/>
										<Mail className='absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
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
								<FormLabel>Password</FormLabel>
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
					<div className='flex items-start space-x-2'>
						<Checkbox
							id='terms'
							className='mt-0.5'
							checked={isCheckedTerms}
							onCheckedChange={(checked) => setIsCheckedTerms(!!checked)}
						/>
						<Label
							htmlFor='terms'
							className='inline-block text-sm text-muted-foreground leading-relaxed cursor-pointer'
						>
							I agree to the{' '}
							<Link
								href='/'
								className='text-primary cursor-pointer hover:underline'
							>
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link
								href='/'
								className='text-primary cursor-pointer hover:underline'
							>
								Privacy Policy
							</Link>
						</Label>
					</div>
					<Button
						type='submit'
						size={'lg'}
						className='w-full'
						disabled={!isCheckedTerms}
					>
						{isSigningUp ? (
							<LoaderCircle className='animate-spin' />
						) : (
							'Create Account'
						)}
					</Button>
					<div className='relative'>
						<Separator />
						<span className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-muted-foreground'>
							or continue with
						</span>
					</div>
					<Button
						type='button'
						variant='outline'
						size={'lg'}
						className='w-full'
						disabled={!isCheckedTerms}
						asChild
					>
						<Link href={oauthURL}>
							<Google className='size-4' />
							Google
						</Link>
					</Button>
					<p className='text-muted-foreground text-sm text-center'>
						Already have an account?{' '}
						<span
							className='text-primary cursor-pointer'
							onClick={() => setForm('login')}
						>
							Sign in
						</span>
					</p>
				</form>
			</Form>
		</div>
	);
};

export default SignupForm;
