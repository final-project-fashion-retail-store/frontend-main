'use client';

import Loader from '@/components/Loader';
import OrderTab from '@/components/order/OrderTab';
import Overlay from '@/components/ui/overlay';
import useAuthStore from '@/stores/authStore';
import useCommonStore from '@/stores/commonStore';
import useOrderStore from '@/stores/orderStore';
import useReviewStore from '@/stores/reviewStore';
import { Package } from 'lucide-react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const OrderContainer = () => {
	const authUser = useAuthStore((state) => state.authUser);
	const [orders, getAllOrders, isGettingOrders] = useOrderStore(
		useShallow((state) => [
			state.orders,
			state.getAllOrders,
			state.isGettingOrders,
		])
	);
	const [isUploadingImages, isDestroyingImages] = useCommonStore(
		useShallow((state) => [state.isUploadingImages, state.isDestroyingImages])
	);

	const [isCreatingReview] = useReviewStore(
		useShallow((state) => [state.isCreatingReview])
	);

	useEffect(() => {
		getAllOrders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isGettingOrders) return <Loader />;

	return (
		<div className='w-full'>
			{(isUploadingImages || isDestroyingImages) && <Overlay loading />}
			{isCreatingReview && <Overlay />}
			{/* page header */}
			<div className='mb-8'>
				<div className='flex items-center gap-3 mb-4'>
					<Package className='w-8 h-8 text-purple-600' />
					<h1 className='text-3xl font-bold text-foreground'>My Orders</h1>
				</div>
				<p className='text-muted-foreground'>
					Welcome back, {authUser?.fullName}! Here are all your orders.
				</p>
			</div>
			{/* Order tabs */}
			<OrderTab orders={orders} />
		</div>
	);
};

export default OrderContainer;
