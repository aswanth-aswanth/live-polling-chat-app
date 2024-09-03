import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../../utils/api';
import PollOptions from './PollOptions.jsx';
import ChatBox from '../chat/ChatBox';

const Poll = ({ poll }) => {
  const [pollData, setPollData] = useState(poll);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
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

  useEffect(() => {
    if (isChatOpen) {
      const fetchChatMessages = async () => {
        try {
          const messages = await getMessages(poll._id);
          setMessages(messages?.chats?.messages || []);
        } catch (error) {
          console.error('Error fetching chat messages:', error);
        }
      };
      fetchChatMessages();
    }
  }, [isChatOpen, poll._id]);

  const handleVote = (optionId) => {
    if (userId) {
      socket.emit('new_vote', { pollId: pollData._id, optionId });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden max-w-6xl mx-auto flex flex-col md:flex-row">
      <div className="flex-1 p-6">
        <h3 className="text-xl font-semibold mb-4">{pollData.title}</h3>
        <PollOptions
          options={pollData.options}
          totalVotes={pollData.totalVotes}
          userId={userId}
          onVote={handleVote}
        />
        <p className="mt-4 text-gray-500 text-sm">
          {pollData.totalVotes} votes
        </p>
        <ChatBox
          pollId={poll._id}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
          messages={messages}
          setMessages={setMessages}
          socket={socket}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default Poll;
