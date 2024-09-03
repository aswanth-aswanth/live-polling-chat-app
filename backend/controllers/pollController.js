import Poll from '../models/Poll.js';
import HttpStatus from '../utils/httpStatus.js';

const getAllPolls = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const limit = 3;
    const currentDate = new Date();
    const userId = req.user ? req.user.id : null;

    const polls = await Poll.find({
      isActive: true,
      endDate: { $gte: currentDate },
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('creator', '_id username');

    const pollsWithVotes = polls.map((poll) => {
      const totalVotes = poll.options.reduce(
        (acc, option) => acc + option.votedBy.length,
        0
      );
      const optionsWithUserVote = poll.options.map((option) => ({
        ...option.toObject(),
        votes: option.votedBy.length,
      }));

      return {
        ...poll.toObject(),
        totalVotes,
        options: optionsWithUserVote,
      };
    });

    res.status(HttpStatus.OK).json({
      message: 'Polls received successfully',
      polls: pollsWithVotes,
    });
  } catch (error) {
    next(error);
  }
};

const getPollById = async (req, res, next) => {
  try {
    const pollId = req.params.id;
    const poll = await Poll.findById(pollId);
    const userId = req.user ? req.user.id : null;

    const totalVotes = poll.options.reduce(
      (acc, option) => acc + option.votedBy.length,
      0
    );
    const optionsWithUserVote = poll.options.map((option) => ({
      ...option.toObject(),
      votes: option.votedBy.length,
    }));

    res.status(HttpStatus.OK).json({
      message: 'Poll received',
      poll: {
        ...poll.toObject(),
        totalVotes,
        options: optionsWithUserVote,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createPoll = async (req, res, next) => {
  try {
    const { title, description, options, endDate } = req.body;
    const creator = req.user?.id;
    const newPoll = new Poll({
      title,
      description,
      options,
      endDate,
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
