'use client';

import LoginForm from '@/components/form/LoginForm';
import SignupForm from '@/components/form/SignupForm';
import useGeneralStore from '@/stores/generalStore';

const Form = () => {
	const form = useGeneralStore((state) => state.form);
	return (
		<>
			{form === 'login' && <LoginForm />}
			{form === 'signup' && <SignupForm />}
		</>
	);
};

export default Form;
