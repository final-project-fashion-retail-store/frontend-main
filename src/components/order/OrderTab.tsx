import OrderCard from '@/components/order/OrderCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Order } from '@/types';
import { Package } from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = {
	orders: Order[];
};

const OrderTab = ({ orders }: Props) => {
	const [activeTab, setActiveTab] = useState('all');
	const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

	const {
		allTotal,
		pendingTotal,
		processingTotal,
		deliveredTotal,
		cancelledTotal,
	} = useMemo(() => {
		const allTotal = orders.length;
		const pendingTotal = orders.filter(
			(order) => order.status === 'pending'
		).length;
		const processingTotal = orders.filter(
			(order) => order.status === 'processing'
		).length;
		const deliveredTotal = orders.filter(
			(order) => order.status === 'delivered'
		).length;
		const cancelledTotal = orders.filter(
			(order) => order.status === 'cancelled'
		).length;

		return {
			allTotal,
			pendingTotal,
			processingTotal,
			deliveredTotal,
			cancelledTotal,
		};
	}, [orders]);

	const { filteredOrders } = useMemo(() => {
		const filteredOrders = orders.filter((order) => {
			if (activeTab === 'all') return true;
			return order.status === activeTab;
		});
		return { filteredOrders };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	const toggleOrderExpansion = (orderId: string) => {
		setExpandedOrders((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(orderId)) {
				newSet.delete(orderId);
			} else {
				newSet.add(orderId);
			}
			return newSet;
		});
	};

	return (
		<Tabs
			value={activeTab}
			onValueChange={setActiveTab}
			className='mb-8'
		>
			<TabsList className='w-full bg-muted-foreground/10'>
				<TabsTrigger
					value='all'
					// className='data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600'
				>
					All ({allTotal})
				</TabsTrigger>
				<TabsTrigger
					value='pending'
					// className='data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600'
				>
					Pending ({pendingTotal})
				</TabsTrigger>
				<TabsTrigger
					value='processing'
					// className='data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600'
				>
					Processing ({processingTotal})
				</TabsTrigger>
				<TabsTrigger
					value='delivered'
					// className='data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600'
				>
					Delivered ({deliveredTotal})
				</TabsTrigger>
				<TabsTrigger
					value='cancelled'
					// className='data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600'
				>
					Cancelled ({cancelledTotal})
				</TabsTrigger>
			</TabsList>

			<TabsContent
				value={activeTab}
				className='mt-6'
			>
				{filteredOrders.length === 0 ? (
					<div className='text-center py-16'>
						<Package className='w-16 h-16 text-gray-300 mx-auto mb-4' />
						<h2 className='text-2xl font-semibold text-gray-900 mb-2'>
							No orders found
						</h2>
						<p className='text-gray-600 mb-6'>
							{activeTab === 'all'
								? "You haven't placed any orders yet"
								: `No ${activeTab} orders found`}
						</p>
						<Button className='bg-purple-600 hover:bg-purple-700 text-white'>
							Continue Shopping
						</Button>
					</div>
				) : (
					<div className='space-y-6'>
						{filteredOrders.map((order) => (
							<OrderCard
								key={order._id}
								order={order}
								isExpanded={expandedOrders.has(order._id)}
								onToggleExpansion={toggleOrderExpansion}
							/>
						))}
					</div>
				)}
			</TabsContent>
		</Tabs>
	);
};

export default OrderTab;
