import { Server } from 'socket.io';

export const setupSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join_poll', (pollId) => {
      socket.join(`poll_${pollId}`);
    });

    socket.on('leave_poll', (pollId) => {
      socket.leave(`poll_${pollId}`);
    });

    socket.on('new_vote', ({ pollId, optionId }) => {
      io.to(`poll_${pollId}`).emit('vote_updated', { pollId, optionId });
    });

    socket.on('new_chat_message', ({ pollId, message }) => {
      io.to(`poll_${pollId}`).emit('chat_message', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
