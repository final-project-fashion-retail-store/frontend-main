import ProfileDanger from '@/components/profile/ProfileContent/ProfileDanger';
import ProfileInformation from '@/components/profile/ProfileContent/ProfileInformation';
import ProfileSecurity from '@/components/profile/ProfileContent/ProfileSecurity';
import useAuthStore from '@/stores/authStore';

const ProfileContent = () => {
	const authUser = useAuthStore((state) => state.authUser);
	return (
		<div className='col-span-3'>
			<div className='space-y-6'>
				<ProfileInformation />
				{authUser?.authProvider !== 'google' && <ProfileSecurity />}
				<ProfileDanger />
			</div>
		</div>
	);
};

export default ProfileContent;
