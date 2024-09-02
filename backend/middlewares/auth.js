import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import HttpStatus from '../utils/httpStatus.js';

const authenticateToken = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies['token'];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access token is missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('User: ', decoded);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Token is not valid' });
  }
};
export const nonAuthUser = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies['token'];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('User: ', decoded);

    req.user = decoded.user;

    next();
  } catch (err) {
    req.user = null;
    return next();
  }
};

export const authenticateSocket = (socket, next) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');
  const token = cookies['token'];

  if (!token) {
    console.log('No token provided.');
    socket.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded.user;
    next();
  } catch (error) {
    console.log('Token verification error: ', error);
    socket.user = null;
    next();
  }
};

export default authenticateToken;
