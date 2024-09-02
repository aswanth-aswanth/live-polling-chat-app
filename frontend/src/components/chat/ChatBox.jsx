import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatBox = ({
  messages,
  newMessage,
  handleTyping,
  handleSendMessage,
  isTyping,
  currentUser,
}) => {
  const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(scrollToBottom, [messages]);

  return (
    <div className="p-4 bg-gray-50 h-[500px] md:h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Chat</h3>
      </div>
      <div className="flex-1 overflow-y-auto mb-4 bg-white p-4 rounded-lg shadow-inner">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isCurrentUser={message.sender === currentUser}
          />
        ))}
        {isTyping && (
          <div className="text-left mb-4">
            <div className="inline-block bg-gray-200 rounded-lg px-4 py-2">
              <p className="text-xs mb-1 text-gray-600">User2</p>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      <ChatInput
        newMessage={newMessage}
        handleTyping={handleTyping}
        handleSendMessage={handleSendMessage}
      />
      </div>
    </div>
  );
};

export default ChatBox;
