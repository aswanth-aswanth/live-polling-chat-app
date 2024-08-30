import { body, validationResult } from 'express-validator';
import { createError } from '../middlewares/errorHandler.js';
import HttpStatus from '../utils/httpStatus.js';

const validateRegistration = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = errors.array().map((err) => err.msg);
      throw createError(extractedErrors.join(', '), HttpStatus.BAD_REQUEST);
    }
    next();
  },
];

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = errors.array().map((err) => err.msg);
      throw createError(extractedErrors.join(', '), HttpStatus.BAD_REQUEST);
    }
    next();
  },
];

export { validateRegistration, validateLogin };
