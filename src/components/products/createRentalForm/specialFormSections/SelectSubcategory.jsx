/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	Label,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const SelectSubcategory = ({
	categories,
	label,
	name,
	basicItemInfo,
	setBasicItemInfo,
}) => {
	const dispatch = useDispatch();
	const [subCats, setSubCats] = useState(null);

	useEffect(() => {
		dispatch(
			setBasicItemInfo({
				...basicItemInfo,
				subCategory: null,
			})
		);
		basicItemInfo.category
			? setSubCats(
					categories.find((cat) => cat.id === basicItemInfo.category.id)
			  )
			: '';
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basicItemInfo.category]);

	return (
		<>
			{subCats && (
				<Listbox
					value={basicItemInfo.subCategory}
					onChange={(value) => {
						dispatch(
							setBasicItemInfo({
								...basicItemInfo,
								subCategory: { id: value.id, title: value.title },
							})
						);
					}}
				>
					<Label className='block text-sm font-medium leading-6 text-gray-900'>
						{label}
					</Label>
					<div className='relative mt-2'>
						<ListboxButton className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
							<span className='block truncate'>
								{basicItemInfo.subCategory && basicItemInfo.subCategory.title
									? basicItemInfo.subCategory.title
									: 'Select'}
							</span>
							<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
								<ChevronUpDownIcon
									aria-hidden='true'
									className='h-5 w-5 text-gray-400'
								/>
							</span>
						</ListboxButton>

						<ListboxOptions
							transition
							className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm'
						>
							{subCats.subcategories &&
								subCats.subcategories.map((cat) => (
									<ListboxOption
										key={cat.id}
										value={cat}
										name={name}
										onChange={() => console.log('changed')}
										className='group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white'
									>
										<span className='block truncate font-normal group-data-[selected]:font-semibold'>
											{cat.title}
										</span>

										<span className='absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden'>
											<CheckIcon aria-hidden='true' className='h-5 w-5' />
										</span>
									</ListboxOption>
								))}
						</ListboxOptions>
					</div>
				</Listbox>
			)}
		</>
	);
};

export default SelectSubcategory;
