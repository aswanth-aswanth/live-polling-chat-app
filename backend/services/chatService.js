import Message from '../models/Message.js';

export const createChatMessage = async (pollId, messageContent, userId) => {
  const message = {
    content: messageContent,
    sender: userId,
    createdAt: new Date(),
  };

  let pollMessages = await Message.findOne({ poll: pollId });

  if (!pollMessages) {
    pollMessages = new Message({
      poll: pollId,
      messages: [message],
    });
  } else {
    pollMessages.messages.push(message);
  }

  await pollMessages.save();

  const populatedMessage = await Message.findOne({ poll: pollId })
    .populate('messages.sender', 'username _id')
    .exec();

  const lastMessage = populatedMessage.messages.pop();
  console.log('lastMessage : ', lastMessage);

  return lastMessage;
};

export const deleteMessage = async (pollId, messageId, userId) => {
  console.log('pollId : ', pollId);
  console.log('messageId : ', messageId);
  console.log('userId : ', userId);

  const message = await Message.findOneAndUpdate(
    {
      poll: pollId,
      'messages._id': messageId,
      'messages.sender': userId,
    },
    {
      $pull: { messages: { _id: messageId } },
    },
    { new: true }
  );

  if (!message) {
    throw new Error('Message not found or not authorized to delete');
  }

  return message;
};
