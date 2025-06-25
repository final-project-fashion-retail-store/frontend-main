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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircle, Mail } from 'lucide-react';
import useAuthStore from '@/stores/authStore';
import { useShallow } from 'zustand/shallow';
import { toast } from 'sonner';

const formSchema = z.object({
	email: z.string().email().nonempty('Email is required'),
});

const ForgotPasswordForm = () => {
	const [isSendingEmail, forgotPassword] = useAuthStore(
		useShallow((state) => [state.isSendingEmail, state.forgotPassword])
	);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (isSendingEmail) return;

		const result = await forgotPassword(values);

		if (result.success) {
			toast.success('Email sent successfully! Please check your inbox.');
			form.reset();
		} else {
			toast.error('Failed to send email');
			form.setError('email', { message: result.message });
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
										placeholder='Enter your registered email'
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
				<Button
					type='submit'
					className='w-full'
					size={'lg'}
				>
					{isSendingEmail ? <LoaderCircle className='animate-spin' /> : 'Request'}
				</Button>
			</form>
		</Form>
	);
};

export default ForgotPasswordForm;
