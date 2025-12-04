import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/auth/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import ChatSupport from '@/components/chat-support';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import RoleGuard from '@/components/auth/RoleGuard';

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Home | Purple Bee',
	description:
		'Shop the latest fashion collection at Purple Bee. Find outfits that fit your style with fast delivery and secure checkout.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<head>
				<script
					src='https://accounts.google.com/gsi/client'
					async
					defer
				></script>
			</head>
			<body
				className={`${poppins.variable} antialiased`}
				suppressHydrationWarning
			>
				<main className='min-h-screen'>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<AuthProvider>
							<RoleGuard allowedRoles={['user']}>
								<Header />
								<ChatSupport />
								{children}
								<Footer />
							</RoleGuard>
						</AuthProvider>
						<Toaster />
					</ThemeProvider>
				</main>
			</body>
		</html>
	);
}
