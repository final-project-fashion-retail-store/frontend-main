'use client';

import { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from '@/components/profile/ProfileContent/ProfileContent';

const ProfileContainer = () => {
	const [activeTab, setActiveTab] = useState('profile');
	return (
		<div className='grid lg:grid-cols-4 gap-8'>
			<ProfileSidebar
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<ProfileContent activeTab={activeTab} />
		</div>
	);
};

export default ProfileContainer;
