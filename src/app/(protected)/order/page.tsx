import OrderContainer from '@/components/order/OrderContainer';
import { Separator } from '@/components/ui/separator';

const page = () => {
	return (
		<div className='container mx-auto py-8 px-2 2xl:px-6 3xl:px-0'>
			<OrderContainer />
			<Separator className='w-full my-4' />
		</div>
	);
};

export default page;
