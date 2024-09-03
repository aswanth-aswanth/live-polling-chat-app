import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatInput = ({ pollId, socket, userId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (newMessage.trim() && userId) {
      socket.emit('new_chat_message', {
        pollId: pollId,
        messageContent: newMessage,
      });
      setNewMessage('');
      setIsTyping(false);
      socket.emit('stop_typing', pollId);
    } else if (!userId) {
      navigate('/login');
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!isTyping && userId) {
      setIsTyping(true);
      socket.emit('start_typing', pollId);
    }

    if (e.target.value === '' && userId) {
      setIsTyping(false);
      socket.emit('stop_typing', pollId);
    }
  };

  return (
    <div className="mt-4 absolute bottom-0 left-0 right-0 w-full">
      <input
        type="text"
        value={newMessage}
        onChange={handleTyping}
        className="w-full border rounded p-2"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
        disabled={!userId}
      >
        {userId ? 'Send' : 'Login to Send'}
      </button>
    </div>
  );
};

export default ChatInput;
