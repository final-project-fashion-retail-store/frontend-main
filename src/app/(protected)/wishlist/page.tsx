import { Separator } from '@/components/ui/separator';
import WishlistContainer from '@/components/wishlist/WishlistContainer';

const Wishlist = () => {
	return (
		<div className='container mx-auto py-8 px-2 2xl:px-6 3xl:px-0'>
			<WishlistContainer />
			<Separator className='w-full my-4' />
		</div>
	);
};

export default Wishlist;
