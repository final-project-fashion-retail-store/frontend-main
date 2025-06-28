import ProfileDanger from '@/components/profile/ProfileContent/ProfileDanger';
import ProfileInformation from '@/components/profile/ProfileContent/ProfileInformation';
import ProfileSecurity from '@/components/profile/ProfileContent/ProfileSecurity';

const ProfileContent = () => {
	return (
		<div className='col-span-3'>
			<div className='space-y-6'>
				<ProfileInformation />
				<ProfileSecurity />
				<ProfileDanger />
			</div>
		</div>
	);
};

export default ProfileContent;
