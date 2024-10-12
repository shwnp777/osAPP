import { createContext, useReducer } from 'react';
import { auth } from '../firebaseConfig';

export const ChatContext = createContext();

// eslint-disable-next-line react/prop-types
export const ChatContextProvider = ({ children }) => {
	const currentUser = auth.currentUser;
	console.log('From Context: ', currentUser);
	const INITIAL_STATE = {
		chatId: 'null',
		user: {},
	};

	const chatReducer = (state, action) => {
		switch (action.type) {
			case 'CHANGE_USER':
				return {
					user: action.payload,
					chatId:
						currentUser.uid > action.payload.uid
							? currentUser.uid + action.payload.uid
							: action.payload.uid + currentUser.uid,
				};

			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

	return (
		<ChatContext.Provider value={{ data: state, dispatch }}>
			{children}
		</ChatContext.Provider>
	);
};
