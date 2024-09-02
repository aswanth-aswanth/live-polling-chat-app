
const ChatMessage = ({ message, isCurrentUser }) => {
  return (
    <div className={`mb-4 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block max-w-xs md:max-w-md ${
          isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
        } rounded-lg px-4 py-2`}
      >
        <p className={`text-xs mb-1 ${isCurrentUser ? 'text-blue-200' : 'text-gray-600'}`}>
          {message.sender}
        </p>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
