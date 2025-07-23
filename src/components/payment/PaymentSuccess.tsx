import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const PaymentSuccess = () => {
	return (
		<div className=' bg-gray-50 flex items-center justify-center p-4'>
			<Card className='w-full max-w-md'>
				<CardContent className='p-8 text-center'>
					<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Check className='w-8 h-8 text-green-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						Payment Successful!
					</h2>
					<p className='text-gray-600 mb-2'>
						Your order has been confirmed and will be processed soon.
					</p>
					<div className='space-y-3'>
						<Button className='w-full bg-purple-600 hover:bg-purple-700'>
							View Order Details
						</Button>
						<Button
							variant='outline'
							className='w-full bg-transparent'
						>
							<Link href='/'>Continue Shopping</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default PaymentSuccess;
