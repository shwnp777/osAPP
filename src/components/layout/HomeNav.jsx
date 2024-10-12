import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../../assets/images/logo.svg';
import Short from '../../assets/images/short.svg';

const navigation = [
	{ name: 'Product', href: '#' },
	{ name: 'Features', href: '#' },
	{ name: 'Marketplace', href: '#' },
	{ name: 'Company', href: '#' },
];

const HomeNav = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className='bg-white'>
			<nav
				aria-label='Global'
				className='mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8'
			>
				<div className='flex lg:flex-1'>
					<Link to='/' className='-m-1.5 p-1.5'>
						<span className='sr-only'>Your Company</span>
						<img alt='' src={Logo} className='h-8 w-auto' />
					</Link>
				</div>
				<div className='hidden lg:flex lg:gap-x-12'>
					{navigation.map((item) => (
						<Link
							key={item.name}
							to={item.href}
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							{item.name}
						</Link>
					))}
				</div>
				<div className='flex flex-1 items-center justify-end gap-x-6'>
					<Link
						to='/login'
						className='hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900'
					>
						Log in
					</Link>
					<Link
						to='/register'
						className='rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
					>
						Sign up
					</Link>
				</div>
				<div className='flex lg:hidden'>
					<button
						type='button'
						onClick={() => setMobileMenuOpen(true)}
						className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
					>
						<span className='sr-only'>Open main menu</span>
						<Bars3Icon aria-hidden='true' className='h-6 w-6' />
					</button>
				</div>
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className='lg:hidden'
			>
				<div className='fixed inset-0 z-10' />
				<DialogPanel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
					<div className='flex items-center gap-x-6'>
						<Link to='/' className='-m-1.5 p-1.5'>
							<span className='sr-only'>Ourstuff</span>
							<img alt='Ourstuff Rentals' src={Short} className='h-8 w-auto' />
						</Link>
						<Link
							to='/register'
							className='ml-auto rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
						>
							Sign up
						</Link>
						<button
							type='button'
							onClick={() => setMobileMenuOpen(false)}
							className='-m-2.5 rounded-md p-2.5 text-gray-700'
						>
							<span className='sr-only'>Close menu</span>
							<XMarkIcon aria-hidden='true' className='h-6 w-6' />
						</button>
					</div>
					<div className='mt-6 flow-root'>
						<div className='-my-6 divide-y divide-gray-500/10'>
							<div className='space-y-2 py-6'>
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
									>
										{item.name}
									</Link>
								))}
							</div>
							<div className='py-6'>
								<Link
									to='/login'
									className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
								>
									Log in
								</Link>
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
};

export default HomeNav;
