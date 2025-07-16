'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BreadcrumbCustom from '@/components/custom/breadcrumb-custom';
import ImageZoomModal from '@/components/product/ImageZoomModal';
import useProductStore from '@/stores/productStore';
import { useShallow } from 'zustand/shallow';
import Loader from '@/components/Loader';
import DetailedProductImages from '@/components/product/DetailedProductImages';
import DetailedProductInfo from '@/components/product/DetailedProductInfo';
import DetailedProductTabs from '@/components/product/DetailedProductTabs';
import DetailedProductReviews from '@/components/product/DetailedProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';

type Props = {
	slug: string;
};

function ProductPage({ slug }: Props) {
	const [
		isGettingProducts,
		selectedProduct,
		relatedProducts,
		getProductBySlug,
		getRelatedProducts,
		reset,
	] = useProductStore(
		useShallow((state) => [
			state.isGettingProducts,
			state.selectedProduct,
			state.relatedProducts,
			state.getProductBySlug,
			state.getRelatedProducts,
			state.reset,
		])
	);

	const [currentImages, setCurrentImages] = useState<{ url: string }[]>([]);
	const [selectedImage, setSelectedImage] = useState(0);
	const [showImageModal, setShowImageModal] = useState(false);
	const [modalImageIndex, setModalImageIndex] = useState(0);

	useEffect(() => {
		// Fetch product data by slug
		getProductBySlug(slug);
		getRelatedProducts(slug);

		return () => {
			// Reset product state when component unmounts
			reset();
		};
	}, [getProductBySlug, getRelatedProducts, reset, slug]);

	useEffect(() => {
		setCurrentImages(Object.values(selectedProduct?.colorImages || {})[0] || []);
		// console.log(selectedProduct?.colorImages);
	}, [selectedProduct]);

	const getCurrentImages = (color: string) => {
		setSelectedImage(0);
		setCurrentImages(selectedProduct?.colorImages[color] || []);
	};

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: selectedProduct?.name || '', href: `/product/${slug}` },
	];

	// useEffect(() => {
	// 	console.log(currentImages);
	// }, [currentImages]);

	if (isGettingProducts) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Loader />
			</div>
		);
	}

	return (
		<div className='w-full'>
			{/* Breadcrumbs */}
			<div className='max-sm:hidden mb-8'>
				<BreadcrumbCustom items={breadcrumbs} />
			</div>

			<div className='grid lg:grid-cols-2 gap-12 mb-16'>
				{/* Product Images */}
				<DetailedProductImages
					selectedImage={selectedImage}
					currentImages={currentImages}
					selectedProduct={selectedProduct}
					setModalImageIndex={setModalImageIndex}
					setShowImageModal={setShowImageModal}
					setSelectedImage={setSelectedImage}
				/>

				{/* Product Info */}
				<DetailedProductInfo
					selectedProduct={selectedProduct}
					getCurrentImages={getCurrentImages}
				/>
			</div>

			{/* Product Details Tabs */}
			<DetailedProductTabs selectedProduct={selectedProduct} />

			{/* Customer Reviews */}
			<DetailedProductReviews selectedProduct={selectedProduct} />

			{/* Related Products */}
			<RelatedProducts relatedProducts={relatedProducts} />

			{/* Image Zoom Modal */}
			<AnimatePresence>
				{showImageModal && (
					<ImageZoomModal
						isOpen={showImageModal}
						onClose={() => setShowImageModal(false)}
						images={currentImages}
						currentIndex={modalImageIndex}
						onNavigate={setModalImageIndex}
						productName={selectedProduct?.name || ''}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}

export default ProductPage;
