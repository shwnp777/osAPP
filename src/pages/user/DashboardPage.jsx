import { useSelector } from 'react-redux';

const DashboardPage = () => {
	const user = useSelector((state) => state.auth.user);
	const profileData = useSelector((state) => state.auth.profileData);
	console.log('User: ', user);
	console.log('Profile: ', profileData);

	return (
		<div>
			<h1>Welcome, {user.displayName}</h1>
			<p>Email: {user.email}</p>
			<p>Username: {profileData.displayName}</p>
			<p>
				Items Rented:{' '}
				{profileData.itemsRentedHistory &&
					profileData.itemsRentedHistory.length}
			</p>
			{/* Display more user-specific data here */}
		</div>
	);
};

export default DashboardPage;
