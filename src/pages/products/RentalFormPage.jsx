import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainRentalForm from '../../components/products/createRentalForm/MainRentalForm';
import BasicItemInfoForm from '../../components/products/createRentalForm/BasicItemInfoForm';
import PricingDetailsForm from '../../components/products/createRentalForm/PricingDetailsForm';
import LocationAndDeliveryForm from '../../components/products/createRentalForm/LocationAndDeliveryForm';
import PhotoUploadForm from '../../components/products/createRentalForm/PhotoUploadForm';
import SpecialtyForm from '../../components/products/createRentalForm/SpecialtyForm';
import { fetchCategories } from '../../features/products/categories';
import {
	setBasicInfo,
	setPricingDetails,
	setLocationAndDelivery,
	setCurrentStep,
} from '../../features/products/newRentalSlice';
import './CreateRental.scss';
import PhotoMessage from '../../components/elements/PhotoMessage';

const steps = [
	{ name: 'Basic Info', status: 'complete' },
	{ name: 'Specialty Form', status: 'current' },
	{ name: 'Photos', status: 'upcoming' },
	{ name: 'Pricing Details', status: 'upcoming' },
	{ name: 'Location & Delivery', status: 'upcoming' },
];

const RentalFormPage = () => {
	const [localFiles, setLocalFiles] = useState([]); // Store File objects locally

	// Redux Calls
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories.categories);
	const { basicItemInfo, currentStep, locationAndDelivery, pricingDetails } =
		useSelector((state) => state.newRental);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			dispatch(setCurrentStep(currentStep + 1));
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			dispatch(setCurrentStep(currentStep - 1));
		}
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 0:
				return (
					<BasicItemInfoForm
						basicItemInfo={basicItemInfo}
						setBasicItemInfo={setBasicInfo}
						categories={categories}
					/>
				);
			case 1:
				return <SpecialtyForm />;
			case 2:
				return (
					<PhotoUploadForm
						basicItemInfo={basicItemInfo}
						setBasicInfo={setBasicInfo}
						localFiles={localFiles}
						setLocalFiles={setLocalFiles}
					/>
				);
			case 3:
				return (
					<PricingDetailsForm
						pricingDetails={pricingDetails}
						setPricingDetails={setPricingDetails}
					/>
				);
			case 4:
				return (
					<LocationAndDeliveryForm
						locationAndDelivery={locationAndDelivery}
						setLocationAndDelivery={setLocationAndDelivery}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className='rental-form-page'>
			<MainRentalForm
				steps={steps}
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
				renderStepContent={renderStepContent}
				handlePrevious={handlePrevious}
				handleNext={handleNext}
			/>

			<PhotoMessage />
		</div>
	);
};

export default RentalFormPage;
