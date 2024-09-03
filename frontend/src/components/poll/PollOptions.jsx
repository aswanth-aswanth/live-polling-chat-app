const PollOptions = ({ options, totalVotes, userId, onVote }) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div
          key={option._id}
          onClick={() => onVote(option._id)}
          className={`relative cursor-pointer overflow-hidden rounded-md ${
            option.votedBy.includes(userId) ? 'bg-blue-100' : 'bg-gray-100'
          }`}
        >
          <div
            className={`absolute top-0 left-0 h-full ${
              option.votedBy.includes(userId)
                ? 'bg-blue-500'
                : 'bg-blue-500 opacity-20'
            }`}
            style={{
              width: `${(option.votes / totalVotes) * 100}%`,
            }}
          ></div>
          <div className="relative p-3 flex justify-between items-center z-10">
            <span>{option.text}</span>
            <span className="font-semibold">{option.votes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PollOptions;
