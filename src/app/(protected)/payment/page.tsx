import PaymentContainer from '@/components/payment/PaymentContainer';
import { Separator } from '@/components/ui/separator';

const Payment = () => {
	return (
		<div className='container mx-auto py-8 px-2 2xl:px-6 3xl:px-0'>
			<PaymentContainer />
			<Separator className='w-full my-4' />
		</div>
	);
};

export default Payment;
