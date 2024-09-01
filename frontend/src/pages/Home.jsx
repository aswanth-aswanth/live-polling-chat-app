import Header from '../components/layout/Header';
import CreatePollButton from '../components/poll/CreatePollButton';
import PollList from '../components/poll/PollList';

export default function Home() {
  return (
    <>
      <Header />
      <CreatePollButton />
      <PollList />
    </>
  );
}
