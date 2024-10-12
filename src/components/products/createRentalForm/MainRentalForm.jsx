/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const MainRentalForm = ({
	steps,
	currentStep,
	setCurrentStep,
	renderStepContent,
	handlePrevious,
	handleNext,
}) => {
	const dispatch = useDispatch();
	return (
		<div className='space-y-8 rental-form px-3'>
			{/* Step Navigation */}
			<nav aria-label='Progress' className='flex items-center justify-center'>
				<p className='text-sm font-medium'>
					Step {currentStep + 1} of {steps.length}
				</p>
				<ol className='ml-8 flex items-center space-x-5'>
					{steps.map((step, index) => (
						<li key={step.name}>
							<Link
								to='#'
								onClick={() => dispatch(setCurrentStep(index))}
								className={`block h-2.5 w-2.5 rounded-full ${
									index <= currentStep ? 'bg-teal-600' : 'bg-gray-200'
								} hover:${
									index <= currentStep ? 'bg-teal-900' : 'bg-gray-400'
								}`}
							>
								<span className='sr-only'>{step.name}</span>
							</Link>
						</li>
					))}
				</ol>
			</nav>

			{/* Step Content */}
			<div>{renderStepContent()}</div>

			{/* Navigation Buttons */}
			<div className='flex justify-between'>
				<button
					onClick={handlePrevious}
					disabled={currentStep === 0}
					className={`py-2 px-4 ${
						currentStep === 0
							? 'bg-gray-300 cursor-not-allowed'
							: 'bg-teal-500 hover:bg-teal-400'
					} text-white rounded-md shadow-sm`}
				>
					Previous
				</button>
				{currentStep < steps.length - 1 ? (
					<button
						onClick={handleNext}
						className='py-2 px-4 bg-teal-500 hover:bg-teal-400 text-white rounded-md shadow-sm'
					>
						Next
					</button>
				) : (
					<button
						type='submit'
						className='py-2 px-4 bg-teal-600 hover:bg-teal-500 text-white rounded-md shadow-sm'
					>
						Submit
					</button>
				)}
			</div>
		</div>
	);
};

export default MainRentalForm;
