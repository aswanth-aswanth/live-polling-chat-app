import { Trash2 } from 'lucide-react';

const ChatMessage = ({ message, userId, onDelete }) => {
  const isOwnMessage = message?.sender?._id === userId;

  return (
    <div
      className={`mb-2 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`inline-block px-4 py-2 rounded-lg ${
          isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        <div className="flex items-center">
          <span className="font-bold pr-2">{message.sender?.username}:</span>
          <span>{message.content}</span>
          {isOwnMessage && (
            <button
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => onDelete(message._id)}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
