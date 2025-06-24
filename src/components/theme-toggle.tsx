import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

type Props = {
	variant?: 'outline' | 'ghost';
};

const ThemeToggle = ({ variant = 'outline' }: Props) => {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			variant={variant}
			size={'icon'}
			onClick={() =>
				setTheme(theme === 'dark' || theme === 'system' ? 'light' : 'dark')
			}
		>
			{['dark', 'system'].includes(theme || '') ? <Moon /> : <Sun />}
		</Button>
	);
};

export default ThemeToggle;
