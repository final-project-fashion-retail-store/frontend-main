import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useAuthStore from '@/stores/authStore';
import { MapPin, User } from 'lucide-react';
import ImageCustom from '@/components/custom/image-custom';

const sidebarItems = [
	{ id: 'profile', label: 'Profile', icon: User },
	{ id: 'addresses', label: 'Addresses', icon: MapPin },
];

type Props = {
	activeTab: string;
	setActiveTab: Dispatch<SetStateAction<string>>;
};

const ProfileSidebar = ({ activeTab, setActiveTab }: Props) => {
	const authUser = useAuthStore((state) => state.authUser);

	if (!authUser) return null;
	return (
		<div className='lg:col-span-1'>
			<Card className='sticky top-8'>
				<CardHeader className='text-center pb-4'>
					<div className='relative mx-auto mb-4'>
						<div className='size-[120px] rounded-full overflow-hidden border-4 border-muted-foreground/20'>
							<ImageCustom
								src={authUser.avatar.url}
								alt='Profile'
								width={240}
								height={240}
								priority
								showFallback={!authUser.avatar.url}
								className='size-full'
							/>
						</div>
					</div>
					<h3 className='font-semibold text-lg'>{authUser.fullName}</h3>
					<p className='text-sm text-muted-foreground'>
						Member since{' '}
						{new Date(authUser.createdAt).toLocaleString('en-US', {
							month: 'long',
							year: 'numeric',
						})}
					</p>
				</CardHeader>
				<CardContent className='pt-0'>
					<nav className='space-y-2'>
						{sidebarItems.map((item) => {
							const Icon = item.icon;
							return (
								<Button
									key={item.id}
									variant={activeTab === item.id ? 'default' : 'ghost'}
									className={`w-full justify-start ${
										activeTab === item.id
											? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
											: 'text-muted-foreground hover:bg-purple-50'
									}`}
									onClick={() => setActiveTab(item.id)}
								>
									<Icon className='size-4 mr-3' />
									{item.label}
								</Button>
							);
						})}
					</nav>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProfileSidebar;
