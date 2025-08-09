'use client';

import OrderSummary from '@/components/payment/OrderSummary/OrderSummary';
import PaymentForm from '@/components/payment/PaymentForm/PaymentForm';
import PaymentSuccess from '@/components/payment/PaymentSuccess';
import { Button } from '@/components/ui/button';
import useConfirmExit from '@/hooks/useConfirmExit';
import useUnloadConfirmation from '@/hooks/useUnloadConfirmation';
import useCartStore from '@/stores/cartStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

const PaymentContainer = () => {
	const [cartItems, getCartItems, totalCartProducts] = useCartStore(
		useShallow((state) => [
			state.cartItems,
			state.getCartItems,
			state.totalCartProducts,
		])
	);
	const [totalPrice, setTotalPrice] = useState('');
	const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
	const [showCartEmpty, setShowCartEmpty] = useState(true);

	const getTotalPrice = (total: number) => {
		setTotalPrice(total.toFixed(2));
	};

	useUnloadConfirmation(true);
	useConfirmExit(true);

	useEffect(() => {
		getCartItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isPaymentSuccessful) {
		return <PaymentSuccess />;
	}

	if (showCartEmpty && totalCartProducts === 0) {
		return (
			<div className='text-center py-16'>
				<ShoppingCart className='w-16 h-16 text-gray-300 mx-auto mb-4' />
				<h2 className='text-2xl font-semibold text-foreground mb-2'>
					Your cart is empty
				</h2>
				<p className='text-muted-foreground mb-6'>Add some items to get started</p>
				<Button className='bg-purple-600 hover:bg-purple-700 text-white'>
					<Link href='/'>Continue Shopping</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className='w-full'>
			<div className='grid lg:grid-cols-2 gap-8'>
				{/* Payment Form */}
				<PaymentForm
					totalPrice={totalPrice}
					setIsPaymentSuccessful={setIsPaymentSuccessful}
					setShowCartEmpty={setShowCartEmpty}
				/>

				{/* Order Summary */}
				<OrderSummary
					cartItems={cartItems}
					getTotalPrice={getTotalPrice}
				/>
			</div>
		</div>
	);
};

export default PaymentContainer;
