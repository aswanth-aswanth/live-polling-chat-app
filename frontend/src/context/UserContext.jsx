import { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserIdFromToken } from '../utils/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const fetchUserId = useCallback(async () => {
    try {
      const response = await getUserIdFromToken();
      setUserId(response.userId);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  return (
    <UserContext.Provider value={{ userId, fetchUserId }}>
      {children}
    </UserContext.Provider>
  );
};
