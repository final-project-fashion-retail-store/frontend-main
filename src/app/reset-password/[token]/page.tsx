import ResetPasswordForm from '@/components/form/ResetPasswordForm';

const ResetPassword = async ({
	params,
}: {
	params: Promise<{ token: string }>;
}) => {
	const { token } = await params;

	return (
		<div className='max-w-lg mx-auto p-4'>
			<h1 className='text-center text-xl font-bold'>Reset Password</h1>
			<ResetPasswordForm resetPasswordToken={token} />
		</div>
	);
};

export default ResetPassword;
