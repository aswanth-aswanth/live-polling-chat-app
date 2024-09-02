import Message from '../models/Message.js';

export const createChatMessage = async (pollId, messageContent, userId) => {
  const message = new Message({
    content: messageContent,
    sender: userId,
    poll: pollId,
  });

  await message.save();

  return {
    content: message.content,
    senderId: message.sender,
    pollId: message.poll,
    createdAt: message.createdAt,
  };
};
