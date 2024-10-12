import { useContext } from 'react';
import Messages from './Messages.jsx';
import Input from './Input.jsx';
import { ChatContext } from '../../context/ChatContext.jsx';
import Sidebar from './Sidebar.jsx';

const Chat = () => {
	const { data } = useContext(ChatContext);

	return (
		<div className='chat'>
			<div className='chatInfo'>
				<div className='chatIcons'>
					<Sidebar />
				</div>
				<span>{data.user?.displayName}</span>
			</div>
			<Messages />
			<Input />
		</div>
	);
};

export default Chat;
