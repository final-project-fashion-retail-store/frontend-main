import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type Props = {
	items: {
		title: string;
		value: string;
	}[];
	value: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
};

const SelectCustom = ({ items, value, onValueChange, placeholder }: Props) => {
	return (
		<Select
			value={value}
			onValueChange={onValueChange}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => (
					<SelectItem
						key={item.value}
						value={item.value}
					>
						{item.title}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SelectCustom;
