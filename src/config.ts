import { z } from 'zod';

const configSchema = z.object({
	NEXT_PUBLIC_BASE_URL: z.string().url(),
	NEXT_PUBLIC_X_API_KEY: z.string().nonempty({ message: 'API key is required' }),
	NEXT_PUBLIC_GOOGLE_CLIENT_ID: z
		.string()
		.nonempty({ message: 'Google Client ID is required' }),
	NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
		.string()
		.nonempty({ message: 'Stripe Publishable Key is required' }),
});

const configProject = configSchema.safeParse({
	NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	NEXT_PUBLIC_X_API_KEY: process.env.NEXT_PUBLIC_X_API_KEY,
	NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
	NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
});

if (!configProject.success) {
	console.error(
		'❌ Invalid environment variables:',
		configProject.error.flatten().fieldErrors
	);
	throw new Error('Invalid environment variables');
}

const config = configProject.data;

export default config;
