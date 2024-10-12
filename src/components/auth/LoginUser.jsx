import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Short from '../../assets/images/short.svg';
import { loginUser } from '../../features/auth/authSlice';
import { showNotification } from '../../features/notification/notificationSlice'; // Import showNotification
import Spinner from '../elements/Spinner';

const LoginUser = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.auth);

	const handleLogin = async (e) => {
		e.preventDefault();
		const resultAction = await dispatch(loginUser({ email, password }));

		if (loginUser.fulfilled.match(resultAction)) {
			// If login is successful, show a success notification and redirect to dashboard
			dispatch(
				showNotification({
					message: 'Login Successful',
					description: 'Welcome back!',
				})
			);
			navigate('/user/dashboard');
		} else {
			// If login failed, show an error message (already handled by your error state)
			console.error(
				'Login failed:',
				resultAction.payload || resultAction.error.message
			);
		}
	};
	return (
		<div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<img alt='Your Company' src={Short} className='mx-auto h-10 w-auto' />
			</div>

			{loading ? (
				<Spinner />
			) : (
				<div className='sm:mx-auto sm:w-full sm:max-w-[480px]'>
					<div className='bg-white px-6 py-6 shadow-lg sm:rounded-lg sm:px-12'>
						<h2 className='mt-6 text-center text-2xl leading-9 tracking-tight text-gray-700'>
							Login
						</h2>
						<form onSubmit={handleLogin} className='space-y-6 mt-6'>
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Email address
								</label>
								<div className='mt-2'>
									<input
										id='email'
										name='email'
										type='email'
										required
										autoComplete='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='password'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Password
								</label>
								<div className='mt-2'>
									<input
										id='password'
										name='password'
										type='password'
										required
										autoComplete='new-password'
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							{error && <div className='text-red-500 text-sm'>{error}</div>}
							<p className='text-teal-700 mb-4 text-sm'>Trouble signing in?</p>

							<div className='mt-7'>
								<button
									type='submit'
									className='flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
								>
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default LoginUser;
