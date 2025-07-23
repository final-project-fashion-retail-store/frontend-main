import PaymentAddress from '@/components/payment/PaymentForm/PaymentAddress';
import PaymentInformation from '@/components/payment/PaymentForm/PaymentInformation';
import ProgressSteps from '@/components/payment/PaymentForm/ProgressSteps';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/authStore';
import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Lock, MapPin, Truck } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import config from '@/config';
import useOrderStore from '@/stores/orderStore';
import { toast } from 'sonner';
import Overlay from '@/components/ui/overlay';
import useCartStore from '@/stores/cartStore';

const stripePromise = loadStripe(config.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
	locale: 'en', // force English
});

type Props = {
	totalPrice: string;
	setIsPaymentSuccessful: Dispatch<SetStateAction<boolean>>;
	setShowCartEmpty: Dispatch<SetStateAction<boolean>>;
};

const PaymentForm = ({
	totalPrice,
	setIsPaymentSuccessful,
	setShowCartEmpty,
}: Props) => {
	const [isCreatingOrder, createOrder] = useOrderStore(
		useShallow((state) => [state.isCreatingOrder, state.createOrder])
	);
	const getTotalCartProducts = useCartStore(
		(state) => state.getTotalCartProducts
	);

	const [addresses, getAddresses] = useAuthStore(
		useShallow((state) => [state.addresses, state.getAddresses])
	);

	const [selectedShippingAddress, setSelectedShippingAddress] = useState(
		addresses?.find((address) => address.isDefault)?._id || ''
	);
	const [selectedBillingAddress, setSelectedBillingAddress] = useState(
		addresses?.find((address) => address.isDefault)?._id || ''
	);
	const [sameAsShipping, setSameAsShipping] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState<
		'idle' | 'processing' | 'success' | 'error'
	>('idle');

	const currentShippingAddress =
		addresses?.find((address) => address._id === selectedShippingAddress) || null;
	const currentBillingAddress = sameAsShipping
		? currentShippingAddress
		: addresses?.find((address) => address._id === selectedBillingAddress) ||
		  null;

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		getAddresses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (addresses && addresses.length > 0) {
			const defaultAddress = addresses.find((address) => address.isDefault);
			if (defaultAddress && !selectedShippingAddress) {
				setSelectedShippingAddress(defaultAddress._id);
			}
			if (defaultAddress && !selectedBillingAddress) {
				setSelectedBillingAddress(defaultAddress._id);
			}
		}
	}, [addresses, selectedShippingAddress, selectedBillingAddress]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		setIsProcessing(true);

		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			return;
		}

		// 1. Create order data
		const result = await createOrder({
			shippingAddress: currentShippingAddress?._id || '',
			billingAddress: currentBillingAddress?._id || '',
		});

		if (!result.success || !result.clientSecret) {
			toast.error('Payment failed');
			return;
		}

		try {
			// 2. Confirm payment with Stripe
			const { error, paymentIntent } = await stripe.confirmCardPayment(
				result.clientSecret,
				{
					payment_method: {
						card: cardElement,
						billing_details: {
							name: currentBillingAddress?.fullName,
							phone: currentBillingAddress?.phoneNumber,
							address: {
								line1: currentBillingAddress?.addressLine,
								city: currentBillingAddress?.city,
								state: currentBillingAddress?.district,
								country: 'VN', // Vietnam
							},
						},
					},
				}
			);

			if (error) {
				toast.error('Payment failed');
				setPaymentStatus('error');
			} else if (paymentIntent?.status === 'succeeded') {
				toast.success('Payment successful');
				setPaymentStatus('success');
				setIsPaymentSuccessful(true);
				setShowCartEmpty(false);

				setTimeout(async () => {
					await getTotalCartProducts();
				}, 1000);
			}
		} catch {
			toast.error('Payment processing error');
			setPaymentStatus('error');
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className='space-y-8'>
			{/* Progress Steps */}
			<ProgressSteps />
			{(isProcessing || isCreatingOrder) && <Overlay />}
			<form
				className='space-y-8'
				onSubmit={handleSubmit}
			>
				{/* Shipping Address */}
				<PaymentAddress
					cardTitle={
						<>
							<Truck className='w-5 h-5 text-purple-600' />
							Shipping Address
						</>
					}
					addresses={addresses || []}
					dialogTitle='Select Shipping Address'
					selectedAddress={selectedShippingAddress}
					setSelectedAddress={setSelectedShippingAddress}
					currentAddress={currentShippingAddress}
					addressType='shipping'
				/>
				{/* Billing Address */}
				<PaymentAddress
					cardTitle={
						<>
							<MapPin className='w-5 h-5 text-purple-600' /> Billing Address
						</>
					}
					addresses={addresses || []}
					dialogTitle='Select Billing Address'
					selectedAddress={selectedBillingAddress}
					setSelectedAddress={setSelectedBillingAddress}
					currentAddress={currentBillingAddress}
					addressType='billing'
					sameAsShipping={sameAsShipping}
					setSameAsShipping={setSameAsShipping}
				/>
				{/* Payment Information */}
				<PaymentInformation />

				{/* Submit Button */}
				<Button
					type='submit'
					disabled={!stripe || isProcessing || paymentStatus === 'processing'}
					className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold disabled:opacity-50'
				>
					{isProcessing || isCreatingOrder ? (
						<div className='flex items-center gap-2'>
							<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
							Processing Payment...
						</div>
					) : (
						<>
							<Lock className='size-5 mr-2' />
							Complete Payment ${totalPrice}
						</>
					)}
				</Button>
			</form>
		</div>
	);
};

export default function PaymentPage({
	totalPrice,
	setIsPaymentSuccessful,
	setShowCartEmpty,
}: Props) {
	return (
		<Elements stripe={stripePromise}>
			<PaymentForm
				totalPrice={totalPrice}
				setIsPaymentSuccessful={setIsPaymentSuccessful}
				setShowCartEmpty={setShowCartEmpty}
			/>
		</Elements>
	);
}
