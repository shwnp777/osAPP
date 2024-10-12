import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, UserGroupIcon } from '@heroicons/react/20/solid';

import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
	return (
		<Popover className='relative'>
			<Popover.Button className='inline-flex items-center gap-x-1 bg-orange-500 rounded-md px-1 py-2 text-xs font-semibold leading-6 text-white'>
				<UserGroupIcon className='h-5 w-5' /> Chats{' '}
				<ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
			</Popover.Button>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-200'
				enterFrom='opacity-0 translate-y-1'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease-in duration-150'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-1'
			>
				<Popover.Panel
					style={{ marginLeft: '-30px' }}
					className='absolute z-10 mt-5 flex w-screen max-w-max px-4'
				>
					<div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
						<div className='p-4'>
							<Search />
							<Chats />
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

export default Sidebar;
