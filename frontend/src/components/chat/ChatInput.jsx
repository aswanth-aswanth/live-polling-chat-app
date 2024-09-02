import { Send } from 'lucide-react';

const ChatInput = ({ newMessage, handleTyping, handleSendMessage }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={newMessage}
        onChange={handleTyping}
        placeholder="Type a message..."
        className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
