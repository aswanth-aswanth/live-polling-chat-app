export default function PollList() {
  const polls = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    title: `Poll title ${index + 1}`,
  }));

  return (
    <div className="flex flex-col items-center px-12">
      {polls.map((poll) => (
        <div key={poll.id} className="bg-gray-50 p-4 mb-2  w-full lg:w-[60vw]">
          Poll title: {poll.title}
        </div>
      ))}
    </div>
  );
}
