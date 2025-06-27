'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';

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
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Google } from '@/components/icons';
import useAuthStore from '@/stores/authStore';
import { useShallow } from 'zustand/shallow';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useGeneralStore from '@/stores/generalStore';
import getOauthGoogleUrl from '@/lib/getOauthGoogleUrl';

const formSchema = z.object({
	email: z.string().email().nonempty('Email is required'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long')
		.nonempty('Password is required'),
});

const LoginForm = () => {
	const [isLoggingIn, login] = useAuthStore(
		useShallow((state) => [state.isLoggingIn, state.login])
	);
	const setForm = useGeneralStore((state) => state.setForm);
	const [showPassword, setShowPassword] = useState(false);

	const oauthURL = getOauthGoogleUrl();

	const router = useRouter();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (isLoggingIn) return;

		const res = await login(values);
		if (res.success) {
			toast.success('Login successful');
			router.push('/');
		} else {
			toast.error(res.message);
			form.setError('password', { message: res.message });
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
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
										placeholder='Enter your password'
										{...field}
										className='pl-8 h-12'
										autoComplete='current-password'
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='text-end'>
					<span
						className='text-sm text-primary cursor-pointer'
						onClick={() => setForm('forgotPassword')}
					>
						Forgot password?
					</span>
				</div>
				<Button
					type='submit'
					size={'lg'}
					className='w-full'
				>
					{isLoggingIn ? <LoaderCircle className='animate-spin' /> : 'Sign in'}
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
					asChild
				>
					<Link href={oauthURL}>
						<Google className='size-4' />
						Google
					</Link>
				</Button>
				<p className='text-muted-foreground text-sm text-center'>
					Don&apos;t have an account?{' '}
					<span
						className='text-primary cursor-pointer'
						onClick={() => setForm('signup')}
					>
						Sign up for free
					</span>
				</p>
			</form>
		</Form>
	);
};

export default LoginForm;
