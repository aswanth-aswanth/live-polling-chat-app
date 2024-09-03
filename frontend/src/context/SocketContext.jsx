import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const createSocket = () =>
  io(`${import.meta.env.VITE_API_BASE_URL}`, { withCredentials: true });

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = createSocket();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const reconnect = () => {
    if (socket) {
      socket.disconnect();
      const newSocket = createSocket();
      setSocket(newSocket);
    } else {
      const newSocket = createSocket();
      setSocket(newSocket);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, reconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
