import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePoll from './pages/CreatePoll';
import URLWatcher from './utils/urlWatcher';

function App() {
  return (
    <Router>
      <URLWatcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpoll" element={<CreatePoll />} />
      </Routes>
    </Router>
  );
}

export default App;
