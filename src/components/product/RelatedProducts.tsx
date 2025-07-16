import { motion } from 'framer-motion';
import { RelatedProduct } from '@/types';
import ProductCard from '@/components/product/ProductCard';

type Props = {
	relatedProducts: RelatedProduct[] | null;
};

const RelatedProducts = ({ relatedProducts }: Props) => {
	return (
		<div>
			<h3 className='text-2xl font-bold mb-6'>You Might Also Like</h3>
			<div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
				{relatedProducts &&
					relatedProducts.length > 0 &&
					relatedProducts.map((product) => (
						<motion.div
							key={product._id}
							whileHover={{ y: -5 }}
							transition={{ duration: 0.3 }}
						>
							<ProductCard product={product} />
						</motion.div>
					))}
			</div>
		</div>
	);
};

export default RelatedProducts;
