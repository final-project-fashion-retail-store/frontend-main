'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import useCommonStore from '@/stores/commonStore';
import { ChevronDown, Heart, LogOut, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import useAuthStore from '@/stores/authStore';
import { Separator } from '@/components/ui/separator';
import { DialogForm } from '@/components/form';
import Form from '@/components/form/Form';

type NavigationItems = {
	_id?: string;
	name: string;
	slug?: string;
	href: string;
	hasDropdown?: boolean;
	subcategories?: {
		_id: string;
		name: string;
		href: string;
	}[];
};

const userMenuItems = [
	{ name: 'Profile', href: '/profile', icon: User },
	{ name: 'Wishlist', href: '/wishlist', icon: Heart },
	{ name: 'Orders', href: '/order', icon: ShoppingCart },
	{ name: 'Logout', href: '/logout', icon: LogOut },
];

type Props = {
	children: React.ReactNode;
};

const Menu = ({ children }: Props) => {
	const [authUser] = useAuthStore(useShallow((state) => [state.authUser]));
	const [categories, getCategories, setForm] = useCommonStore(
		useShallow((state) => [state.categories, state.getCategories, state.setForm])
	);
	const [isOpen, setIsOpen] = useState(false);
	const navigationItems = useRef<NavigationItems[]>([]);

	useEffect(() => {
		if (categories && categories.length > 0) return;
		getCategories();
	}, [categories, getCategories]);

	useEffect(() => {
		if (categories && categories.length > 0) {
			navigationItems.current = categories.map((category) => ({
				_id: category._id,
				name: category.name,
				slug: category.slug,
				hasDropdown: !!category.subcategories?.length,
				href: `/category/${category.slug}`,
				subcategories:
					category.subcategories?.map((subcategory) => ({
						_id: subcategory._id,
						name: subcategory.name,
						href: `/category/${category.slug}/${subcategory.slug}`,
					})) || [],
			}));
		}

		navigationItems.current.unshift({ name: 'Home', href: '/' });
		navigationItems.current.push({ name: 'Contact', href: '/contact' });
	}, [categories]);

	return (
		<Sheet
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				side='left'
				className='w-80 flex flex-col'
			>
				<SheetHeader className='flex-shrink-0'>
					<SheetTitle className='text-left'>Menu</SheetTitle>
				</SheetHeader>
				<div className='flex-1 overflow-y-auto space-y-1'>
					{navigationItems.current.map((item) => (
						<div key={item.name}>
							{item.hasDropdown ? (
								<Collapsible>
									<CollapsibleTrigger asChild>
										<Button
											variant='ghost'
											className='w-full justify-between p-3 text-left text-base font-medium text-foreground hover:bg-accent rounded-none border-0'
										>
											{item.name}
											<ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
										</Button>
									</CollapsibleTrigger>
									<CollapsibleContent className='space-y-1'>
										<div className='pl-4 space-y-1 py-2'>
											{item.subcategories?.map((subcategory) => (
												<SheetClose
													key={subcategory.name}
													asChild
												>
													<Button
														variant='ghost'
														className='w-full justify-start px-6 py-2 text-left text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-accent rounded-none border-0'
														asChild
													>
														<Link href={subcategory.href}>{subcategory.name}</Link>
													</Button>
												</SheetClose>
											))}
										</div>
									</CollapsibleContent>
								</Collapsible>
							) : (
								<SheetClose asChild>
									<Button
										variant='ghost'
										className='w-full justify-start px-3 py-3 text-left text-base font-medium text-foreground hover:bg-accent rounded-none border-0'
										asChild
									>
										<Link href={item.href}>{item.name}</Link>
									</Button>
								</SheetClose>
							)}
						</div>
					))}
					<Separator className='my-4' />
					{/* Enhanced user account section */}
					<div className='space-y-1 mb-6'>
						{authUser ? (
							<Collapsible>
								<CollapsibleTrigger asChild>
									<Button
										variant='ghost'
										className='w-full justify-between px-3 py-3 text-left text-base font-medium text-foreground hover:bg-accent rounded-none border-0'
									>
										<div className='flex items-center'>
											<User className='h-4 w-4 mr-2' />
											Account
										</div>
										<ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent className='space-y-1'>
									<div className='pl-4 space-y-1 py-2'>
										{userMenuItems.map((menuItem) => (
											<SheetClose
												key={menuItem.name}
												asChild
											>
												<Button
													variant='ghost'
													className='w-full justify-start px-6 py-2 text-left text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-accent rounded-none border-0'
													// onClick={() => handleAuthAction(menuItem.name)}
													asChild={menuItem.name !== 'Logout'}
												>
													{menuItem.name === 'Logout' ? (
														<>
															<menuItem.icon className='h-4 w-4 mr-2' />
															{menuItem.name}
														</>
													) : (
														<Link href={menuItem.href}>
															<menuItem.icon className='h-4 w-4 mr-2' />
															{menuItem.name}
														</Link>
													)}
												</Button>
											</SheetClose>
										))}
									</div>
								</CollapsibleContent>
							</Collapsible>
						) : (
							// Show login/signup buttons for unauthenticated users
							<div className='space-y-1'>
								<div className='px-3 py-2 text-sm font-medium text-muted-foreground uppercase tracking-wide'>
									Get Started
								</div>
								<div className='w-full px-3 space-y-2'>
									<DialogForm form={<Form />}>
										<Button
											variant={'outline'}
											className='w-full'
											onClick={() => setForm('login')}
										>
											Login
										</Button>
									</DialogForm>
									<DialogForm form={<Form />}>
										<Button
											className='w-full'
											onClick={() => setForm('signup')}
										>
											Sign Up
										</Button>
									</DialogForm>
								</div>
							</div>
						)}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default Menu;
