'use client';

import { useShallow } from 'zustand/shallow';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { DialogForm } from '@/components/form';
import useAuthStore from '@/stores/authStore';
import Overlay from '@/components/ui/overlay';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ThemeToggleComp from '@/components/theme-toggle';
import dynamic from 'next/dynamic';
import Form from '@/components/form/Form';
import { useOAuthHandler } from '@/hooks/useOAuthHandler';
import Navigation from '@/components/header/navigation/Navigation';
import MobileNavigation from './mobileNavigation/MobileNavigation';
import ImageCustom from '@/components/custom/image-custom';
import useCommonStore from '@/stores/commonStore';

const dropdownUserMenuItems = [
	{
		title: 'Profile',
		href: '/profile',
	},
	{
		title: 'Orders',
		href: '/orders',
	},
	{
		title: 'Logout',
	},
];

const ThemeToggle = dynamic(() => Promise.resolve(ThemeToggleComp), {
	ssr: false,
});

const Header = () => {
	const [
		authUser,
		isLoggingIn,
		isSigningUp,
		isLoggingOut,
		isSendingEmail,
		isResettingPassword,
		logout,
	] = useAuthStore(
		useShallow((state) => [
			state.authUser,
			state.isLoggingIn,
			state.isSigningUp,
			state.isLoggingOut,
			state.isSendingEmail,
			state.isResettingPassword,
			state.logout,
		])
	);

	const setForm = useCommonStore((state) => state.setForm);
	const router = useRouter();

	useOAuthHandler();

	const handleClickLogout = async () => {
		if (isLoggingOut) return;
		const result = await logout();

		if (result.success) {
			toast.success('Logout successful');
			router.push('/');
		} else {
			toast.error(result.message);
		}
	};

	return (
		<div className='max-lg:border-b lg:flex sticky top-0 left-0 right-0 w-full lg:pt-6 flex-col justify-center lg:space-y-4 z-[50] bg-background'>
			<MobileNavigation />
			<div className='hidden lg:block container mx-auto lg:px-2 2xl:px-6  3xl:px-0'>
				{(isLoggingIn ||
					isSigningUp ||
					isLoggingOut ||
					isSendingEmail ||
					isResettingPassword) && <Overlay loading={isLoggingOut} />}
				{/* Nav top */}
				<div className='flex items-center justify-between border-b py-4'>
					{/* Search */}
					<div className='w-72 relative'>
						<Input
							className='pl-8'
							placeholder='Search...'
						/>
						<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground' />
					</div>
					{/* Logo */}
					<span className='w-40 h-auto absolute left-1/2 transform -translate-x-1/2'>
						<Logo />
					</span>
					<div className='flex items-center space-x-6'>
						{/* Toggle theme */}
						<ThemeToggle />
						{authUser ? (
							<div className='flex items-center space-x-6'>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<ImageCustom
											src={authUser.avatar.url}
											alt='Avatar'
											width={40}
											height={40}
											showFallback={!authUser.avatar.url}
											priority
											className='cursor-pointer size-8! ring ring-muted-foreground'
										/>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>My Account</DropdownMenuLabel>
										<DropdownMenuSeparator />
										{dropdownUserMenuItems.map((item) => (
											<DropdownMenuItem
												key={item.title}
												asChild
												className='cursor-pointer'
											>
												<Link
													href={(item.href as string) || ''}
													onClick={() => {
														if (item.title === 'Logout') {
															handleClickLogout();
														}
													}}
												>
													{item.title}
												</Link>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
								<Heart className='cursor-pointer size-6' />
								<ShoppingBag className='cursor-pointer size-6' />
							</div>
						) : (
							<div>
								<DialogForm form={<Form />}>
									<Button
										variant={'ghost'}
										onClick={() => setForm('login')}
									>
										Login
									</Button>
								</DialogForm>
								<DialogForm form={<Form />}>
									<Button
										className='ml-2'
										onClick={() => setForm('signup')}
									>
										Sign Up
									</Button>
								</DialogForm>
							</div>
						)}
					</div>
				</div>
				<div className='w-full flex items-center justify-center border-b-3 py-2 border-primary'>
					<Navigation />
				</div>
			</div>
		</div>
	);
};

export default Header;
