import apiClient from './axios.jsx';

const getPolls = async () => {
  const response = await apiClient.get('/polls');
  return response.data.polls;
};

const voteInPoll = async (pollId, optionId) => {
  const response = await apiClient.post(`/polls/${pollId}/vote`, { optionId });
  return response.data;
};

const sendMessage = async (pollId, message) => {
  const response = await apiClient.post(`/polls/${pollId}/chat`, { message });
  return response.data;
};

const registerUser = async (username, email, password) => {
  const response = await apiClient.post('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};

const loginUser = async (email, password) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

const getUserIdFromToken = async () => {
  const response = await apiClient.get('/auth/user-id');
  return response.data;
};

const createPoll = async (title, description, options, endDate, isActive) => {
  const response = await apiClient.post('/polls', {
    title,
    description,
    options,
    endDate,
    isActive,
  });
  return response.data;
};

export {
  getPolls,
  voteInPoll,
  sendMessage,
  registerUser,
  loginUser,
  createPoll,
  getUserIdFromToken,
};
