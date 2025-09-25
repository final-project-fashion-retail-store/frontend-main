import DialogCustom from '@/components/custom/dialog-custom';
import ReviewForm from '@/components/order/ReviewForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatTime } from '@/lib/formatTime';
import { Order, ProductVariant } from '@/types';
import {
	Calendar,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Clock,
	MapPin,
	Package,
	Star,
	Truck,
	XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useOrderStore from '@/stores/orderStore';
import { useShallow } from 'zustand/shallow';
import { toast } from 'sonner';
import AlertDialogCustom from '@/components/custom/alert-dialog-custom';

const getStatusConfig = (status: string) => {
	switch (status) {
		case 'pending':
			return {
				label: 'Pending Payment',
				color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
				icon: Clock,
			};
		case 'processing':
			return {
				label: 'Processing',
				color: 'bg-blue-100 text-blue-800 border-blue-200',
				icon: Package,
			};
		case 'shipped':
			return {
				label: 'Shipped',
				color: 'bg-purple-100 text-purple-800 border-purple-200',
				icon: Truck,
			};
		case 'delivered':
			return {
				label: 'Delivered',
				color: 'bg-green-100 text-green-800 border-green-200',
				icon: CheckCircle,
			};
		case 'cancelled':
			return {
				label: 'Cancelled',
				color: 'bg-red-100 text-red-800 border-red-200',
				icon: XCircle,
			};
		default:
			return {
				label: 'Unknown',
				color: 'bg-gray-100 text-gray-800 border-gray-200',
				icon: Package,
			};
	}
};

const getColor = (variants: ProductVariant[], variantId: string) => {
	const variant = variants.find((v) => v._id === variantId);
	return variant ? variant.color : 'Unknown';
};

const getSize = (variants: ProductVariant[], variantId: string) => {
	const variant = variants.find((v) => v._id === variantId);
	return variant ? variant.size : 'Unknown';
};

type Props = {
	order: Order;
	isExpanded: boolean;
	onToggleExpansion: (orderId: string) => void;
};

const OrderCard = ({ order, isExpanded, onToggleExpansion }: Props) => {
	const cancelOrder = useOrderStore(useShallow((state) => state.cancelOrder));
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<{
		product: {
			_id: string;
			name: string;
			variants: ProductVariant[];
		};
		variantId: string;
		image: string;
	}>();
	const statusConfig = getStatusConfig(order.status);
	const StatusIcon = statusConfig.icon;

	const handleReviewClick = (item: {
		product: {
			_id: string;
			name: string;
			variants: ProductVariant[];
		};
		variantId: string;
		image: string;
	}) => {
		setSelectedItem(item);
		setIsOpen(true);
	};

	const handleClickCancelOrder = async (orderId: string) => {
		const result = await cancelOrder(orderId);

		if (result.success) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};

	const { placeTime, stateTime } = useMemo(() => {
		const stateTime = formatTime(
			order.orderHistories[order.orderHistories.length - 1].timestamp
		);
		const placeTime = formatTime(order.createdAt);
		return { placeTime, stateTime };
	}, [order]);

	return (
		<Card className='overflow-hidden hover:shadow-lg transition-shadow'>
			<CardHeader className='pb-4'>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='text-lg font-semibold'>
							Order #{order.orderNumber}
						</CardTitle>
						<div className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
							<Calendar className='w-4 h-4' />
							<span>
								Placed {!placeTime.includes('ago') && 'on'} {placeTime}
							</span>
						</div>
					</div>
					<Badge className={`${statusConfig.color} border`}>
						<StatusIcon className='w-3 h-3 mr-1' />
						{statusConfig.label}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className='space-y-6'>
				{/* Order Items */}
				<div className='space-y-4'>
					{/* Show limited items initially, all items when expanded */}
					{(isExpanded ? order.items : order.items.slice(0, 3)).map(
						(item, index) => (
							<div
								key={index}
								className='flex gap-4'
							>
								<div className='w-16 h-16 bg-muted-foreground/10 rounded-lg overflow-hidden flex-shrink-0'>
									<Image
										src={item.image}
										alt={item.name}
										width={64}
										height={64}
										className='w-full h-full object-cover'
									/>
								</div>
								<div className='flex-1'>
									<h4 className='font-medium text-foreground line-clamp-2'>
										{item.name}
									</h4>
									<div className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
										<span>{getColor(item.product.variants, item.variantId)}</span>
										<span>•</span>
										<span>{getSize(item.product.variants, item.variantId)}</span>
										<span>•</span>
										<span>Qty: {item.quantity}</span>
									</div>
									<div className='font-semibold text-foreground mt-1'>
										${(item.price * item.quantity).toFixed(2)}
									</div>
								</div>
								{order.reviewExpired === false && !item.reviewed && (
									<Button
										variant='outline'
										size='sm'
										className='bg-transparent'
										onClick={() => handleReviewClick(item)}
									>
										<Star className='w-4 h-4 mr-1' />
										Review
									</Button>
								)}
								{item.reviewed && (
									<Badge
										variant='outline'
										className='text-green-600 border-green-300 h-1/2'
									>
										<CheckCircle className='w-3 h-3 mr-1' />
										Reviewed
									</Badge>
								)}
							</div>
						)
					)}

					{/* Show more/less button */}
					{order.items.length > 3 && (
						<div className='text-center pt-2'>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => onToggleExpansion(order._id)}
								className='text-purple-600 hover:text-purple-700 hover:bg-purple-50'
							>
								{isExpanded ? (
									<>
										Show Less ({order.items.length - 3} items hidden)
										<ChevronUp className='w-4 h-4 ml-1' />
									</>
								) : (
									<>
										Show More ({order.items.length - 3} more items)
										<ChevronDown className='w-4 h-4 ml-1' />
									</>
								)}
							</Button>
						</div>
					)}
				</div>

				<Separator />

				{/* Order Summary */}
				<div className='grid md:grid-cols-2 gap-6'>
					{/* Shipping Address */}
					<div>
						<h4 className='font-medium text-foreground mb-2 flex items-center gap-2'>
							<MapPin className='w-4 h-4' />
							Shipping Address
						</h4>
						<div className='text-sm text-muted-foreground space-y-1'>
							<p className='font-medium'>{order?.shippingAddress?.fullName}</p>
							<p>{order?.shippingAddress?.phoneNumber}</p>
							<p>
								{order?.shippingAddress?.addressLine}, {order?.shippingAddress?.ward},{' '}
								{order?.shippingAddress?.district}, {order?.shippingAddress?.city}
							</p>
						</div>
					</div>

					{/* Order Total */}
					<div>
						<h4 className='font-medium text-foreground mb-2'>Order Total</h4>
						<div className='text-sm space-y-1'>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Subtotal:</span>
								<span>${order.subtotal.toFixed(2)}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Shipping:</span>
								<span>
									{order.shippingCost === 0
										? 'FREE'
										: `$${order.shippingCost.toFixed(2)}`}
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Tax:</span>
								<span>${order.taxAmount.toFixed(2)}</span>
							</div>
							<Separator className='my-2' />
							<div className='flex justify-between font-semibold text-base'>
								<span>Total:</span>
								<span className='text-purple-600'>${order.totalAmount.toFixed(2)}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Order Actions */}
				<div className='flex gap-2 pt-4 border-t'>
					{!['delivered', 'shipped', 'cancelled'].includes(order.status) && (
						<AlertDialogCustom
							asChild
							title='Cancel Order'
							description='Are you sure you want to cancel this order?'
							handler={[() => handleClickCancelOrder(order._id)]}
						>
							<Button
								variant='destructive'
								size='sm'
							>
								Cancel Order
							</Button>
						</AlertDialogCustom>
					)}
				</div>

				{/* Delivery Date */}
				{order.orderHistories[order.orderHistories.length - 1].status ===
					'delivered' && (
					<div className='bg-green-50 border border-green-200 rounded-lg p-3'>
						<div className='flex items-center gap-2 text-green-800'>
							<CheckCircle className='w-4 h-4' />
							<span className='text-sm font-medium'>
								Delivered {!stateTime.includes('ago') && 'on'} {stateTime}
							</span>
						</div>
					</div>
				)}
			</CardContent>

			{selectedItem && (
				<DialogCustom
					isOpen={isOpen}
					setIsOpenChange={setIsOpen}
					dialogTitle='Write a Review'
					body={
						<ReviewForm
							color={getColor(selectedItem.product.variants, selectedItem.variantId)}
							size={getSize(selectedItem.product.variants, selectedItem.variantId)}
							orderId={order._id}
							item={selectedItem}
							setIsOpen={setIsOpen}
						/>
					}
				/>
			)}
		</Card>
	);
};

export default OrderCard;
