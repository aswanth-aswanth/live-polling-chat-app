import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { MessageSquare } from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Poll = ({ poll }) => {
  const [pollData, setPollData] = useState(poll);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useContext(SocketContext);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.emit('join_poll', poll._id);

      socket.on('poll_updated', (updatedPoll) => {
        if (updatedPoll._id === poll._id) {
          setPollData(updatedPoll);
        }
      });

      return () => {
        socket.off('poll_updated');
        socket.emit('leave_poll', poll._id);
      };
    }
  }, [socket, poll._id]);

  const handleVote = (id) => {
    if (userId) {
      socket.emit('new_vote', { pollId: pollData._id, optionId: id });
    } else {
      navigate('/login');
    }
  };

  const getVoteCount = (votes) => {
    return votes;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: userId }]);
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(true);
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden max-w-6xl mx-auto flex flex-col md:flex-row">
        <div className="flex-1 p-6">
          <h3 className="text-xl font-semibold mb-4">{pollData.title}</h3>
          <div className="space-y-3">
            {pollData.options.map((option) => (
              <div
                key={option._id}
                onClick={() => handleVote(option._id)}
                className={`relative cursor-pointer overflow-hidden rounded-md ${
                  option.votedBy.includes(userId)
                    ? 'bg-blue-100'
                    : 'bg-gray-100'
                }`}
              >
                <div
                  className={`absolute top-0 left-0 h-full ${
                    option.votedBy.includes(userId)
                      ? 'bg-blue-500'
                      : 'bg-blue-500 opacity-20'
                  }`}
                  style={{
                    width: `${(option.votes / pollData.totalVotes) * 100}%`,
                  }}
                ></div>
                <div className="relative p-3 flex justify-between items-center z-10">
                  <span>{option.text}</span>
                  <span className="font-semibold">
                    {getVoteCount(option.votes)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            {pollData.totalVotes} votes
          </p>
        </div>
      </div>

      <div className=" border ">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-full p-4 bg-gray-100 hover:bg-gray-200 transition duration-300 flex items-center justify-center"
        >
          <MessageSquare size={20} className="mr-2" />
          {isChatOpen ? 'Hide Chat' : 'Show Chat'}
        </button>
        {isChatOpen && (
          <div className="p-4 min-h-[80vh] relative">
            <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
              {messages.map((message, index) => (
                <div key={index} className="mb-2">
                  <span className="font-bold">{message.sender}: </span>
                  <span>{message.text}</span>
                </div>
              ))}
            </div>
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
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Poll;
