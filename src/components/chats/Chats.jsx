import { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { ChatContext } from '../../context/ChatContext';
import { useSelector } from 'react-redux';

const Chats = () => {
	const [chats, setChats] = useState([]);

	const currentUser = useSelector((state) => state.user.user);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
				setChats(doc.data());
			});

			return () => {
				unsub();
			};
		};

		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const handleSelect = (u) => {
		dispatch({ type: 'CHANGE_USER', payload: u });
	};

	return (
		<div>
			{Object.entries(chats)
				?.sort((a, b) => b[1].date - a[1].date)
				.map((chat) => (
					<div
						key={chat[0]}
						onClick={() => handleSelect(chat[1].userInfo)}
						className='group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50'
					>
						<div className='mt-1 flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-lg bg-gray-50 group-hover:bg-white'>
							<img src={chat[1].userInfo.photoURL} alt='User for LetMeWork' />
						</div>
						<div>
							<p className='text-sky-500 font-bold'>
								{chat[1].userInfo.displayName}
							</p>
							<p className='mt-1 text-gray-600'>{chat[1].lastMessage?.text}</p>
						</div>
					</div>
				))}
		</div>
	);
};

export default Chats;
