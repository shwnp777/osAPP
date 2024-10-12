/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import SelectCategory from './specialFormSections/SelectCategory';
import SelectSubcategory from './specialFormSections/SelectSubcategory';
import SponsoredProduct from './SponsoredProduct';

const BasicItemInfoForm = ({ basicItemInfo, setBasicItemInfo, categories }) => {
	const dispatch = useDispatch();
	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);

		dispatch(
			setBasicItemInfo({
				...basicItemInfo,
				[name]: value,
			})
		);
	};

	return (
		<div className='p-4 bg-white shadow rounded-lg'>
			<h2 className='text-lg text-teal-600 font-semibold mb-4'>
				Basic Information
			</h2>
			<SponsoredProduct
				basicItemInfo={basicItemInfo}
				setBasicItemInfo={setBasicItemInfo}
			/>

			<div className='mb-4'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='title'
				>
					Title
				</label>
				<input
					type='text'
					id='title'
					name='title'
					value={basicItemInfo.title}
					onChange={handleChange}
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
					placeholder='Title'
				/>
			</div>
			<div className='mb-4'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='description'
				>
					Description
				</label>
				<textarea
					id='description'
					name='description'
					value={basicItemInfo.description}
					onChange={handleChange}
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
					placeholder='Description'
					rows={4}
				/>
			</div>
			<div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
				<div className='sm:col-span-3'>
					<SelectCategory
						categories={categories}
						basicItemInfo={basicItemInfo}
						setBasicItemInfo={setBasicItemInfo}
						label='Category'
						name='category'
					/>
				</div>
				{basicItemInfo.category && (
					<div className='sm:col-span-3'>
						<SelectSubcategory
							categories={categories}
							basicItemInfo={basicItemInfo}
							setBasicItemInfo={setBasicItemInfo}
							label='Subcategory'
							name='subcategory'
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default BasicItemInfoForm;
