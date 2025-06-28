'use client';

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
import ListItem from '@/components/header/navigation/ListItem';
import useCommonStore from '@/stores/commonStore';
import { useShallow } from 'zustand/shallow';
import { useEffect, useRef } from 'react';

type CategoryList = {
	_id: string;
	name: string;
	slug: string;
	href: string;
	subcategories?: {
		_id: string;
		name: string;
		href: string;
	}[];
};

const Navigation = () => {
	const [categories, getCategories] = useCommonStore(
		useShallow((state) => [state.categories, state.getCategories])
	);

	const categoryList = useRef<CategoryList[]>([]);

	useEffect(() => {
		getCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (categoryList.current?.length > 0) return;

		if (categories && categories.length > 0) {
			categoryList.current = categories.map((category) => ({
				_id: category._id,
				name: category.name,
				slug: category.slug,
				href: `/category/${category.slug}`,
				subcategories:
					category.subcategories?.map((subcategory) => ({
						_id: subcategory._id,
						name: subcategory.name,
						href: `/category/${category.slug}/${subcategory.slug}`,
					})) || [],
			}));
		}
	}, [categories]);

	return (
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
				{categoryList.current?.map((category) => (
					<NavigationMenuItem key={category._id}>
						<NavigationMenuTrigger>
							<NavigationMenuLink asChild>
								<Link href={category.href}>{category.name}</Link>
							</NavigationMenuLink>
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul
								className={`grid w-[400px] gap-2 ${
									category.subcategories && category.subcategories.length === 1
										? 'grid-cols-1'
										: category.subcategories && category.subcategories.length <= 3
										? 'md:grid-cols-1'
										: 'md:grid-cols-2'
								}`}
							>
								{category.subcategories?.map((subcategory) => (
									<ListItem
										key={subcategory._id}
										title={subcategory.name}
										href={subcategory.href}
										centerTitle={
											category.subcategories && category.subcategories.length === 1
										}
									/>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				))}
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
	);
};

export default Navigation;
