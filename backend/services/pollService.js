import Poll from '../models/Poll.js';

const getPollById = async (pollId) => {
  const poll = await Poll.findById(pollId);
  if (!poll) {
    throw new Error('Poll not found');
  }
  return poll;
};

const updateVote = async (pollId, optionId, userId) => {
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const poll = await Poll.findById(pollId);
  if (!poll) {
    throw new Error('Poll not found');
  }

  const currentOption = poll.options.find((option) =>
    option.votedBy.includes(userId)
  );
  console.log('currentOption : ', currentOption);
  const newOption = poll.options.id(optionId);

  if (!newOption) {
    throw new Error('Option not found');
  }

  const hasVotedForCurrentOption =
    currentOption && currentOption._id.toString() === optionId;

  console.log('hasVotedForCurrentOption : ', hasVotedForCurrentOption);

  if (hasVotedForCurrentOption) {
    currentOption.votedBy.pull(userId);
  } else {
    if (currentOption) {
      currentOption.votedBy.pull(userId);
    }

    if (!newOption.votedBy.includes(userId)) {
      newOption.votedBy.push(userId);
    }
  }

  await poll.save();

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
};

export { getPollById, updateVote };
