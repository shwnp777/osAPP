import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	// eslint-disable-next-line no-unused-vars
	getIdToken,
} from 'firebase/auth';
import {
	doc,
	setDoc,
	collection,
	query,
	where,
	getDocs,
	getDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

// Thunks for async actions
export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (
		{ email, password, username, business, termsOfService, privacyPolicy },
		{ rejectWithValue }
	) => {
		try {
			// Check if email is already taken
			const emailQuery = query(
				collection(db, 'users'),
				where('email', '==', email)
			);
			const emailQuerySnapshot = await getDocs(emailQuery);

			if (!emailQuerySnapshot.empty) {
				return rejectWithValue('Email is already taken.');
			}

			// Check if username is already taken
			const usernameQuery = query(
				collection(db, 'users'),
				where('username', '==', username)
			);
			const usernameQuerySnapshot = await getDocs(usernameQuery);

			if (!usernameQuerySnapshot.empty) {
				return rejectWithValue('Username is already taken.');
			}
			if (!termsOfService || !privacyPolicy) {
				return rejectWithValue('You must agree to all terms.');
			}

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			// Create a user profile or business profile with blank fields
			await setDoc(doc(db, 'users', user.uid), {
				business: business,
				firstName: '',
				lastName: '',
				displayName: username,
				email: user.email,
				birthday: '',
				address: {
					streetOne: '',
					streetTwo: '',
					city: '',
					state: '',
					zipcode: '',
				},
				favorites: [],
				following: [],
				followers: [],
				profilePicture: '',
				termsOfService: termsOfService,
				privacyPolicy: privacyPolicy,
			});

			await setDoc(doc(db, 'userChats', userCredential.user.uid), {});
		} catch (error) {
			console.error('Registration error:', error.message);
			return rejectWithValue(error.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			// Fetch additional user data from Firestore
			const userDoc = await getDoc(doc(db, 'users', user.uid));

			if (!userDoc.exists()) {
				throw new Error('User data not found in the database.');
			}

			const userData = userDoc.data();
			console.log(userData);

			// Get the ID token
			const token = await user.getIdToken();

			return {
				uid: user.uid,
				email: user.email,
				displayName: userData.displayName || '',
				profileData: userData, // Store additional data
				token: token, // Store the token if you need it for further requests
			};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	user: null,
	profileData: {},
	loading: false,
	error: null,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetState: () => {
			initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.token = action.payload.token;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, () => {
				return initialState; // Properly reset state after logout
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
