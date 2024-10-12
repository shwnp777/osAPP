// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import authReducer from './auth/authSlice';
import notificationReducer from './notification/notificationSlice';
import categoryReducer from './products/categories';
import newRentalReducer from './products/newRentalSlice';

const reducers = combineReducers({
	auth: authReducer,
	notification: notificationReducer,
	categories: categoryReducer,
	newRental: newRentalReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	whiteList: [authReducer, categoryReducer],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
					'newRental/addPhoto',
				],
				// Ignore these paths in the state
				ignoredPaths: ['newRental.basicItemInfo.images'],
			},
		}),
});

export const persistor = persistStore(store);
