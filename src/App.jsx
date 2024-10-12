import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './features/products/categories';
import Home from './pages/Home';
import About from './pages/About';
import Messaging from './components/messaging/Messaging';
import LoginUser from './components/auth/LoginUser';
import MainLayout from './components/layout/MainLayout';
import Register from './pages/auth/Register';
import DashboardPage from './pages/user/DashboardPage';
import AppMessage from './components/elements/AppMessage';
import RentalFormPage from './pages/products/RentalFormPage';
import SendCategoriesToFirestore from './components/SendCategoriesToFirestore';
import SingleRentalPage from './pages/products/SingleRentalPage';
import CategoryGrid from './pages/products/CategoryGrid';
import RentalSchedule from './pages/products/RentalSchedule';
import EditRental from './pages/products/EditRental';
import UserLayout from './components/layout/UserLayout';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<Router>
			<AppMessage />
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='register' element={<Register />} />
					<Route path='login' element={<LoginUser />} />
					<Route path='messages' element={<Messaging />} />
					<Route path='category' element={<SendCategoriesToFirestore />} />
				</Route>
				<Route path='/user' element={<UserLayout />}>
					<Route path='dashboard' element={<DashboardPage />} />
					<Route path='register' element={<Register />} />
					<Route path='login' element={<LoginUser />} />
					<Route path='messages' element={<Messaging />} />
				</Route>
				<Route path='rentals' element={<UserLayout />}>
					<Route path='create' element={<RentalFormPage />} />
					<Route path='edit/:productID' element={<EditRental />} />
					<Route path='schedule/:productID' element={<RentalSchedule />} />
					<Route path='view/:category' element={<CategoryGrid />} />
					<Route
						path='view/:category/:productID'
						element={<SingleRentalPage />}
					/>
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
