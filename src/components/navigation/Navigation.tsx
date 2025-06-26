'use client';

import { useShallow } from 'zustand/shallow';
import Link from 'next/link';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import ListItem from '@/components/navigation/ListItem';
import { Input } from '@/components/ui/input';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import useGeneralStore from '@/stores/generalStore';
import { useOAuthHandler } from '@/hooks/useOAuthHandler';

const components: { title: string; href: string; description: string }[] = [
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.',
	},
	{
		title: 'Hover Card',
		href: '/docs/primitives/hover-card',
		description: 'For sighted users to preview content available behind a link.',
	},
	{
		title: 'Progress',
		href: '/docs/primitives/progress',
		description:
			'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
	},
	{
		title: 'Scroll-area',
		href: '/docs/primitives/scroll-area',
		description: 'Visually or semantically separates content.',
	},
	{
		title: 'Tabs',
		href: '/docs/primitives/tabs',
		description:
			'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
	},
	{
		title: 'Tooltip',
		href: '/docs/primitives/tooltip',
		description:
			'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
	},
];

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

const Navigation = () => {
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

	const setForm = useGeneralStore((state) => state.setForm);
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
		<div className='hidden lg:flex sticky top-0 left-0 right-0 w-full py-6 flex-col justify-center space-y-4'>
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
									<Avatar className='ring ring-muted-foreground cursor-pointer'>
										<AvatarImage
											src={authUser.avatar.url}
											alt='Avatar'
											className='object-cover'
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{dropdownUserMenuItems.map((item) => (
										<DropdownMenuItem
											key={item.title}
											asChild
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
				<NavigationMenu viewport={false}>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href='/'>Home</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Sneakers</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
									{components.map((component) => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}
										>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Shirts</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
									{components.map((component) => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}
										>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Pants</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
									{components.map((component) => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}
										>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href='/contact'>Contact</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	);
};

export default Navigation;
