import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { uploadPhotosToFirebase } from '../../utils/firebaseUtils';

const initialState = {
	basicItemInfo: {
		userId: '',
		title: '',
		description: '',
		category: null,
		subCategory: null,
		location: '',
		images: [], // Temporarily store photos
		photoPackage: false,
		sponsoredProduct: false,
	},
	pricingDetails: {
		pricePerHalfDay: 0,
		pricePerDay: 0,
		pricePerWeek: 0,
		pricePerMonth: 0,
		securityDeposit: 0,
		lateFees: [{ perHour: 0 }],
		longTerm: false,
	},
	locationAndDelivery: {
		location: '',
		deliveryOptions: { available: false, feePerMile: 0 },
		pickupInstructions: '',
		returnInstructions: '',
	},
	specialtyForms: {
		automobiles: {},
		camperInfo: {},
		campsiteInfo: {},
		vacation: {},
	},
	maxPhotos: false,
	currentStep: 0,
	status: 'idle',
	error: null,
};

const postRentalToFirebase = async (rentalData) => {
	try {
		// Specify the collection where you want to store rentals
		const rentalsCollection = collection(db, 'rentals');

		// Add a new document with the rental data
		const docRef = await addDoc(rentalsCollection, {
			...rentalData,
			createdAt: new Date(), // Optionally add a timestamp
		});

		// Return the document reference or some other success indicator
		return docRef.id; // Returns the ID of the newly created document
	} catch (error) {
		console.error('Error adding document: ', error);
		throw new Error('Failed to post rental to Firebase');
	}
};

// Async thunk to handle photo uploads and rental submission to Firestore
export const submitRental = createAsyncThunk(
	'newRental/submitRental',
	async (_, { getState, rejectWithValue }) => {
		const state = getState().newRental;

		// Filter out empty specialty forms
		const specialtyForms = {};
		if (Object.keys(state.specialtyForms.automobiles).length > 0) {
			specialtyForms.automobiles = state.specialtyForms.automobiles;
		}
		if (Object.keys(state.specialtyForms.camperInfo).length > 0) {
			specialtyForms.camperInfo = state.specialtyForms.camperInfo;
		}
		if (Object.keys(state.specialtyForms.campsiteInfo).length > 0) {
			specialtyForms.campsiteInfo = state.specialtyForms.campsiteInfo;
		}
		if (Object.keys(state.specialtyForms.vacation).length > 0) {
			specialtyForms.vacation = state.specialtyForms.vacation;
		}

		try {
			// Upload photos to Firebase Storage and get URLs
			const photoUrls = await uploadPhotosToFirebase(
				state.basicItemInfo.images
			);

			const rentalData = {
				...state.basicItemInfo,
				images: photoUrls, // Replace local images with URLs
				...state.pricingDetails,
				...state.locationAndDelivery,
				...specialtyForms,
			};

			await postRentalToFirebase(rentalData);
			return rentalData;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const newRentalSlice = createSlice({
	name: 'newRental',
	initialState,
	reducers: {
		setBasicInfo(state, action) {
			state.basicItemInfo = { ...state.basicItemInfo, ...action.payload };
		},
		setOpen(state) {
			state.maxPhotos = false;
		},
		addPhoto(state, action) {
			const maxPhotos = state.basicItemInfo.photoPackage ? 25 : 5;
			if (state.basicItemInfo.images.length < maxPhotos) {
				state.basicItemInfo.images.push(action.payload);
			} else {
				// Optionally, handle error for exceeding the limit
				state.maxPhotos = true;
			}
		},
		removePhoto(state, action) {
			state.basicItemInfo.images = state.basicItemInfo.images.filter(
				(photo, index) => index !== action.payload
			);
		},
		setPricingDetails(state, action) {
			state.pricingDetails = { ...state.pricingDetails, ...action.payload };
		},
		setLocationAndDelivery(state, action) {
			state.locationAndDelivery = {
				...state.locationAndDelivery,
				...action.payload,
			};
		},
		setCurrentStep(state, action) {
			state.currentStep = action.payload;
		},
		setAutomobileInfo(state, action) {
			state.specialtyForms.automobiles = action.payload;
		},
		setCamperInfo(state, action) {
			state.specialtyForms.camperInfo = action.payload;
		},
		setCampsiteInfo(state, action) {
			state.specialtyForms.campsiteInfo = action.payload;
		},
		setVacationInfo(state, action) {
			state.specialtyForms.vacation = action.payload;
		},
		resetForm(state) {
			state.basicItemInfo = initialState.basicItemInfo;
			state.pricingDetails = initialState.pricingDetails;
			state.locationAndDelivery = initialState.locationAndDelivery;
			state.specialtyForms = initialState.specialtyForms;
			state.currentStep = 0;
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(submitRental.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(submitRental.fulfilled, (state) => {
				state.status = 'succeeded';
				state.error = null;
			})
			.addCase(submitRental.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const {
	setBasicInfo,
	addPhoto,
	setOpen,
	removePhoto,
	setPricingDetails,
	setLocationAndDelivery,
	setCurrentStep,
	resetForm,
} = newRentalSlice.actions;

export default newRentalSlice.reducer;
