import AddressContainer from '@/components/profile/ProfileContent/AddressContainer';
import ProfileDanger from '@/components/profile/ProfileContent/ProfileDanger';
import ProfileInformation from '@/components/profile/ProfileContent/ProfileInformation';
import ProfileSecurity from '@/components/profile/ProfileContent/ProfileSecurity';
import useAuthStore from '@/stores/authStore';

type Props = {
	activeTab?: string;
};

const ProfileContent = ({ activeTab }: Props) => {
	const authUser = useAuthStore((state) => state.authUser);
	return (
		<div className='col-span-3'>
			{activeTab === 'profile' && (
				<div className='space-y-6'>
					<ProfileInformation />
					{authUser?.authProvider !== 'google' && <ProfileSecurity />}
					<ProfileDanger />
				</div>
			)}
			{activeTab === 'addresses' && (
				<div className='space-y-6'>
					<AddressContainer />
				</div>
			)}
		</div>
	);
};

export default ProfileContent;
