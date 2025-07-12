'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Heart,
	Share2,
	ShoppingCart,
	Star,
	Truck,
	Shield,
	RotateCcw,
	ChevronLeft,
	ChevronRight,
	Plus,
	Minus,
	Check,
	Info,
	Zap,
	Award,
	Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchDropdown from '@/components/header/SearchDropdown';
import BreadcrumbCustom from '@/components/custom/breadcrumb-custom';
import ImageZoomModal from '@/components/product/ImageZoomModal';

// Image Zoom Modal Component

// Mock product data based on the provided structure
const productData = {
	_id: '6868f65f095951afc7251430',
	name: 'Adidas Z.N.E. Woven Full-Zip Hooded Track Top',
	description:
		'Achieve ultimate focus with the Adidas Z.N.E. Woven Full-Zip Hooded Track Top. Crafted from lightweight, breathable woven fabric, this hooded track top is designed to minimize distractions and maximize comfort before, during, and after training. It features a full-zip closure, a comfortable hood, and a modern, athletic fit. Perfect for layering or as a standalone piece for your active lifestyle.',
	shortDescription:
		'Lightweight, breathable full-zip hooded track top from the Adidas Z.N.E. collection, designed for focused comfort.',
	price: 91.2,
	salePrice: 89.99,
	category: {
		_id: '683f14e6325fa38736755a2c',
		name: 'Hoodies & Sweatshirts',
		parentCategory: '683f148c325fa38736755a20',
		slug: 'hoodies-and-sweatshirts',
	},
	brand: {
		logo: {
			public_id: 'sgshiloffa4i3h4dklyw',
			url: 'https://res.cloudinary.com/dx2akttki/image/upload/v1749052734/sgshiloffa4i3h4dklyw.svg',
		},
		_id: '68406d91543b2a86575069d3',
		name: 'Adidas',
	},
	images: [
		{
			public_id: 'mluhbni7p3crlqcynqeo',
			url: 'https://res.cloudinary.com/dx2akttki/image/upload/v1751709069/mluhbni7p3crlqcynqeo.avif',
		},
		{
			public_id: 'ziais3rttp4urfgtto6r',
			url: 'https://res.cloudinary.com/dx2akttki/image/upload/v1751709084/ziais3rttp4urfgtto6r.avif',
		},
		{
			public_id: 'zklbdrsompxihjkmasga',
			url: 'https://res.cloudinary.com/dx2akttki/image/upload/v1751709085/zklbdrsompxihjkmasga.avif',
		},
		{
			public_id: 'bpihiyk8yfwmkuxayof1',
			url: 'https://res.cloudinary.com/dx2akttki/image/upload/v1751709085/bpihiyk8yfwmkuxayof1.avif',
		},
	],
	colorImages: {
		Green: [
			{
				public_id: 'otpjmrvx9njweh5celng',
				url: 'https://res.cloudinary.com/dx2akttki/image/upload/v1751709234/otpjmrvx9njweh5celng.avif',
			},
			{
				public_id: 'jyk7csfdxktkeasavjp7',
				url: 'https://res.cloudinary.com/dx2akttki/image/upload/v1751709246/jyk7csfdxktkeasavjp7.avif',
			},
			{
				public_id: 'n1xcrlemj6p3ea4ccmyr',
				url: 'https://res.cloudinary.com/dx2akttki/image/upload/v1751709246/n1xcrlemj6p3ea4ccmyr.avif',
			},
			{
				public_id: 'oq288aasoioiz9qkdmea',
				url: 'https://res.cloudinary.com/dx2akttki/image/upload/v1751709246/oq288aasoioiz9qkdmea.avif',
			},
		],
	},
	tags: [
		'adidas',
		'zne',
		'track top',
		'hoodie',
		'sportswear',
		'training',
		"men's apparel",
		'woven',
		'full-zip',
		'tent green',
	],
	gender: 'Men',
	season: 'All Season',
	material: ['100% Recycled Polyester (Woven)'],
	careInstructions:
		'Machine wash cold. Do not bleach. Tumble dry low. Cool iron if needed. Do not dry clean.',
	variants: [
		{
			sku: 'AZWFHTT-GRE-S',
			color: 'Green',
			size: 'S',
			price: 91.2,
			salePrice: 89.99,
			inventory: 20,
			reservedInventory: 0,
			_id: '6868f65f095951afc7251431',
		},
		{
			sku: 'AZWFHTT-GRE-M',
			color: 'Green',
			size: 'M',
			price: 91.2,
			salePrice: 89.99,
			inventory: 20,
			reservedInventory: 0,
			_id: '6868f65f095951afc7251432',
		},
		{
			sku: 'AZWFHTT-GRE-L',
			color: 'Green',
			size: 'L',
			price: 91.2,
			salePrice: 89.99,
			inventory: 20,
			reservedInventory: 0,
			_id: '6868f65f095951afc7251433',
		},
		{
			sku: 'AZWFHTT-GRE-XL',
			color: 'Green',
			size: 'XL',
			price: 91.2,
			salePrice: 89.99,
			inventory: 20,
			reservedInventory: 0,
			_id: '6868f65f095951afc7251434',
		},
		{
			sku: 'AZWFHTT-GRE-XXL',
			color: 'Green',
			size: 'XXL',
			price: 91.2,
			salePrice: 89.99,
			inventory: 20,
			reservedInventory: 0,
			_id: '6868f65f095951afc7251435',
		},
		{
			sku: 'AZWFHTT-GRE-XXXL',
			color: 'Green',
			size: 'XXXL',
			price: 91.2,
			salePrice: 89.99,
			inventory: 20,
			reservedInventory: 0,
			_id: '6868f65f095951afc7251436',
		},
	],
	active: true,
	inStock: true,
	featuredProduct: true,
	averageRating: 4.6,
	totalReviews: 127,
	slug: 'adidas-zne-woven-full-zip-hooded-track-top',
};

// Mock reviews data
const reviewsData = [
	{
		id: 1,
		user: {
			name: 'Alex Johnson',
			avatar: '/placeholder.svg?height=40&width=40&text=AJ',
			verified: true,
		},
		rating: 5,
		title: 'Perfect for training sessions',
		comment:
			'This track top is exactly what I needed for my morning runs. The fabric is incredibly lightweight yet warm enough for cooler days. The fit is perfect and the quality feels premium.',
		date: '2024-12-15',
		helpful: 23,
		size: 'L',
		color: 'Green',
		verified_purchase: true,
	},
	{
		id: 2,
		user: {
			name: 'Sarah Chen',
			avatar: '/placeholder.svg?height=40&width=40&text=SC',
			verified: true,
		},
		rating: 4,
		title: 'Great quality, runs slightly large',
		comment:
			'Love the design and the material feels great. Only issue is it runs a bit large - I probably should have ordered a size down. But overall very happy with the purchase.',
		date: '2024-12-10',
		helpful: 18,
		size: 'M',
		color: 'Green',
		verified_purchase: true,
	},
	{
		id: 3,
		user: {
			name: 'Mike Rodriguez',
			avatar: '/placeholder.svg?height=40&width=40&text=MR',
			verified: false,
		},
		rating: 5,
		title: 'Excellent for layering',
		comment:
			'This is my go-to piece for layering. Works great over a t-shirt or under a jacket. The zip quality is excellent and the hood fits perfectly. Highly recommend!',
		date: '2024-12-08',
		helpful: 31,
		size: 'XL',
		color: 'Green',
		verified_purchase: true,
	},
	{
		id: 4,
		user: {
			name: 'Emma Wilson',
			avatar: '/placeholder.svg?height=40&width=40&text=EW',
			verified: true,
		},
		rating: 4,
		title: 'Stylish and comfortable',
		comment:
			"Really like the minimalist design. It's comfortable for both workouts and casual wear. The green color is more vibrant than expected, which I love.",
		date: '2024-12-05',
		helpful: 12,
		size: 'S',
		color: 'Green',
		verified_purchase: true,
	},
];

// Mock related products
const relatedProducts = [
	{
		id: 1,
		name: 'Adidas Samba OG Shoes',
		price: 102.6,
		salePrice: null,
		image:
			'https://res.cloudinary.com/dx2akttki/image/upload/v1751706839/we91rfad2plitpcoztgv.avif',
		brand: 'Adidas',
		rating: 4.8,
		reviews: 89,
	},
	{
		id: 2,
		name: 'Adidas Adilette Slides',
		price: 35,
		salePrice: 34.59,
		image:
			'https://res.cloudinary.com/dx2akttki/image/upload/v1751707476/te0zaxb2nqukslxs9zra.avif',
		brand: 'Adidas',
		rating: 4.5,
		reviews: 156,
	},
	{
		id: 3,
		name: 'Nike Dri-FIT Training Top',
		price: 75,
		salePrice: 69.99,
		image: '/placeholder.svg?height=300&width=300',
		brand: 'Nike',
		rating: 4.4,
		reviews: 203,
	},
	{
		id: 4,
		name: 'Under Armour Hoodie',
		price: 85,
		salePrice: null,
		image: '/placeholder.svg?height=300&width=300',
		brand: 'Under Armour',
		rating: 4.6,
		reviews: 134,
	},
];

type Props = {
	slug: string;
};

function ProductPage({ slug }: Props) {
	const [selectedColor, setSelectedColor] = useState('Green');
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [showImageModal, setShowImageModal] = useState(false);
	const [modalImageIndex, setModalImageIndex] = useState(0);
	const [activeTab, setActiveTab] = useState('description');

	// Get current images based on selected color
	const getCurrentImages = () => {
		if (
			selectedColor &&
			productData.colorImages[
				selectedColor as keyof typeof productData.colorImages
			]
		) {
			return productData.colorImages[
				selectedColor as keyof typeof productData.colorImages
			];
		}
		return productData.images;
	};

	// Get available colors
	const getAvailableColors = () => {
		const colors = new Set<string>();
		productData.variants.forEach((variant) => colors.add(variant.color));
		return Array.from(colors);
	};

	// Get available sizes for selected color
	const getAvailableSizes = () => {
		return productData.variants
			.filter((variant) => variant.color === selectedColor)
			.map((variant) => ({
				size: variant.size,
				inventory: variant.inventory,
				inStock: variant.inventory > 0,
			}));
	};

	// Get selected variant
	const getSelectedVariant = () => {
		return productData.variants.find(
			(variant) => variant.color === selectedColor && variant.size === selectedSize
		);
	};

	const currentImages = getCurrentImages();
	const availableColors = getAvailableColors();
	const availableSizes = getAvailableSizes();
	const selectedVariant = getSelectedVariant();
	const isInStock = selectedVariant ? selectedVariant.inventory > 0 : false;
	const discount = productData.salePrice
		? Math.round(
				((productData.price - productData.salePrice) / productData.price) * 100
		  )
		: 0;

	// Set default color and size
	useEffect(() => {
		if (availableColors.length > 0 && !selectedColor) {
			setSelectedColor(availableColors[0]);
		}
	}, [availableColors, selectedColor]);

	const handleAddToCart = () => {
		if (!selectedSize) {
			alert('Please select a size');
			return;
		}
		console.log('Adding to cart:', {
			product: productData.name,
			color: selectedColor,
			size: selectedSize,
			quantity,
			variant: selectedVariant,
		});
	};

	const handleQuantityChange = (change: number) => {
		const newQuantity = quantity + change;
		if (
			newQuantity >= 1 &&
			(!selectedVariant || newQuantity <= selectedVariant.inventory)
		) {
			setQuantity(newQuantity);
		}
	};

	const nextImage = () => {
		setSelectedImage((prev) => (prev + 1) % currentImages.length);
	};

	const prevImage = () => {
		setSelectedImage(
			(prev) => (prev - 1 + currentImages.length) % currentImages.length
		);
	};

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Brand', href: `/brand/${slug}` },
	];

	return (
		<div className='min-h-screen'>
			<div className='container mx-auto px-4 py-8'>
				{/* Breadcrumbs */}
				<div className='max-sm:hidden'>
					<BreadcrumbCustom items={breadcrumbs} />
				</div>

				<div className='grid lg:grid-cols-2 gap-12 mb-16'>
					{/* Product Images */}
					<div className='space-y-4'>
						{/* Main Image */}
						<motion.div
							className='relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group cursor-zoom-in'
							onClick={() => {
								setModalImageIndex(selectedImage);
								setShowImageModal(true);
							}}
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
						>
							<AnimatePresence mode='wait'>
								<motion.div
									key={`${selectedColor}-${selectedImage}`}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									className='w-full h-full'
								>
									<Image
										src={currentImages[selectedImage]?.url || '/placeholder.svg'}
										alt={productData.name}
										fill
										className='object-cover'
										priority
									/>
								</motion.div>
							</AnimatePresence>

							{/* Navigation Arrows */}
							{currentImages.length > 1 && (
								<>
									<button
										onClick={(e) => {
											e.stopPropagation();
											prevImage();
										}}
										className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
									>
										<ChevronLeft className='w-5 h-5' />
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											nextImage();
										}}
										className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
									>
										<ChevronRight className='w-5 h-5' />
									</button>
								</>
							)}

							{/* Badges */}
							<div className='absolute top-4 left-4 flex flex-col gap-2'>
								{discount > 0 && (
									<Badge className='bg-red-600 text-white'>-{discount}% OFF</Badge>
								)}
								{productData.featuredProduct && (
									<Badge className='bg-purple-600 text-white'>
										<Zap className='w-3 h-3 mr-1' />
										Featured
									</Badge>
								)}
							</div>
						</motion.div>

						{/* Thumbnail Images */}
						{currentImages.length > 1 && (
							<div className='grid grid-cols-4 gap-3'>
								{currentImages.map((image: { url: string }, index: number) => (
									<motion.button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
											selectedImage === index
												? 'border-purple-600 ring-2 ring-purple-200'
												: 'border-gray-200 hover:border-gray-300'
										}`}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Image
											src={image.url || '/placeholder.svg'}
											alt={`${productData.name} view ${index + 1}`}
											width={100}
											height={100}
											className='w-full h-full object-cover'
										/>
									</motion.button>
								))}
							</div>
						)}
					</div>

					{/* Product Info */}
					<div className='space-y-6'>
						{/* Brand & Title */}
						<div className='space-y-2'>
							<div className='flex items-center gap-3'>
								<Image
									src={productData.brand.logo.url || '/placeholder.svg'}
									alt={productData.brand.name}
									width={32}
									height={32}
									className='object-contain'
								/>
								<span className='text-purple-600 font-semibold'>
									{productData.brand.name}
								</span>
							</div>
							<h1 className='text-3xl font-bold text-gray-900'>{productData.name}</h1>
							<p className='text-gray-600 text-lg'>{productData.shortDescription}</p>
						</div>

						{/* Rating & Reviews */}
						<div className='flex items-center gap-4'>
							<div className='flex items-center gap-2'>
								<div className='flex'>
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-5 h-5 ${
												i < Math.floor(productData.averageRating)
													? 'text-yellow-400 fill-current'
													: 'text-gray-300'
											}`}
										/>
									))}
								</div>
								<span className='font-semibold'>{productData.averageRating}</span>
								<span className='text-gray-600'>
									({productData.totalReviews} reviews)
								</span>
							</div>
							<Badge
								variant='secondary'
								className='bg-green-100 text-green-700'
							>
								<Users className='w-3 h-3 mr-1' />
								{productData.totalReviews}+ customers
							</Badge>
						</div>

						{/* Price */}
						<div className='space-y-2'>
							<div className='flex items-center gap-3'>
								<span className='text-3xl font-bold text-purple-600'>
									${productData.salePrice || productData.price}
								</span>
								{productData.salePrice && (
									<span className='text-xl text-gray-500 line-through'>
										${productData.price}
									</span>
								)}
								{discount > 0 && (
									<Badge className='bg-red-100 text-red-700'>
										Save ${(productData.price - productData.salePrice!).toFixed(2)}
									</Badge>
								)}
							</div>
							<p className='text-sm text-gray-600'>
								Tax included. Shipping calculated at checkout.
							</p>
						</div>

						{/* Color Selection */}
						<div className='space-y-3'>
							<div className='flex items-center gap-2'>
								<span className='font-medium'>Color:</span>
								<span className='text-gray-600'>{selectedColor}</span>
							</div>
							<div className='flex gap-3'>
								{availableColors.map((color) => (
									<motion.button
										key={color}
										onClick={() => {
											setSelectedColor(color);
											setSelectedImage(0);
											setSelectedSize('');
										}}
										className={`w-12 h-12 rounded-full border-2 transition-all ${
											selectedColor === color
												? 'border-purple-600 ring-2 ring-purple-200'
												: 'border-gray-300 hover:border-gray-400'
										} ${
											color === 'Green'
												? 'bg-green-600'
												: color === 'Black'
												? 'bg-black'
												: color === 'White'
												? 'bg-white'
												: color === 'Beige'
												? 'bg-amber-100'
												: 'bg-gray-400'
										}`}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										title={color}
									/>
								))}
							</div>
						</div>

						{/* Size Selection */}
						<div className='space-y-3'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<span className='font-medium'>Size:</span>
									{selectedSize && <span className='text-gray-600'>{selectedSize}</span>}
								</div>
								<Button
									variant='ghost'
									size='sm'
									className='text-purple-600 hover:text-purple-700'
								>
									<Info className='w-4 h-4 mr-1' />
									Size Guide
								</Button>
							</div>
							<div className='grid grid-cols-3 gap-3'>
								{availableSizes.map(({ size, inventory, inStock }) => (
									<motion.button
										key={size}
										onClick={() => inStock && setSelectedSize(size)}
										disabled={!inStock}
										className={`py-3 px-4 border rounded-lg font-medium transition-all ${
											selectedSize === size
												? 'border-purple-600 bg-purple-50 text-purple-600'
												: inStock
												? 'border-gray-300 hover:border-gray-400 text-gray-900'
												: 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
										}`}
										whileHover={inStock ? { scale: 1.05 } : {}}
										whileTap={inStock ? { scale: 0.95 } : {}}
									>
										{size}
										{!inStock && (
											<div className='text-xs text-red-500 mt-1'>Out of Stock</div>
										)}
										{inStock && inventory <= 5 && (
											<div className='text-xs text-orange-500 mt-1'>
												Only {inventory} left
											</div>
										)}
									</motion.button>
								))}
							</div>
						</div>

						{/* Quantity & Add to Cart */}
						<div className='space-y-4'>
							<div className='flex items-center gap-4'>
								<span className='font-medium'>Quantity:</span>
								<div className='flex items-center border border-gray-300 rounded-lg'>
									<button
										onClick={() => handleQuantityChange(-1)}
										disabled={quantity <= 1}
										className='p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
									>
										<Minus className='w-4 h-4' />
									</button>
									<span className='px-4 py-2 font-medium'>{quantity}</span>
									<button
										onClick={() => handleQuantityChange(1)}
										disabled={!selectedVariant || quantity >= selectedVariant.inventory}
										className='p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
									>
										<Plus className='w-4 h-4' />
									</button>
								</div>
								{selectedVariant && (
									<span className='text-sm text-gray-600'>
										{selectedVariant.inventory} available
									</span>
								)}
							</div>

							<div className='flex gap-3'>
								<motion.div
									className='flex-1'
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										onClick={handleAddToCart}
										disabled={!selectedSize || !isInStock}
										className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold'
									>
										<ShoppingCart className='w-5 h-5 mr-2' />
										{!selectedSize
											? 'Select Size'
											: !isInStock
											? 'Out of Stock'
											: 'Add to Cart'}
									</Button>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<Button
										variant='outline'
										size='lg'
										onClick={() => setIsWishlisted(!isWishlisted)}
										className={`px-6 py-6 ${
											isWishlisted ? 'text-red-600 border-red-600' : ''
										}`}
									>
										<Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
									</Button>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<Button
										variant='outline'
										size='lg'
										className='px-6 py-6 bg-transparent'
									>
										<Share2 className='w-5 h-5' />
									</Button>
								</motion.div>
							</div>
						</div>

						{/* Features */}
						<div className='grid grid-cols-3 gap-4 pt-6 border-t'>
							<div className='text-center space-y-2'>
								<Truck className='w-6 h-6 mx-auto text-purple-600' />
								<div className='text-sm'>
									<div className='font-medium'>Free Shipping</div>
									<div className='text-gray-600'>On orders $75+</div>
								</div>
							</div>
							<div className='text-center space-y-2'>
								<RotateCcw className='w-6 h-6 mx-auto text-purple-600' />
								<div className='text-sm'>
									<div className='font-medium'>Easy Returns</div>
									<div className='text-gray-600'>30-day policy</div>
								</div>
							</div>
							<div className='text-center space-y-2'>
								<Shield className='w-6 h-6 mx-auto text-purple-600' />
								<div className='text-sm'>
									<div className='font-medium'>Secure Payment</div>
									<div className='text-gray-600'>SSL protected</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Product Details Tabs */}
				<div className='mb-16'>
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full'
					>
						<TabsList className='grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg'>
							<TabsTrigger
								value='description'
								className='data-[state=active]:bg-white'
							>
								Description
							</TabsTrigger>
							<TabsTrigger
								value='specifications'
								className='data-[state=active]:bg-white'
							>
								Specifications
							</TabsTrigger>
							<TabsTrigger
								value='care'
								className='data-[state=active]:bg-white'
							>
								Care Instructions
							</TabsTrigger>
							<TabsTrigger
								value='shipping'
								className='data-[state=active]:bg-white'
							>
								Shipping & Returns
							</TabsTrigger>
						</TabsList>

						<TabsContent
							value='description'
							className='mt-6'
						>
							<Card>
								<CardContent className='p-6'>
									<div className='prose max-w-none'>
										<p className='text-gray-700 leading-relaxed text-lg'>
											{productData.description}
										</p>
										<div className='mt-6'>
											<h4 className='font-semibold text-lg mb-3'>Key Features:</h4>
											<ul className='space-y-2 text-gray-700'>
												<li className='flex items-center gap-2'>
													<Check className='w-4 h-4 text-green-600' />
													Lightweight, breathable woven fabric
												</li>
												<li className='flex items-center gap-2'>
													<Check className='w-4 h-4 text-green-600' />
													Full-zip closure with comfortable hood
												</li>
												<li className='flex items-center gap-2'>
													<Check className='w-4 h-4 text-green-600' />
													Modern, athletic fit
												</li>
												<li className='flex items-center gap-2'>
													<Check className='w-4 h-4 text-green-600' />
													Perfect for layering or standalone wear
												</li>
												<li className='flex items-center gap-2'>
													<Check className='w-4 h-4 text-green-600' />
													Designed to minimize distractions during training
												</li>
											</ul>
										</div>
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
													<dt className='text-gray-600'>Brand:</dt>
													<dd className='font-medium'>{productData.brand.name}</dd>
												</div>
												<div className='flex justify-between'>
													<dt className='text-gray-600'>Gender:</dt>
													<dd className='font-medium'>{productData.gender}</dd>
												</div>
												<div className='flex justify-between'>
													<dt className='text-gray-600'>Season:</dt>
													<dd className='font-medium'>{productData.season}</dd>
												</div>
												<div className='flex justify-between'>
													<dt className='text-gray-600'>Category:</dt>
													<dd className='font-medium'>{productData.category.name}</dd>
												</div>
											</dl>
										</div>
										<div>
											<h4 className='font-semibold text-lg mb-4'>Materials</h4>
											<ul className='space-y-2'>
												{productData.material.map((material, index) => (
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
											{productData.careInstructions}
										</p>
									</div>
									<div className='grid md:grid-cols-2 gap-6'>
										<div>
											<h5 className='font-medium mb-3'>Do&apos;s:</h5>
											<ul className='space-y-2 text-gray-700'>
												<li className='flex items-center gap-2'>
													<Check className='w-4 h-4 text-green-600' />
													Machine wash in cold water
												</li>
												<li className='flex items-center gap-2'>
													<Check className='w-4 h-4 text-green-600' />
													Tumble dry on low heat
												</li>
												<li className='flex items-center gap-2'>
													<Check className='w-4 h-4 text-green-600' />
													Iron on cool setting if needed
												</li>
											</ul>
										</div>
										<div>
											<h5 className='font-medium mb-3'>Don&apos;ts:</h5>
											<ul className='space-y-2 text-gray-700'>
												<li className='flex items-center gap-2'>
													<span className='w-4 h-4 text-red-600'>✗</span>
													Do not bleach
												</li>
												<li className='flex items-center gap-2'>
													<span className='w-4 h-4 text-red-600'>✗</span>
													Do not dry clean
												</li>
												<li className='flex items-center gap-2'>
													<span className='w-4 h-4 text-red-600'>✗</span>
													Avoid high heat
												</li>
											</ul>
										</div>
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
														<div className='text-gray-600 text-sm'>
															On orders over $75 • 5-7 business days
														</div>
													</div>
												</div>
												<div className='flex items-start gap-3'>
													<Zap className='w-5 h-5 text-purple-600 mt-0.5' />
													<div>
														<div className='font-medium'>Express Shipping</div>
														<div className='text-gray-600 text-sm'>
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
														<div className='text-gray-600 text-sm'>
															Free returns on all orders
														</div>
													</div>
												</div>
												<div className='flex items-start gap-3'>
													<Shield className='w-5 h-5 text-purple-600 mt-0.5' />
													<div>
														<div className='font-medium'>Easy Process</div>
														<div className='text-gray-600 text-sm'>
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

				{/* Customer Reviews */}
				<div className='mb-16'>
					<Card>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between mb-6'>
								<h3 className='text-2xl font-bold'>Customer Reviews</h3>
								<div className='flex items-center gap-4'>
									<div className='text-right'>
										<div className='flex items-center gap-2'>
											<div className='flex'>
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className={`w-5 h-5 ${
															i < Math.floor(productData.averageRating)
																? 'text-yellow-400 fill-current'
																: 'text-gray-300'
														}`}
													/>
												))}
											</div>
											<span className='text-xl font-bold'>
												{productData.averageRating}
											</span>
										</div>
										<div className='text-sm text-gray-600'>
											Based on {productData.totalReviews} reviews
										</div>
									</div>
								</div>
							</div>

							<div className='space-y-6'>
								{reviewsData.map((review) => (
									<div
										key={review.id}
										className='border-b border-gray-200 pb-6 last:border-b-0'
									>
										<div className='flex items-start gap-4'>
											<Image
												src={review.user.avatar || '/placeholder.svg'}
												alt={review.user.name}
												width={48}
												height={48}
												className='rounded-full'
											/>
											<div className='flex-1'>
												<div className='flex items-center gap-2 mb-2'>
													<span className='font-semibold'>{review.user.name}</span>
													{review.user.verified && (
														<Badge
															variant='secondary'
															className='bg-green-100 text-green-700 text-xs'
														>
															<Check className='w-3 h-3 mr-1' />
															Verified
														</Badge>
													)}
													{review.verified_purchase && (
														<Badge
															variant='outline'
															className='text-xs'
														>
															Verified Purchase
														</Badge>
													)}
												</div>

												<div className='flex items-center gap-4 mb-2'>
													<div className='flex'>
														{[...Array(5)].map((_, i) => (
															<Star
																key={i}
																className={`w-4 h-4 ${
																	i < review.rating
																		? 'text-yellow-400 fill-current'
																		: 'text-gray-300'
																}`}
															/>
														))}
													</div>
													<span className='text-sm text-gray-600'>{review.date}</span>
													<div className='flex gap-2 text-xs'>
														<Badge variant='outline'>Size: {review.size}</Badge>
														<Badge variant='outline'>Color: {review.color}</Badge>
													</div>
												</div>

												<h4 className='font-medium mb-2'>{review.title}</h4>
												<p className='text-gray-700 mb-3'>{review.comment}</p>

												<div className='flex items-center gap-4 text-sm text-gray-600'>
													<button className='flex items-center gap-1 hover:text-purple-600'>
														<span>👍</span>
														Helpful ({review.helpful})
													</button>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className='text-center mt-8'>
								<Button
									variant='outline'
									className='bg-transparent'
								>
									Load More Reviews
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Related Products */}
				<div>
					<h3 className='text-2xl font-bold mb-6'>You Might Also Like</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{relatedProducts.map((product) => (
							<motion.div
								key={product.id}
								whileHover={{ y: -5 }}
								transition={{ duration: 0.3 }}
							>
								<Card className='group hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
									<div className='relative'>
										<Image
											src={product.image || '/placeholder.svg'}
											alt={product.name}
											width={300}
											height={300}
											className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
										/>
										{product.salePrice && (
											<Badge className='absolute top-3 left-3 bg-red-600 text-white'>
												Sale
											</Badge>
										)}
										<div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
											<Button
												size='sm'
												variant='secondary'
												className='w-8 h-8 p-0 rounded-full'
											>
												<Heart className='w-4 h-4' />
											</Button>
										</div>
									</div>
									<CardContent className='p-4'>
										<div className='space-y-2'>
											<p className='text-sm text-purple-600 font-medium'>
												{product.brand}
											</p>
											<h4 className='font-semibold leading-tight'>{product.name}</h4>
											<div className='flex items-center gap-2 text-sm'>
												<div className='flex'>
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`w-3 h-3 ${
																i < Math.floor(product.rating)
																	? 'text-yellow-400 fill-current'
																	: 'text-gray-300'
															}`}
														/>
													))}
												</div>
												<span className='text-gray-600'>({product.reviews})</span>
											</div>
											<div className='flex items-center gap-2'>
												<span className='text-lg font-bold text-purple-600'>
													${product.salePrice || product.price}
												</span>
												{product.salePrice && (
													<span className='text-sm text-gray-500 line-through'>
														${product.price}
													</span>
												)}
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Image Zoom Modal */}
			<AnimatePresence>
				{showImageModal && (
					<ImageZoomModal
						isOpen={showImageModal}
						onClose={() => setShowImageModal(false)}
						images={currentImages}
						currentIndex={modalImageIndex}
						onNavigate={setModalImageIndex}
						productName={productData.name}
					/>
				)}
			</AnimatePresence>

			{/* Sticky Add to Cart (Mobile) */}
			<div className='lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30'>
				<div className='flex items-center gap-3'>
					<div className='flex-1'>
						<div className='text-lg font-bold text-purple-600'>
							${productData.salePrice || productData.price}
						</div>
						{productData.salePrice && (
							<div className='text-sm text-gray-500 line-through'>
								${productData.price}
							</div>
						)}
					</div>
					<Button
						onClick={handleAddToCart}
						disabled={!selectedSize || !isInStock}
						className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8'
					>
						<ShoppingCart className='w-4 h-4 mr-2' />
						{!selectedSize
							? 'Select Size'
							: !isInStock
							? 'Out of Stock'
							: 'Add to Cart'}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ProductPage;
