import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import useCartStore from '@/stores/cartStore';
import { CartItem } from '@/types';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

type Props = {
	item: CartItem;
	getColor: (item: CartItem) => string;
	getSize: (item: CartItem) => string;
	setIsOpen: (isOpen: boolean) => void;
};

const getSizes = (item: CartItem, getColor: (item: CartItem) => string) => {
	const color = getColor(item);

	const sizes = item.product.variants
		.filter((v) => v.color === color)
		.map((v) => v.size);

	return sizes.length > 0 ? sizes : [];
};

const getSelectedVariant = (
	selectedColor: string,
	selectedSize: string,
	item: CartItem
) => {
	const variant = item.product.variants.find(
		(v) => v.color === selectedColor && v.size === selectedSize
	);
	return variant;
};

const EditItem = ({ item, getColor, getSize, setIsOpen }: Props) => {
	const [isUpdatingCartItem, updateCartItem] = useCartStore(
		useShallow((state) => [state.isUpdatingCartItem, state.updateCartItem])
	);
	const [selectedColor, setSelectedColor] = useState(getColor(item));
	const [selectedSize, setSelectedSize] = useState(getSize(item));
	const [quantity, setQuantity] = useState(item.quantity);

	const selectedVariant = getSelectedVariant(selectedColor, selectedSize, item);

	const handleClickSubmit = async () => {
		if (!selectedColor || !selectedSize || quantity <= 0) return;
		const result = await updateCartItem(
			item.product._id,
			item.variantId,
			quantity,
			selectedColor,
			selectedSize
		);

		if (result.success) {
			setIsOpen(false);
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};

	const handleClickColor = (color: string) => {
		setSelectedSize('');
		setSelectedColor(color);
		setQuantity(1);
	};
	return (
		<>
			<div className='space-y-6 py-4'>
				{/* Color Selection */}
				<div>
					<label className='text-sm font-medium text-gray-700 mb-3 block'>
						Color: {getColor(item)}
					</label>
					<div className='grid grid-cols-4 gap-3'>
						{Object.keys(item.product.colorImages).map((color: string) => (
							<button
								key={color}
								onClick={() => handleClickColor(color)}
								className={`aspect-square rounded-lg border-2 transition-all flex flex-col items-center justify-center p-2 ${
									color === selectedColor && 'border-purple-600 ring-2 ring-purple-200'
								}`}
							>
								<div
									className='w-8 h-8 rounded-full border border-gray-300 mb-1'
									style={{ backgroundColor: color.toLowerCase() }}
								/>
								<span className='text-xs font-medium'>{color}</span>
							</button>
						))}
					</div>
				</div>

				{/* Size Selection */}
				<div>
					<label className='text-sm font-medium text-gray-700 mb-3 block'>
						Size: {selectedSize}
					</label>
					<div className='grid grid-cols-3 gap-2'>
						{getSizes(item, getColor).map((size) => (
							<button
								key={size}
								onClick={() => setSelectedSize(size)}
								className={`py-3 px-4 border rounded-lg font-medium transition-all ${
									size === selectedSize &&
									'border-purple-600 bg-purple-50 text-purple-600'
								}`}
							>
								{size}
							</button>
						))}
					</div>
				</div>

				{/* Quantity Selection */}
				<div>
					<label className='text-sm font-medium text-gray-700 mb-3 block'>
						Quantity: {quantity}
					</label>
					<div className='flex items-center justify-center gap-4'>
						<button
							onClick={() => setQuantity(Math.max(1, quantity - 1))}
							disabled={quantity <= 1}
							className='w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
						>
							<Minus className='w-5 h-5' />
						</button>
						<div className='w-16 h-12 border border-gray-300 rounded-lg flex items-center justify-center'>
							<span className='text-lg font-semibold'>{quantity}</span>
						</div>
						<button
							onClick={() => setQuantity(Math.min(item.maxQuantity, quantity + 1))}
							disabled={quantity >= (selectedVariant?.inventory || 0)}
							className='w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
						>
							<Plus className='w-5 h-5' />
						</button>
					</div>
					{quantity >= (selectedVariant?.inventory || 0) && (
						<p className='text-xs text-orange-600 text-center mt-2'>
							Maximum quantity reached
						</p>
					)}
				</div>

				{/* Price Preview */}
				<div className='bg-gray-50 rounded-lg p-4'>
					<div className='flex justify-between items-center'>
						<span className='text-sm text-gray-600'>Total Price:</span>
						<div className='text-right'>
							<div className='text-lg font-bold text-purple-600'>
								${((selectedVariant?.salePrice || 0) * quantity).toFixed(2)}
							</div>
							{selectedVariant &&
								selectedVariant.salePrice < selectedVariant.price && (
									<div className='text-sm text-green-600'>
										Save $
										{(
											((selectedVariant?.price || 0) - (selectedVariant?.salePrice || 0)) *
											quantity
										).toFixed(2)}
									</div>
								)}
						</div>
					</div>
				</div>
			</div>
			<DialogFooter className='gap-2'>
				<DialogClose asChild>
					<Button variant='outline'>Cancel</Button>
				</DialogClose>
				<Button
					onClick={handleClickSubmit}
					className='bg-purple-600 hover:bg-purple-700 text-white'
					disabled={
						!selectedSize || !selectedColor || quantity <= 0 || isUpdatingCartItem
					}
				>
					Save Changes
				</Button>
			</DialogFooter>
		</>
	);
};

export default EditItem;
