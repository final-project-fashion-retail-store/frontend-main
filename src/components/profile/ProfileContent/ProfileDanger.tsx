import AlertDialogCustom from '@/components/custom/alert-dialog-custom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAuthStore from '@/stores/authStore';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

const ProfileDanger = () => {
	const [deactivateAccount, logout] = useAuthStore(
		useShallow((state) => [state.deactivateAccount, state.logout])
	);

	const handleDeactivateAccount = async () => {
		const result = await deactivateAccount();

		if (result.success) {
			toast.success('Account deactivated successfully. You will be logged out.');
			await logout();
		} else {
			toast.error('Failed to deactivate account.');
		}
	};

	return (
		<Card className='border-red-200'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2 text-red-600'>
					<AlertTriangle className='size-5' />
					Danger Zone
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex max-md:flex-col items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50'>
					<div>
						<h4 className='font-medium text-red-800'>Deactivate Account</h4>
						<p className='text-sm text-red-600'>
							Once you deactivate your account, there is no going back. Please be
							certain.
						</p>
					</div>
					<AlertDialogCustom
						title='Are you sure you want to deactivate your account?'
						description='This action cannot be undone.'
						handler={[handleDeactivateAccount]}
						asChild
					>
						<Button variant='destructive'>Deactivate Account</Button>
					</AlertDialogCustom>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileDanger;
