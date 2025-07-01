'use client';

import { motion } from 'framer-motion';

const Footer = () => {
	return (
		<footer className='bg-background text-white'>
			<div className='container mx-auto px-6 py-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Brand Section */}
					<div className='space-y-4 max-md:text-center'>
						<motion.div
							className='flex items-center max-md:justify-center gap-2'
							whileHover={{ scale: 1.05 }}
						>
							<motion.div
								className='w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center'
								animate={{ rotate: 360 }}
								transition={{
									duration: 10,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'linear',
								}}
							>
								<span className='text-white font-bold text-sm'>PB</span>
							</motion.div>
							<h3 className='text-2xl font-bold text-foreground'>PURPLE BEE</h3>
						</motion.div>
						<p className='text-muted-foreground leading-relaxed'>
							Your ultimate destination for premium fashion and streetwear. Discover
							the latest trends and express your unique style.
						</p>
						<div className='flex space-x-4 max-md:justify-center'>
							{['f', 't', 'i', 'y'].map((social) => (
								<motion.a
									key={social}
									href='#'
									className='w-10 h-10 bg-foreground rounded-full flex items-center justify-center text-background hover:bg-purple-600 transition-colors duration-300'
									whileHover={{ scale: 1.1, y: -2 }}
									whileTap={{ scale: 0.9 }}
								>
									<span className='text-sm'>{social}</span>
								</motion.a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div className='space-y-4'>
						<h4 className='text-lg font-semibold text-foreground max-md:text-center'>
							Quick Links
						</h4>
						<ul className='space-y-2 max-md:text-center'>
							{[
								'Home',
								'About Us',
								'New Arrivals',
								'Best Sellers',
								'Sale',
								'Contact',
							].map((link) => (
								<li key={link}>
									<motion.a
										href='#'
										className='text-muted-foreground hover:text-muted-foreground/50 transition-colors duration-300 inline-block'
										whileHover={{ x: 5 }}
									>
										{link}
									</motion.a>
								</li>
							))}
						</ul>
					</div>

					{/* Categories */}
					<div className='space-y-4'>
						<h4 className='text-lg font-semibold text-foreground max-md:text-center'>
							Categories
						</h4>
						<ul className='space-y-2 max-md:text-center'>
							{['Sneakers', 'Shirts', 'Pants', 'Jeans', 'Accessories', 'Brands'].map(
								(category) => (
									<li key={category}>
										<motion.a
											href='#'
											className='text-muted-foreground hover:text-muted-foreground/50 transition-colors duration-300 inline-block'
											whileHover={{ x: 5 }}
										>
											{category}
										</motion.a>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Customer Service */}
					<div className='space-y-4'>
						<h4 className='text-lg font-semibold text-foreground max-md:text-center'>
							Customer Service
						</h4>
						<ul className='space-y-2 max-md:text-center'>
							{[
								'Size Guide',
								'Shipping Info',
								'Returns',
								'FAQ',
								'Track Order',
								'Support',
							].map((service) => (
								<li key={service}>
									<motion.a
										href='#'
										className='text-muted-foreground hover:text-muted-foreground/50 transition-colors duration-300 inline-block'
										whileHover={{ x: 5 }}
									>
										{service}
									</motion.a>
								</li>
							))}
						</ul>
						<div className='pt-4 space-y-2 max-md:text-center'>
							<p className='text-muted-foreground text-sm'>📧 support@purplebee.com</p>
							<p className='text-muted-foreground text-sm'>📞 +1 (555) 123-4567</p>
							<p className='text-muted-foreground text-sm'>🕒 Mon-Fri 9AM-6PM EST</p>
						</div>
					</div>
				</div>

				{/* Payment Methods */}
				<div className='border-t mt-12 pt-8'>
					<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
						<div className='flex items-center gap-4'>
							<span className='text-muted-foreground'>We Accept:</span>
							<div className='flex gap-2'>
								{['VISA', 'MC', 'AMEX', 'PAYPAL'].map((payment, index) => (
									<motion.div
										key={payment}
										className='w-12 h-8 bg-foreground rounded flex items-center justify-center'
										whileHover={{ scale: 1.1, y: -2 }}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
									>
										<span className='text-xs text-background'>{payment}</span>
									</motion.div>
								))}
							</div>
						</div>
						<div className='flex items-center gap-4 text-sm text-muted-foreground'>
							{['Privacy Policy', 'Terms of Service', 'Cookies'].map((legal) => (
								<motion.a
									key={legal}
									href='#'
									className='hover:text-muted-foreground/50 transition-colors'
									whileHover={{ y: -2 }}
								>
									{legal}
								</motion.a>
							))}
						</div>
					</div>
				</div>

				{/* Copyright */}
				<motion.div
					className='border-t mt-8 pt-8 text-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.8 }}
				>
					<p className='text-muted-foreground'>
						© 2024 Purple Bee Fashion. All rights reserved. | Designed with 💜 for
						fashion lovers
					</p>
				</motion.div>
			</div>
		</footer>
	);
};

export default Footer;
