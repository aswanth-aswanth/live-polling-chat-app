import { useState, useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatBox = ({
  pollId,
  isChatOpen,
  setIsChatOpen,
  messages,
  setMessages,
  socket,
  userId,
}) => {
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on('chat_message', (message) => {
        if (message) {
          setMessages((prevMessages) => [...prevMessages, { ...message }]);
        }
      });

      socket.on('user_typing', (typingUser) => {
        handleTypingIndicator(true, typingUser);
      });

      socket.on('user_stopped_typing', (typingUser) => {
        handleTypingIndicator(false, typingUser);
      });

      socket.on('message_deleted', (messageId) => {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        );
      });

      return () => {
        socket.off('chat_message');
        socket.off('user_typing');
        socket.off('user_stopped_typing');
        socket.off('message_deleted');
      };
    }
  }, [socket, setMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleTypingIndicator = (typingStatus, typingUser) => {
    setTypingUsers((prevUsers) => {
      if (typingStatus && !prevUsers.includes(typingUser)) {
        return [...prevUsers, typingUser];
      } else if (!typingStatus) {
        return prevUsers.filter((user) => user !== typingUser);
      }
      return prevUsers;
    });
  };

  const handleDeleteMessage = (messageId) => {
    if (userId) {
      socket.emit('delete_message', { pollId, messageId });
    }
  };

  return (
    <div className="border">
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="w-full p-4 bg-gray-100 hover:bg-gray-200 transition duration-300 flex items-center justify-center"
      >
        <MessageSquare size={20} className="mr-2" />
        {isChatOpen ? 'Hide Chat' : 'Show Chat'}
      </button>
      {isChatOpen && (
        <div className="p-4 min-h-[80vh] relative scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <div
            className="overflow-y-auto max-h-[70vh] py-[60px]"
            ref={messagesEndRef}
          >
            {typingUsers.length > 0 && (
              <div className="mb-2 text-gray-500 absolute top-0 w-full overflow-hidden whitespace-nowrap flex items-center gap-2">
                <span className="inline-block overflow-hidden text-ellipsis max-w-[110px]">
                  {typingUsers.join(', ')}{' '}
                </span>
                {typingUsers.length > 1 ? 'are' : 'is'} typing...
              </div>
            )}
            {messages?.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                userId={userId}
                onDelete={handleDeleteMessage}
              />
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <ChatInput pollId={pollId} socket={socket} userId={userId} />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
