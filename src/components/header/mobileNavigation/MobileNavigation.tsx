'use client';

import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { AlignJustify, Search, ShoppingCart, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import ThemeToggleComp from '@/components/theme-toggle';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Menu from '@/components/header/mobileNavigation/Menu';

const ThemeToggle = dynamic(() => Promise.resolve(ThemeToggleComp), {
	ssr: false,
});
const MobileNavigation = () => {
	const [showSearch, setShowSearch] = useState(false);

	return (
		<div className='hidden max-lg:block'>
			<div className='flex items-center justify-between py-4'>
				<Menu>
					<Button
						variant={'ghost'}
						size={'icon'}
					>
						<AlignJustify />
					</Button>
				</Menu>
				<Link
					href={'/'}
					className='w-40 h-auto absolute left-1/2 transform -translate-x-1/2'
				>
					<Logo />
				</Link>
				<div>
					<ThemeToggle variant='ghost' />
					<Button
						variant={'ghost'}
						size={'icon'}
						onClick={() => setShowSearch(!showSearch)}
					>
						{showSearch ? <X /> : <Search />}
					</Button>
					<Button
						variant={'ghost'}
						size={'icon'}
					>
						<ShoppingCart />
					</Button>
				</div>
			</div>
			{showSearch && (
				<div className='w-full p-4 bg-accent border-t'>
					<Input
						type='text'
						placeholder='Search products...'
						className='text-sm'
					/>
				</div>
			)}
		</div>
	);
};

export default MobileNavigation;
