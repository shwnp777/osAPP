import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Redux
import { store, persistor } from './features/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.jsx';
import './index.css';
import { ChatContextProvider } from './context/ChatContext.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ChatContextProvider>
					<App />
				</ChatContextProvider>
			</PersistGate>
		</Provider>
	</StrictMode>
);
