import { configDotenv } from 'dotenv';
configDotenv();
import { Server } from 'socket.io';
import { authenticateSocket } from '../middlewares/auth.js';
import { getPollById, updateVote } from '../services/pollService.js';
import { createChatMessage, deleteMessage } from '../services/chatService.js';

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: `${process.env.FRONTEND_URL}`,
      credentials: true,
    },
  });

  io.use(authenticateSocket);

  io.on('connection', (socket) => {
    console.log(
      `Client connected with user ID: ${socket.user ? socket.user.id : 'Guest'}`
    );

    socket.on('join_poll', (pollId) => {
      socket.join(`poll_${pollId}`);
      console.log(
        `User ${
          socket.user ? socket.user.id : 'Guest'
        } joined poll room: poll_${pollId}`
      );
    });

    socket.on('leave_poll', (pollId) => {
      socket.leave(`poll_${pollId}`);
      console.log(
        `User ${
          socket.user ? socket.user.id : 'Guest'
        } left poll room: poll_${pollId}`
      );
    });

    socket.on('new_vote', async ({ pollId, optionId }) => {
      if (!socket.user) {
        return socket.emit('error', {
          message: 'Authentication required to vote',
        });
      }

      try {
        const updatedPoll = await updateVote(pollId, optionId, socket.user.id);
        io.to(`poll_${pollId}`).emit('poll_updated', updatedPoll);

        console.log(
          `User ${socket.user.id} voted in poll: ${pollId}, option: ${optionId}`
        );
      } catch (error) {
        console.error('Error updating vote:', error);
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('new_chat_message', async ({ pollId, messageContent }) => {
      if (!socket.user) {
        return socket.emit('error', {
          message: 'Authentication required to chat',
        });
      }

      try {
        const chatMessage = await createChatMessage(
          pollId,
          messageContent,
          socket.user.id
        );

        io.to(`poll_${pollId}`).emit('chat_message', chatMessage);

        console.log(
          `User ${socket.user.id} sent a chat message in poll: ${pollId} : ${chatMessage}`
        );
      } catch (error) {
        console.error('Error saving chat message:', error);
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('start_typing', (pollId) => {
      if (!socket.user) {
        return socket.emit('error', {
          message: 'Authentication required to send a message',
        });
      }

      io.to(`poll_${pollId}`).emit('user_typing', socket.user.username);
    });

    socket.on('stop_typing', (pollId) => {
      if (!socket.user) {
        return socket.emit('error', {
          message: 'Authentication required to send a message',
        });
      }

      io.to(`poll_${pollId}`).emit('user_stopped_typing', socket.user.username);
    });

    socket.on('delete_message', async ({ pollId, messageId }) => {
      if (!socket.user) {
        return socket.emit('error', {
          message: 'Authentication required to delete a message',
        });
      }

      console.log('deleteMessage : ', pollId, messageId);

      try {
        await deleteMessage(pollId, messageId, socket.user.id);
        io.to(`poll_${pollId}`).emit('message_deleted', messageId);
      } catch (error) {
        console.error('Error deleting message:', error);
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log(
        `Client with user ID: ${
          socket.user ? socket.user.id : 'Guest'
        } disconnected`
      );
    });
  });

  return io;
};
