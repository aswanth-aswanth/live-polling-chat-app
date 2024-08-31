import Poll from '../models/Poll.js';
import HttpStatus from '../utils/httpStatus.js';

const getAllPolls = async (req, res, next) => {
  try {
    const polls = await Poll.find({ isActive: true });
    res
      .status(HttpStatus.OK)
      .json({ message: 'Polls received successfully', polls });
  } catch (error) {
    next(error);
  }
};

const getPollById = async (req, res, next) => {
  try {
    const pollId = req.params.id;
    const poll = await Poll.findById(pollId);
    res.status(HttpStatus.OK).json({ message: 'Poll received', poll });
  } catch (error) {
    next(error);
  }
};

const createPoll = async (req, res, next) => {
  try {
    const { title, description, options, endDate, isActive } = req.body;
    const creator = req.user.userId;
    const newPoll = new Poll({
      title,
      description,
      options,
      endDate,
      isActive,
      creator,
    });

    await newPoll.save();
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'Poll created successfully' });
  } catch (error) {
    next(error);
  }
};

export { getAllPolls, getPollById, createPoll };
