import { Button } from '@/components/ui/button';
import { ChatInput } from '@/components/ui/chat/chat-input';
import useChatStore from '@/stores/chatStore';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

const ChatInputCustom = () => {
	const [isGettingMessages, isSendingMessage, sendMessage] = useChatStore(
		useShallow((state) => [
			state.isGettingMessages,
			state.isSendingMessage,
			state.sendMessage,
		])
	);
	const [message, setMessage] = useState('');

	const handleClickSendMessage = async () => {
		if (!message.trim()) return;

		const result = await sendMessage('683e81d225efd3f98007781c', message);

		if (result.success) {
			setMessage('');
		} else {
			toast.error(result.message);
		}
	};

	const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleClickSendMessage();
		}
	};

	return (
		<>
			<ChatInput
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyUp={handleKeyUp}
			/>
			<Button
				type='submit'
				size='icon'
				disabled={isSendingMessage || isGettingMessages}
				onClick={handleClickSendMessage}
			>
				<Send className='size-4' />
			</Button>
		</>
	);
};

export default ChatInputCustom;
