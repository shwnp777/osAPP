import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserNav from './UserNav';

const UserLayout = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [navigate, user]);

	return (
		<>
			<div className='min-h-full'>
				<div className='pb-32'>
					<UserNav user={user} />
					<header className='py-10'>
						<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
							<h1 className='text-3xl font-bold tracking-tight text-teal-500'>
								Dashboard
							</h1>
						</div>
					</header>
				</div>

				<main className='-mt-32'>
					<div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
						<div className='rounded-lg bg-white px-5 py-6 shadow sm:px-6'>
							<Outlet />
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default UserLayout;
