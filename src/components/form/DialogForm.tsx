import { Fragment } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import useGeneralStore from '@/stores/generalStore';

type Props = {
	children: React.ReactNode;
	form: React.ReactNode;
};

const formTitles = [
	{
		flag: 'login',
		title: 'Welcome back',
		description: 'Sign in to your PURPLE BEE account',
	},
	{
		flag: 'signup',
		title: 'Create account',
		description: 'Join PURPLE BEE and start shopping',
	},
	{
		flag: 'forgotPassword',
		title: 'Forgot password',
		description: 'Enter your email to reset your password',
	},
];

const DialogForm = ({ children, form }: Props) => {
	const formType = useGeneralStore((state) => state.form);
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] max-h-[90vh] flex flex-col'>
				<DialogHeader>
					{formTitles
						.filter((item) => item.flag === formType)
						.map((item) => (
							<Fragment key={item.flag}>
								<DialogTitle>{item.title}</DialogTitle>
								<DialogDescription>{item.description}</DialogDescription>
							</Fragment>
						))}
				</DialogHeader>
				{form}
				{/* <DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
						<Button type='submit'>Save changes</Button>
					</DialogFooter> */}
			</DialogContent>
		</Dialog>
	);
};

export default DialogForm;
