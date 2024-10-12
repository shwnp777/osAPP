// features/notification/notificationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		show: false,
		message: '',
		description: '',
	},
	reducers: {
		showNotification: (state, action) => {
			state.show = true;
			state.message = action.payload.message;
			state.description = action.payload.description || '';
		},
		hideNotification: (state) => {
			state.show = false;
			state.message = '';
			state.description = '';
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
