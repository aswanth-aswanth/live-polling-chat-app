import Chat from '../models/Message.js';
import HttpStatus from '../utils/httpStatus.js';

const getChatMessages = async (req, res, next) => {
  try {
    const messages = await Chat.find();
    res
      .status(HttpStatus.OK)
      .json({ message: 'Received successfull', chats: messages });
  } catch (error) {
    next(error);
  }
};

export { getChatMessages };