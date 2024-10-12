import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Ensure this path is correct

// Async thunk to fetch categories and their subcategories
export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		const categoriesRef = collection(db, 'categories');
		const categoriesSnapshot = await getDocs(categoriesRef);

		const categoriesList = await Promise.all(
			categoriesSnapshot.docs.map(async (categoryDoc) => {
				const categoryData = categoryDoc.data();
				const categoryId = categoryDoc.id;

				// Fetch subcategories for each category
				const subcategoriesRef = collection(
					db,
					`categories/${categoryId}/subcategories`
				);
				const subcategoriesSnapshot = await getDocs(subcategoriesRef);

				const subcategories = subcategoriesSnapshot.docs.map((subDoc) => ({
					id: subDoc.id,
					title: subDoc.data().title,
				}));

				return {
					id: categoryId,
					title: categoryData.title,
					subcategories,
				};
			})
		);

		return categoriesList;
	}
);

// Create categorySlice
const categorySlice = createSlice({
	name: 'categories',
	initialState: {
		categories: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.categories = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default categorySlice.reducer;
