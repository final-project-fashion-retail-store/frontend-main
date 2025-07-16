import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types';
import { Award, RotateCcw, Shield, Truck, Zap } from 'lucide-react';
import { useState } from 'react';

type Props = {
	selectedProduct: Product | null;
};

const tabData = [
	{
		title: 'Description',
		value: 'description',
	},
	{
		title: 'Specifications',
		value: 'specifications',
	},
	{
		title: 'Care Instructions',
		value: 'care',
	},
	{
		title: 'Shipping & Returns',
		value: 'shipping',
	},
];

const DetailedProductTabs = ({ selectedProduct }: Props) => {
	const [activeTab, setActiveTab] = useState('description');
	return (
		<div className='mb-16'>
			<div className='max-sm:hidden'>
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className='w-full'
				>
					<TabsList className='w-full bg-muted-foreground/10 '>
						{tabData.map((tab) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
							>
								{tab.title}
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent
						value='description'
						className='mt-6'
					>
						<Card>
							<CardContent className='p-6'>
								<div className='prose max-w-none'>
									<p className='text-muted-foreground leading-relaxed text-lg'>
										{selectedProduct?.description}
									</p>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent
						value='specifications'
						className='mt-6'
					>
						<Card>
							<CardContent className='p-6'>
								<div className='grid md:grid-cols-2 gap-6'>
									<div>
										<h4 className='font-semibold text-lg mb-4'>Product Details</h4>
										<dl className='space-y-3'>
											<div className='flex justify-between'>
												<dt className='text-muted-foreground'>Brand:</dt>
												<dd className='font-medium'>{selectedProduct?.brand.name}</dd>
											</div>
											<div className='flex justify-between'>
												<dt className='text-muted-foreground'>Gender:</dt>
												<dd className='font-medium'>{selectedProduct?.gender}</dd>
											</div>
											<div className='flex justify-between'>
												<dt className='text-muted-foreground'>Season:</dt>
												<dd className='font-medium'>{selectedProduct?.season}</dd>
											</div>
											<div className='flex justify-between'>
												<dt className='text-muted-foreground'>Category:</dt>
												<dd className='font-medium'>{selectedProduct?.category.name}</dd>
											</div>
										</dl>
									</div>
									<div>
										<h4 className='font-semibold text-lg mb-4'>Materials</h4>
										<ul className='space-y-2'>
											{selectedProduct?.material.map((material, index) => (
												<li
													key={index}
													className='flex items-center gap-2'
												>
													<Award className='w-4 h-4 text-green-600' />
													<span>{material}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent
						value='care'
						className='mt-6'
					>
						<Card>
							<CardContent className='p-6'>
								<h4 className='font-semibold text-lg mb-4'>Care Instructions</h4>
								<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
									<p className='text-blue-800 font-medium'>
										{selectedProduct?.careInstructions}
									</p>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent
						value='shipping'
						className='mt-6'
					>
						<Card>
							<CardContent className='p-6'>
								<div className='grid md:grid-cols-2 gap-8'>
									<div>
										<h4 className='font-semibold text-lg mb-4'>Shipping Information</h4>
										<div className='space-y-4'>
											<div className='flex items-start gap-3'>
												<Truck className='w-5 h-5 text-purple-600 mt-0.5' />
												<div>
													<div className='font-medium'>Free Standard Shipping</div>
													<div className='text-muted-foreground text-sm'>
														On orders over $75 • 5-7 business days
													</div>
												</div>
											</div>
											<div className='flex items-start gap-3'>
												<Zap className='w-5 h-5 text-purple-600 mt-0.5' />
												<div>
													<div className='font-medium'>Express Shipping</div>
													<div className='text-muted-foreground text-sm'>
														$9.99 • 2-3 business days
													</div>
												</div>
											</div>
										</div>
									</div>
									<div>
										<h4 className='font-semibold text-lg mb-4'>Returns & Exchanges</h4>
										<div className='space-y-4'>
											<div className='flex items-start gap-3'>
												<RotateCcw className='w-5 h-5 text-purple-600 mt-0.5' />
												<div>
													<div className='font-medium'>30-Day Returns</div>
													<div className='text-muted-foreground text-sm'>
														Free returns on all orders
													</div>
												</div>
											</div>
											<div className='flex items-start gap-3'>
												<Shield className='w-5 h-5 text-purple-600 mt-0.5' />
												<div>
													<div className='font-medium'>Easy Process</div>
													<div className='text-muted-foreground text-sm'>
														Print return label from your account
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
			<div>
				<Accordion
					type='single'
					collapsible
					className='w-full sm:hidden'
					defaultValue={tabData[0].value}
				>
					<AccordionItem
						key={tabData[0].value}
						value={tabData[0].value}
					>
						<AccordionTrigger className='px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg data-[state=open]:rounded-b-none'>
							<span className='font-semibold text-left'>{tabData[0].title}</span>
						</AccordionTrigger>
						<AccordionContent className='px-6 pb-6 pt-2'>
							<div className='prose max-w-none'>
								<p className='text-muted-foreground leading-relaxed text-lg'>
									{selectedProduct?.description}
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem
						key={tabData[1].value}
						value={tabData[1].value}
					>
						<AccordionTrigger className='px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg data-[state=open]:rounded-b-none'>
							<span className='font-semibold text-left'>{tabData[1].title}</span>
						</AccordionTrigger>
						<AccordionContent className='px-6 pb-6 pt-2'>
							<div className='grid md:grid-cols-2 gap-6'>
								<div>
									<h4 className='font-semibold text-sm mb-4'>Product Details</h4>
									<dl className='space-y-3'>
										<div className='flex justify-between'>
											<dt className='text-muted-foreground'>Brand:</dt>
											<dd className='font-medium'>{selectedProduct?.brand.name}</dd>
										</div>
										<div className='flex justify-between'>
											<dt className='text-muted-foreground'>Gender:</dt>
											<dd className='font-medium'>{selectedProduct?.gender}</dd>
										</div>
										<div className='flex justify-between'>
											<dt className='text-muted-foreground'>Season:</dt>
											<dd className='font-medium'>{selectedProduct?.season}</dd>
										</div>
										<div className='flex justify-between'>
											<dt className='text-muted-foreground'>Category:</dt>
											<dd className='font-medium'>{selectedProduct?.category.name}</dd>
										</div>
									</dl>
								</div>
								<div>
									<h4 className='font-semibold text-sm mb-4'>Materials</h4>
									<ul className='space-y-2'>
										{selectedProduct?.material.map((material, index) => (
											<li
												key={index}
												className='flex items-center gap-2'
											>
												<Award className='w-4 h-4 text-green-600' />
												<span>{material}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem
						key={tabData[2].value}
						value={tabData[2].value}
					>
						<AccordionTrigger className='px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg data-[state=open]:rounded-b-none'>
							<span className='font-semibold text-left'>{tabData[2].title}</span>
						</AccordionTrigger>
						<AccordionContent className='px-6 pb-6 pt-2'>
							<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
								<p className='text-blue-800 font-medium'>
									{selectedProduct?.careInstructions}
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem
						key={tabData[3].value}
						value={tabData[3].value}
					>
						<AccordionTrigger className='px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg data-[state=open]:rounded-b-none'>
							<span className='font-semibold text-left'>{tabData[3].title}</span>
						</AccordionTrigger>
						<AccordionContent className='px-6 pb-6 pt-2'>
							<div className='grid md:grid-cols-2 gap-8'>
								<div>
									<h4 className='font-semibold text-lg mb-4'>Shipping Information</h4>
									<div className='space-y-4'>
										<div className='flex items-start gap-3'>
											<Truck className='w-5 h-5 text-purple-600 mt-0.5' />
											<div>
												<div className='font-medium'>Free Standard Shipping</div>
												<div className='text-muted-foreground text-sm'>
													On orders over $75 • 5-7 business days
												</div>
											</div>
										</div>
										<div className='flex items-start gap-3'>
											<Zap className='w-5 h-5 text-purple-600 mt-0.5' />
											<div>
												<div className='font-medium'>Express Shipping</div>
												<div className='text-muted-foreground text-sm'>
													$9.99 • 2-3 business days
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<h4 className='font-semibold text-lg mb-4'>Returns & Exchanges</h4>
									<div className='space-y-4'>
										<div className='flex items-start gap-3'>
											<RotateCcw className='w-5 h-5 text-purple-600 mt-0.5' />
											<div>
												<div className='font-medium'>30-Day Returns</div>
												<div className='text-muted-foreground text-sm'>
													Free returns on all orders
												</div>
											</div>
										</div>
										<div className='flex items-start gap-3'>
											<Shield className='w-5 h-5 text-purple-600 mt-0.5' />
											<div>
												<div className='font-medium'>Easy Process</div>
												<div className='text-muted-foreground text-sm'>
													Print return label from your account
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default DetailedProductTabs;
