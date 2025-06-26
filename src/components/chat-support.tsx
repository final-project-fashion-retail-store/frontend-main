'use client';

import { LoaderCircle } from 'lucide-react';
import {
	ChatBubble,
	ChatBubbleAvatar,
	ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import {
	ExpandableChat,
	ExpandableChatHeader,
	ExpandableChatBody,
	ExpandableChatFooter,
} from '@/components/ui/chat/expandable-chat';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import useChatStore from '@/stores/chatStore';
import { useShallow } from 'zustand/shallow';
import useAuthStore from '@/stores/authStore';
import { useEffect } from 'react';
import ChatInputCustom from '@/components/chat/ChatInputCustom';

export default function ChatSupport() {
	const [
		isGettingMessages,
		messages,
		getMessages,
		subscribeToMessages,
		unsubscribeToMessages,
	] = useChatStore(
		useShallow((state) => [
			state.isGettingMessages,
			state.messages,
			state.getMessages,
			state.subscribeToMessages,
			state.unsubscribeToMessages,
		])
	);

	const authUser = useAuthStore((state) => state.authUser);

	useEffect(() => {
		if (!authUser) return;

		getMessages('683e81d225efd3f98007781c');
		subscribeToMessages();
		return () => {
			unsubscribeToMessages();
		};
	}, [authUser, getMessages, subscribeToMessages, unsubscribeToMessages]);

	if (!authUser) {
		return null;
	}

	return (
		<ExpandableChat
			size='lg'
			position='bottom-right'
		>
			<ExpandableChatHeader className='flex-col text-center justify-center'>
				<h1 className='text-xl font-semibold'>Chat with us</h1>
				<p>Ask any question for us to answer</p>
			</ExpandableChatHeader>
			<ExpandableChatBody>
				{isGettingMessages ? (
					<div className='size-full flex items-center justify-center'>
						<LoaderCircle className='size-6 animate-spin text-muted-foreground' />
					</div>
				) : (
					<ChatMessageList>
						{messages?.map((message) => (
							<ChatBubble
								key={message._id}
								variant={message.sender === authUser?._id ? 'sent' : 'received'}
							>
								<ChatBubbleAvatar
									src={
										message.sender === authUser?._id ? authUser.avatar.url : undefined
									}
									fallback={message.sender !== authUser?._id ? 'SP' : undefined}
								/>
								<ChatBubbleMessage>{message.text}</ChatBubbleMessage>
							</ChatBubble>
						))}
					</ChatMessageList>
				)}
			</ExpandableChatBody>
			<ExpandableChatFooter className='flex items-center space-x-2'>
				<ChatInputCustom />
			</ExpandableChatFooter>
		</ExpandableChat>
	);
}
