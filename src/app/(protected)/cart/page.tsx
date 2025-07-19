import CartContainer from '@/components/cart/CartContainer';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
	return (
		<div className='container mx-auto py-8 px-2 2xl:px-6 3xl:px-0'>
			<CartContainer />
			<Separator className='w-full my-4' />
		</div>
	);
};

export default Cart;
