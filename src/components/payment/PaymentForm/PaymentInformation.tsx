import { CardElement } from '@stripe/react-stripe-js';
import { AlertCircle, CreditCard, Shield } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Props = {
	errorMessage?: string;
};

const cardElementOptions = {
	style: {
		base: {
			fontSize: '16px',
			color: '#424770',
			'::placeholder': {
				color: '#aab7c4',
			},
			// padding: '12px',
		},
		invalid: {
			color: '#9e2146',
		},
	},
	hidePostalCode: true,
};

const PaymentInformation = ({ errorMessage }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<CreditCard className='w-5 h-5 text-purple-600' />
					Payment Information
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div>
					<Label htmlFor='card-element'>Card Details</Label>
					<div className='mt-2 p-3 border border-gray-300 rounded-lg bg-white'>
						<CardElement options={cardElementOptions} />
					</div>
				</div>

				{errorMessage && (
					<Alert variant='destructive'>
						<AlertCircle className='h-4 w-4' />
						<AlertDescription>{errorMessage}</AlertDescription>
					</Alert>
				)}

				<div className='flex items-center gap-2 text-sm text-gray-600'>
					<Shield className='w-4 h-4' />
					<span>Your payment information is encrypted and secure</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default PaymentInformation;
