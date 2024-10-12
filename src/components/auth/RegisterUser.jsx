import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Field, Label, Switch } from '@headlessui/react';
import { registerUser } from '../../features/auth/authSlice';
import Short from '../../assets/images/short.svg';
import { checkPasswordStrength } from '../../functions/password';
import { showNotification } from '../../features/notification/notificationSlice';

const RegisterUser = () => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [business, setBusiness] = useState(false);
	const [error, setError] = useState(null);
	const [passwordStrength, setPasswordStrength] = useState('');
	const [terms, setTerms] = useState(false);
	const [privacy, setPrivacy] = useState(false);
	console.log(terms, privacy);

	const dispatch = useDispatch();
	const authError = useSelector((state) => state.auth.error);
	const navigate = useNavigate();

	const handleSuccess = () => {
		dispatch(
			showNotification({
				message: 'Successfully Registered!',
				description: 'Please login to start your journey.',
			})
		);
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			if (password !== verifyPassword) {
				setError('Passwords do not match');
				return;
			}
			const strengthMessage = checkPasswordStrength(password);
			if (strengthMessage) {
				setError(strengthMessage);
				return;
			}
			setError(null);
			const resultAction = await dispatch(
				registerUser({
					business: business,
					email: email,
					username: userName,
					password: password,
					termsOfService: terms,
					privacyPolicy: privacy,
				})
			);

			if (registerUser.fulfilled.match(resultAction)) {
				// If registration is successful, redirect to the dashboard
				handleSuccess();
				navigate('/auth/login');
			} else {
				setError('Registration failed. Please try again.');
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<img alt='Your Company' src={Short} className='mx-auto h-10 w-auto' />
			</div>

			<div className='sm:mx-auto sm:w-full sm:max-w-[480px]'>
				<div className='bg-white px-6 py-6 shadow-lg sm:rounded-lg sm:px-12'>
					<h2 className='mt-6 text-center text-2xl leading-9 tracking-tight text-gray-700'>
						Register
					</h2>
					<form onSubmit={handleRegister} className='space-y-6 mt-6'>
						<Field className='flex items-center'>
							<Switch
								checked={business}
								onChange={setBusiness}
								className='group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 data-[checked]:bg-teal-600'
							>
								<span
									aria-hidden='true'
									className='pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5'
								/>
							</Switch>
							<Label as='span' className='ml-3 text-sm'>
								<span className='font-medium text-gray-900'>
									{business ? 'Business Account' : 'Is this a business?'}
								</span>{' '}
							</Label>
						</Field>
						<div>
							<label
								htmlFor='username'
								className='block text-sm font-medium leading-6 text-gray-900 tester'
							>
								{business ? 'Business Name' : 'Username'}
							</label>
							<div className='mt-2'>
								<input
									id='username'
									name='username'
									type='text'
									required
									autoComplete='username'
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>
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
										const message = checkPasswordStrength(e.target.value);
										setPasswordStrength(message);
									}}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6'
								/>
							</div>
							<p className='mt-3 text-sm leading-6 text-red-500'>
								{passwordStrength}
							</p>
						</div>

						<div>
							<label
								htmlFor='verify-password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Verify Password
							</label>
							<div className='mt-2'>
								<input
									id='verify-password'
									name='verify-password'
									type='password'
									required
									value={verifyPassword}
									onChange={(e) => setVerifyPassword(e.target.value)}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						{error && <div className='text-red-500 text-sm'>{error}</div>}
						{authError && (
							<div className='text-red-500 text-sm'>{authError}</div>
						)}

						<fieldset>
							<div className='mt-2 space-y-6'>
								<div className='relative flex gap-x-3'>
									<div className='flex h-6 items-center'>
										<input
											id='comments'
											name='comments'
											type='checkbox'
											onChange={(e) => setTerms(e.target.checked)}
											className='h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600'
										/>
									</div>
									<div className='text-sm leading-6'>
										<label
											htmlFor='comments'
											className='font-medium text-gray-900'
										>
											Terms of Service
										</label>
										<p className='text-gray-500'>
											Do you agree to abide by the Terms of Service?
										</p>
									</div>
								</div>
								<div className='relative flex gap-x-3'>
									<div className='flex h-6 items-center'>
										<input
											id='candidates'
											name='candidates'
											type='checkbox'
											onChange={(e) => setPrivacy(e.target.checked)}
											className='h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600'
										/>
									</div>
									<div className='text-sm leading-6'>
										<label
											htmlFor='candidates'
											className='font-medium text-gray-900'
										>
											Privacy Agreement
										</label>
										<p className='text-gray-500'>
											Have you read and agree to the Privacy Policy?
										</p>
									</div>
								</div>
							</div>
						</fieldset>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterUser;
