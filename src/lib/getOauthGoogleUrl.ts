import config from '@/config';

const getOauthGoogleUrl = () => {
	const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
	const options = {
		redirect_uri: `${config.NEXT_PUBLIC_BASE_URL}/api/v1/auth/google/callback`,
		client_id: config.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		access_type: 'offline',
		response_type: 'code',
		prompt: 'consent',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		].join(' '),
	};
	const qs = new URLSearchParams(options);
	return `${rootUrl}?${qs.toString()}`;
};

export default getOauthGoogleUrl;
