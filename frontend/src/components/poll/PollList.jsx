import { useEffect, useState } from 'react';
import PollAndChatComponent from './Poll';
import { getPolls } from '../../utils/api';

export default function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const data = await getPolls();
      setPolls(data);
    };
    fetchPolls();
  }, []);

  return (
    <div className="flex flex-col items-center md:px-12">
      {polls.map((poll) => (
        <div key={poll._id} className="bg-gray-50 p-4 mb-2 w-full lg:w-[60vw]">
          <PollAndChatComponent poll={poll} />
        </div>
      ))}
    </div>
  );
}
