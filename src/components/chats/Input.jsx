import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { CameraIcon, PaperClipIcon } from '@heroicons/react/20/solid';
import { db, storage } from '../../../firebase-config';
import { ChatContext } from '../../context/ChatContext';
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { showMessage } from '../../features/messageSlice';

const Input = () => {
	const [text, setText] = useState('');
	const [img, setImg] = useState(null);

	const currentUser = useSelector((state) => state.user.user);
	const { data } = useContext(ChatContext);

	const handleSend = async (e) => {
		e.preventDefault();
		try {
			if (img) {
				const storageRef = ref(storage, uuid());
				const uploadTask = uploadBytesResumable(storageRef, img);

				uploadTask.on(
					'state_changed',
					(error) => {
						showMessage({
							type: 'error',
							title: 'Error with the Upload',
							message: `Error uploading image: ${error.message}`,
						});
					},
					async () => {
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
						await sendMessage(downloadURL);
					}
				);
			} else {
				await sendMessage();
			}
		} catch (error) {
			showMessage({
				type: 'error',
				title: 'Error Sending Messsge',
				message: `Error! ${error.message}`,
			});
		}
	};

	const sendMessage = async (imageURL = null) => {
		const messageData = {
			id: uuid(),
			text,
			senderId: currentUser.uid,
			date: Timestamp.now(),
			...(imageURL && { img: imageURL }),
		};

		await updateDoc(doc(db, 'chats', data.chatId), {
			messages: arrayUnion(messageData),
		});

		// Update 'userChats' for both users
		const userChatUpdates = {
			[`${data.chatId}.lastMessage`]: { text },
			[`${data.chatId}.date`]: serverTimestamp(),
		};
		await updateDoc(doc(db, 'userChats', currentUser.uid), userChatUpdates);
		await updateDoc(doc(db, 'userChats', data.user.uid), userChatUpdates);

		setText('');
		setImg(null);
	};

	return (
		<>
			{/* New comment form */}

			<div className='mt-6 flex gap-x-3'>
				<img
					src={currentUser?.photoURL}
					alt=''
					className='h-6 w-6 flex-none rounded-full bg-gray-50'
				/>
				<form onSubmit={handleSend} className='relative flex-auto'>
					<div className='overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
						<label htmlFor='comment' className='sr-only'>
							Add your comment
						</label>
						<textarea
							rows={2}
							name='comment'
							id='comment'
							onChange={(e) => setText(e.target.value)}
							value={text}
							className='block w-full resize-none border-0 bg-transparent py-1.5 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
							placeholder='Add your comment...'
						/>
					</div>

					<div className='absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
						<div className='flex items-center space-x-5'>
							<div className='flex items-center'>
								<button
									type='button'
									className='-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'
								>
									<PaperClipIcon className='h-5 w-5' aria-hidden='true' />
									<span className='sr-only'>Attach a file</span>
								</button>
							</div>
							<div className='flex items-center'>
								<div className='relative'>
									<span className='flex items-center justify-center'>
										<label htmlFor='file'>
											<CameraIcon
												className='h-5 w-5 flex-shrink-0'
												aria-hidden='true'
											/>
											<span className='sr-only'>Add Photo</span>
										</label>
										<input
											type='file'
											style={{ display: 'none' }}
											id='file'
											onChange={(e) => setImg(e.target.files[0])}
										/>
									</span>
								</div>
							</div>
						</div>
						<button
							type='submit'
							className='rounded-md bg-sky-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700'
						>
							Comment
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Input;
