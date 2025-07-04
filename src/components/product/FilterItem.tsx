import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type Props = {
	title: string;
	children: React.ReactNode;
	sectionKey:
		| 'colors'
		| 'brands'
		| 'sizes'
		| 'price'
		| 'availability'
		| 'categories';
	page?: 'category' | 'brand';
};
const FilterItem = ({ title, children, sectionKey, page }: Props) => {
	const initialExpandedSections: Record<string, boolean> = {
		colors: true,
		brands: true,
		categories: true,
		sizes: true,
		price: true,
		availability: true,
	};

	if (page === 'brand') {
		delete initialExpandedSections.brands;
	} else if (page === 'category') {
		delete initialExpandedSections.categories;
	}

	const [expandedSections, setExpandedSections] = useState(
		initialExpandedSections
	);

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	return (
		<div className='border-b border-gray-200 pb-4'>
			<button
				onClick={() => toggleSection(sectionKey)}
				className='flex items-center justify-between w-full py-2 text-left font-medium hover:text-purple-600'
			>
				<span>{title}</span>
				{expandedSections[sectionKey] ? (
					<ChevronDown className='w-4 h-4' />
				) : (
					<ChevronRight className='w-4 h-4' />
				)}
			</button>
			{expandedSections[sectionKey] && (
				<div className='mt-3 space-y-2'>{children}</div>
			)}
		</div>
	);
};

export default FilterItem;
