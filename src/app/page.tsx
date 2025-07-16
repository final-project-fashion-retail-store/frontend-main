import Hero from '@/components/home/hero/Hero';
import Category from '@/components/home/category/Category';
import FeaturedBrand from '@/components/home/featuredBrand/FeaturedBrand';
import BestSelling from '@/components/home/bestSelling/BestSelling';
import Features from '@/components/home/Features';

const Home = () => {
	return (
		<div className='size-full'>
			<div className='container mx-auto py-8 px-2 2xl:px-6 3xl:px-0'>
				{/* Hero Section */}
				<Hero />
				{/* Categories Section */}
				<Category />

				{/* This Week's Brand Spotlight Section */}
				<FeaturedBrand />

				{/* Best Selling Products Section */}
				<BestSelling />
			</div>

			{/* Features Section */}
			<Features />
		</div>
	);
};

export default Home;
