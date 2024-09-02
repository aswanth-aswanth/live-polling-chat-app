import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { createError } from '../middlewares/errorHandler.js';
import HttpStatus from '../utils/httpStatus.js';
import cookieOptions from '../utils/cookieOptions.js';
import cookie from 'cookie';

const handleAuth = (user, res, statusCode, message) => {
  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({ message });
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ email })) {
      throw createError('User already exists', HttpStatus.CONFLICT);
    }

    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();
    handleAuth(user, res, HttpStatus.CREATED, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createError('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    handleAuth(user, res, HttpStatus.OK, 'Login successful');
  } catch (error) {
    next(error);
  }
};

const getUserIdFromToken = (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies['token'];
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authentication token is missing' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.user;

    res.status(200).json({ userId: userId.id });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const logout = (req, res) => {
  res
    .status(HttpStatus.OK)
    .clearCookie('token')
    .json({ message: 'Logged out successfully' });
};

export { register, login, logout, getUserIdFromToken };
