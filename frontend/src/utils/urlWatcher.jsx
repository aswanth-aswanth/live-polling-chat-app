import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const URLWatcher = () => {
  const location = useLocation();
  const { fetchUserId } = useContext(UserContext);

  useEffect(() => {
    fetchUserId();
  }, [location.pathname, fetchUserId]);

  return null;
};

export default URLWatcher;
