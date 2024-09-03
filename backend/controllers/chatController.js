import Message from '../models/Message.js';
import HttpStatus from '../utils/httpStatus.js';

const getChatMessages = async (req, res, next) => {
  try {
    const messages = await Message.findOne({ poll: req.params.pollId })
      .populate('messages.sender', 'username')
      .exec();

    res
      .status(HttpStatus.OK)
      .json({ message: 'Received successfully', chats: messages });
  } catch (error) {
    next(error);
  }
};


export { getChatMessages };
