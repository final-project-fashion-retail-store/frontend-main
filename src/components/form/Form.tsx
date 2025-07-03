'use client';

import ForgotPasswordForm from '@/components/form/ForgotPasswordForm';
import LoginForm from '@/components/form/LoginForm';
import SignupForm from '@/components/form/SignupForm';
import useCommonStore from '@/stores/commonStore';

const Form = () => {
	const form = useCommonStore((state) => state.form);
	return (
		<>
			{form === 'login' && <LoginForm />}
			{form === 'signup' && <SignupForm />}
			{form === 'forgotPassword' && <ForgotPasswordForm />}
		</>
	);
};

export default Form;
