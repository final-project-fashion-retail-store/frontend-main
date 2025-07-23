import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

type Props = {
	isOpen: boolean;
	setIsOpenChange: (open: boolean) => void;
	dialogTitle: React.ReactNode | string;
	body: React.ReactNode;
};

const DialogCustom = ({
	isOpen,
	setIsOpenChange,
	dialogTitle,
	body,
}: Props) => {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpenChange}
		>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-3'>
						{dialogTitle}
					</DialogTitle>
					<DialogDescription className='sr-only'>Dialog content</DialogDescription>
				</DialogHeader>

				{body}
			</DialogContent>
		</Dialog>
	);
};

export default DialogCustom;
