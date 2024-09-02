import { useContext, useState } from 'react';
import { loginUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { reconnect } = useContext(SocketContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      reconnect();
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your email and password.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          required
        />
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600 transition duration-200"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-500 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
