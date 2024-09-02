import { Router } from 'express';
import {
  register,
  login,
  logout,
  getUserIdFromToken,
} from '../controllers/authController.js';
import {
  validateRegistration,
  validateLogin,
} from '../middlewares/validate.js';

const router = Router();

router.post('/register', validateRegistration, register);
router.get('/user-id', getUserIdFromToken);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

export default router;
