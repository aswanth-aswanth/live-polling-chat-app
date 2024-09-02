import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function CreatePollButton() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleCreatePoll = () => {
    if (user?.userId) {
      navigate('/createpoll');
    } else {
      navigate('/login');
    }
  };

  return (
    <Plus
      onClick={handleCreatePoll}
      className="mx-auto my-10 cursor-pointer m-8 border border-b-2"
    />
  );
}
