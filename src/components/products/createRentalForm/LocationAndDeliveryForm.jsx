/* eslint-disable react/prop-types */

const LocationAndDeliveryForm = ({
	locationAndDelivery,
	setLocationAndDelivery,
}) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLocationAndDelivery({
			...locationAndDelivery,
			[name]: value,
		});
	};

	const handleDeliveryChange = (e) => {
		const { name, value } = e.target;
		setLocationAndDelivery({
			...locationAndDelivery,
			deliveryOptions: {
				...locationAndDelivery.deliveryOptions,
				[name]: value,
			},
		});
	};

	return (
		<div className='p-4 bg-white shadow rounded-lg'>
			<h2 className='text-lg text-teal-600 font-semibold mb-4'>
				Location and Delivery
			</h2>

			<div className='mb-4'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='location'
				>
					Location
				</label>
				<input
					type='text'
					id='location'
					name='location'
					value={locationAndDelivery.location}
					onChange={handleChange}
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
					placeholder='Location'
				/>
			</div>
			<div className='mb-4'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='deliveryAvailable'
				>
					Delivery Available
				</label>
				<select
					id='deliveryAvailable'
					name='available'
					value={locationAndDelivery.deliveryOptions.available}
					onChange={handleDeliveryChange}
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
				>
					<option value={true}>Yes</option>
					<option value={false}>No</option>
				</select>
			</div>
			{locationAndDelivery.deliveryOptions.available && (
				<div className='mb-4'>
					<label
						className='block text-sm font-medium text-gray-700'
						htmlFor='feePerMile'
					>
						Fee per Mile
					</label>
					<input
						type='number'
						id='feePerMile'
						name='feePerMile'
						value={locationAndDelivery.deliveryOptions.feePerMile}
						onChange={handleDeliveryChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
						placeholder='Fee per Mile'
					/>
				</div>
			)}
			<div className='mb-4'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='pickupInstructions'
				>
					Pickup Instructions
				</label>
				<textarea
					id='pickupInstructions'
					name='pickupInstructions'
					value={locationAndDelivery.pickupInstructions}
					onChange={handleChange}
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
					placeholder='Pickup Instructions'
					rows={3}
				/>
			</div>
			<div className='mb-4'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='returnInstructions'
				>
					Return Instructions
				</label>
				<textarea
					id='returnInstructions'
					name='returnInstructions'
					value={locationAndDelivery.returnInstructions}
					onChange={handleChange}
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
					placeholder='Return Instructions'
					rows={3}
				/>
			</div>
		</div>
	);
};

export default LocationAndDeliveryForm;
