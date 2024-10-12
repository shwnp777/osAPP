import { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomeNav from './HomeNav';

const MainLayout = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user) {
			navigate('/user/dashboard');
		}
	}, [navigate, user]);

	return (
		<Fragment>
			<HomeNav />
			<Outlet />
		</Fragment>
	);
};

export default MainLayout;
