import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const ProfileDanger = () => {
	return (
		<Card className='border-red-200'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2 text-red-600'>
					<AlertTriangle className='size-5' />
					Danger Zone
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50'>
					<div>
						<h4 className='font-medium text-red-800'>Deactivate Account</h4>
						<p className='text-sm text-red-600'>
							Once you deactivate your account, there is no going back. Please be
							certain.
						</p>
					</div>
					<Button variant='destructive'>Deactivate Account</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileDanger;
