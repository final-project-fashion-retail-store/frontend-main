import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import Link from 'next/link';

const ListItem = ({
	title,
	// children,
	centerTitle = false,
	href,
	...props
}: React.ComponentPropsWithoutRef<'li'> & {
	href: string;
	centerTitle?: boolean;
}) => {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div
						className={`text-sm leading-none font-medium ${
							centerTitle && 'text-center'
						}`}
					>
						{title}
					</div>
					{/* <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
						{children}
					</p> */}
				</Link>
			</NavigationMenuLink>
		</li>
	);
};

export default ListItem;
