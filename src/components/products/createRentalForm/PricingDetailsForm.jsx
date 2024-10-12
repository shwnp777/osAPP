/* eslint-disable react/prop-types */
import { useState } from 'react';

const PricingDetailsForm = ({ pricingDetails, setPricingDetails }) => {
	const [hourly, setHourly] = useState(false);
	const [half, setHalf] = useState(false);
	const [day, setDay] = useState(false);
	const [weekly, setWeekly] = useState(false);
	const [monthly, setMonthly] = useState(false);
	// const [longTerm, setLongTerm] = useState(false);
	const [securityDeposit, setSecurityDeposit] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPricingDetails({
			...pricingDetails,
			[name]: value,
		});
	};

	return (
		<div className='p-4 bg-white shadow rounded-lg'>
			<h2 className='text-lg text-teal-600 font-semibold mb-4'>
				Pricing Details
			</h2>
			<h4 className='text-base font-semibold leading-7 text-gray-900 '>
				Choose your payment lengths.
			</h4>
			<div className='mb-4 ml-5 mt-4'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='pricePerHour'
				>
					<div className='relative flex items-start'>
						<div className='flex h-6 items-center'>
							<input
								id='half'
								name='half'
								type='checkbox'
								aria-describedby='comments-description'
								onChange={(e) => setHourly(e.target.checked)}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
							/>
						</div>
						<div className='ml-3 text-sm leading-6'>
							<label htmlFor='comments' className='font-medium text-gray-900'>
								Per Hour?
							</label>{' '}
						</div>
					</div>
				</label>
				<div className='relative mt-2 rounded-md shadow-sm'>
					{hourly ? (
						<>
							<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
								<span className='text-gray-500 sm:text-sm'>$</span>
							</div>
							<input
								type='number'
								id='pricePerHour'
								name='pricePerHour'
								value={pricingDetails.pricePerHour}
								onChange={handleChange}
								className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								placeholder='0.00'
							/>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
								<span id='price-currency' className='text-gray-500 sm:text-sm'>
									USD
								</span>
							</div>
						</>
					) : (
						''
					)}
				</div>
			</div>

			<div className='mb-4 ml-5'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='pricePerHalfDay'
				>
					<div className='relative flex items-start'>
						<div className='flex h-6 items-center'>
							<input
								id='half'
								name='half'
								type='checkbox'
								aria-describedby='comments-description'
								onChange={(e) => setHalf(e.target.checked)}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
							/>
						</div>
						<div className='ml-3 text-sm leading-6'>
							<label htmlFor='comments' className='font-medium text-gray-900'>
								Half Day (4 hours)?
							</label>{' '}
						</div>
					</div>
				</label>
				{half ? (
					<input
						type='number'
						id='pricePerHalfDay'
						name='pricePerHalfDay'
						value={pricingDetails.pricePerHalfDay}
						onChange={handleChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
						placeholder='Price per Half Day'
					/>
				) : (
					''
				)}{' '}
			</div>
			<div className='mb-4 ml-5'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='pricePerDay'
				>
					<div className='relative flex items-start'>
						<div className='flex h-6 items-center'>
							<input
								id='day'
								name='day'
								type='checkbox'
								aria-describedby='comments-description'
								onChange={(e) => setDay(e.target.checked)}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
							/>
						</div>
						<div className='ml-3 text-sm leading-6'>
							<label htmlFor='comments' className='font-medium text-gray-900'>
								Price per Day (Usually 8 hours - 24 hours)?
							</label>{' '}
						</div>
					</div>
				</label>
				{day ? (
					<input
						type='number'
						id='pricePerDay'
						name='pricePerDay'
						value={pricingDetails.pricePerDay}
						onChange={handleChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
						placeholder='Price per Day'
					/>
				) : (
					''
				)}
			</div>
			<div className='mb-4 ml-5'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='pricePerWeek'
				>
					<div className='relative flex items-start'>
						<div className='flex h-6 items-center'>
							<input
								id='week'
								name='week'
								type='checkbox'
								aria-describedby='comments-description'
								onChange={(e) => setWeekly(e.target.checked)}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
							/>
						</div>
						<div className='ml-3 text-sm leading-6'>
							<label htmlFor='comments' className='font-medium text-gray-900'>
								Price per Week?
							</label>{' '}
						</div>
					</div>
				</label>
				{weekly ? (
					<input
						type='number'
						id='pricePerWeek'
						name='pricePerWeek'
						value={pricingDetails.pricePerWeek}
						onChange={handleChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
						placeholder='Price per Week'
					/>
				) : (
					''
				)}
			</div>
			<div className='mb-4 ml-5'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='pricePerMonth'
				>
					<div className='relative flex items-start'>
						<div className='flex h-6 items-center'>
							<input
								id='monthly'
								name='monthly'
								type='checkbox'
								aria-describedby='comments-description'
								onChange={(e) => setMonthly(e.target.checked)}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
							/>
						</div>
						<div className='ml-3 text-sm leading-6'>
							<label htmlFor='comments' className='font-medium text-gray-900'>
								Price per Month?
							</label>{' '}
						</div>
					</div>
				</label>
				{monthly ? (
					<input
						type='number'
						id='pricePerMonth'
						name='pricePerMonth'
						value={pricingDetails.pricePerMonth}
						onChange={handleChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
						placeholder='Price per Month'
					/>
				) : (
					''
				)}
			</div>

			<div className='border-b border-gray-900/10 py-12 '>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='securityDeposit'
				>
					<div className='relative flex items-start'>
						<div className='flex h-6 items-center'>
							<input
								id='security'
								name='security'
								type='checkbox'
								aria-describedby='comments-description'
								onChange={(e) => setSecurityDeposit(e.target.checked)}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
							/>
						</div>
						<div className='ml-3 text-sm leading-6'>
							<label htmlFor='comments' className='font-medium text-gray-900'>
								Security Deposit?
							</label>{' '}
						</div>
					</div>
				</label>
				{securityDeposit ? (
					<input
						type='number'
						id='securityDeposit'
						name='securityDeposit'
						value={pricingDetails.securityDeposit}
						onChange={handleChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
						placeholder='Security Deposit'
					/>
				) : (
					''
				)}
			</div>
			<div className='mb-4 pt-12'>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='lateFees'
				>
					Late Fees per Hour
				</label>
				<input
					type='number'
					id='lateFees'
					name='lateFees'
					value={pricingDetails.lateFees[0]?.perHour || ''}
					onChange={(e) =>
						setPricingDetails({
							...pricingDetails,
							lateFees: [{ perHour: e.target.value }],
						})
					}
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
					placeholder='Late Fees per Hour'
				/>
			</div>
			<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
				<div className='sm:col-span-3'>
					<label
						className='block text-sm font-medium text-gray-700'
						htmlFor='minDays'
					>
						Minimum Days
					</label>
					<input
						type='number'
						id='minDays'
						name='minDays'
						value={pricingDetails.minDays}
						onChange={handleChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
						placeholder='Minimum Days'
					/>
				</div>
				<div className='sm:col-span-3'>
					<label
						className='block text-sm font-medium text-gray-700'
						htmlFor='maxDays'
					>
						Maximum Days
					</label>
					<input
						type='number'
						id='maxDays'
						name='maxDays'
						value={pricingDetails.maxDays}
						onChange={handleChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
						placeholder='Maximum Days'
					/>
				</div>{' '}
			</div>
		</div>
	);
};

export default PricingDetailsForm;
